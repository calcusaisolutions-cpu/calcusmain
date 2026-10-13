package main

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"log"
	"mime"
	"mime/quotedprintable"
	"net"
	"net/mail"
	"net/smtp"
	"os"
	"strings"
	"time"
)

// Every saved enquiry is also emailed to the team. Gmail needs an App Password for the sending account
// (Google Account → Security → 2-Step Verification → App passwords); the account password itself will not work.
const defaultEnquiryTo = "calcusaisolutions@gmail.com"

type mailConfig struct {
	host, port, user, password, from, to string
}

// mailSettings reads SMTP_USER and SMTP_PASSWORD (required) plus optional SMTP_HOST, SMTP_PORT, ENQUIRY_TO and
// ENQUIRY_FROM. It reports false when email is not set up, in which case enquiries are only saved to disk.
func mailSettings() (mailConfig, bool) {
	c := mailConfig{
		host:     envOr("SMTP_HOST", "smtp.gmail.com"),
		port:     envOr("SMTP_PORT", "587"),
		user:     os.Getenv("SMTP_USER"),
		password: strings.ReplaceAll(os.Getenv("SMTP_PASSWORD"), " ", ""), // Google shows app passwords in groups of four.
		to:       envOr("ENQUIRY_TO", defaultEnquiryTo),
	}
	c.from = envOr("ENQUIRY_FROM", c.user)
	return c, c.user != "" && c.password != ""
}

func envOr(key, fallback string) string {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		return value
	}
	return fallback
}

// notifyEnquiry runs after an enquiry is safely on disk, so a mail outage never loses a lead or fails the form.
// Tests replace it to capture what would be sent.
var notifyEnquiry = func(e enquiry) {
	c, ok := mailSettings()
	if !ok {
		return
	}
	if err := sendEnquiryEmail(c, e); err != nil {
		log.Printf("enquiry email to %s failed (enquiry is still saved): %v", c.to, err)
	}
}

func sendEnquiryEmail(c mailConfig, e enquiry) error {
	msg, err := enquiryMessage(c, e)
	if err != nil {
		return err
	}
	conn, err := net.DialTimeout("tcp", net.JoinHostPort(c.host, c.port), 10*time.Second)
	if err != nil {
		return err
	}
	conn.SetDeadline(time.Now().Add(30 * time.Second))
	client, err := smtp.NewClient(conn, c.host)
	if err != nil {
		conn.Close()
		return err
	}
	defer client.Close()
	if err := client.StartTLS(&tls.Config{ServerName: c.host}); err != nil {
		return err
	}
	if err := client.Auth(smtp.PlainAuth("", c.user, c.password, c.host)); err != nil {
		return err
	}
	if err := client.Mail(c.from); err != nil {
		return err
	}
	if err := client.Rcpt(c.to); err != nil {
		return err
	}
	w, err := client.Data()
	if err != nil {
		return err
	}
	if _, err := w.Write(msg); err != nil {
		return err
	}
	if err := w.Close(); err != nil {
		return err
	}
	return client.Quit()
}

// enquiryMessage builds the email. Replying to it goes straight to the visitor. Header values are either parsed
// addresses or RFC 2047-encoded, so nothing a visitor types can add or break headers.
func enquiryMessage(c mailConfig, e enquiry) ([]byte, error) {
	from, err := mail.ParseAddress(c.from)
	if err != nil {
		return nil, fmt.Errorf("ENQUIRY_FROM/SMTP_USER: %w", err)
	}
	to, err := mail.ParseAddress(c.to)
	if err != nil {
		return nil, fmt.Errorf("ENQUIRY_TO: %w", err)
	}
	replyTo := &mail.Address{Name: singleLine(e.Name), Address: e.Email}
	from.Name = "Calcus AI website"
	subject := fmt.Sprintf("New enquiry: %s — %s", singleLine(e.Service), singleLine(e.Name))

	var b bytes.Buffer
	header := func(key, value string) { fmt.Fprintf(&b, "%s: %s\r\n", key, value) }
	header("From", from.String())
	header("To", to.String())
	header("Reply-To", replyTo.String())
	header("Subject", mime.QEncoding.Encode("utf-8", subject))
	header("Date", e.CreatedAt.Format(time.RFC1123Z))
	header("MIME-Version", "1.0")
	header("Content-Type", `text/plain; charset="utf-8"`)
	header("Content-Transfer-Encoding", "quoted-printable")
	b.WriteString("\r\n")

	body := quotedprintable.NewWriter(&b)
	fmt.Fprintf(body, "New enquiry from the Calcus AI website.\r\n\r\nName:    %s\r\nEmail:   %s\r\nService: %s\r\nSent:    %s\r\n\r\nMessage:\r\n%s\r\n\r\n— Reply to this email to answer %s directly.\r\n",
		singleLine(e.Name), e.Email, singleLine(e.Service), e.CreatedAt.In(colombo).Format("2 Jan 2006, 3:04 PM (Colombo time)"),
		strings.ReplaceAll(strings.ReplaceAll(e.Message, "\r\n", "\n"), "\n", "\r\n"), singleLine(e.Name))
	if err := body.Close(); err != nil {
		return nil, err
	}
	return b.Bytes(), nil
}

var colombo = func() *time.Location {
	if loc, err := time.LoadLocation("Asia/Colombo"); err == nil {
		return loc
	}
	return time.FixedZone("Asia/Colombo", 5*3600+1800)
}()

// singleLine drops control characters (including line breaks) from short fields used in headers and labels.
func singleLine(s string) string {
	return strings.Map(func(r rune) rune {
		if r < 0x20 || r == 0x7f {
			return -1
		}
		return r
	}, s)
}
