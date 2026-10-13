package main

import (
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestEnquiry(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("DATA_DIR", dir)
	sent := make(chan enquiry, 5)
	original := notifyEnquiry
	notifyEnquiry = func(e enquiry) { sent <- e }
	t.Cleanup(func() { notifyEnquiry = original })
	for _, tc := range []struct {
		body   string
		status int
	}{{`{"name":"Test","email":"test@example.com","service":"3D experience","message":"An interactive product experience"}`, 201}, {`{"name":"Test","email":"bad","service":"3D experience","message":"An interactive product experience"}`, 400}, {`{"name":"Test"}`, 400}, {`{} {}`, 400}, {`{"name":"Test","email":"test@example.com","service":"","message":"An interactive product experience"}`, 400}} {
		r := httptest.NewRequest("POST", "/api/enquiries", strings.NewReader(tc.body))
		r.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		handler().ServeHTTP(w, r)
		if w.Code != tc.status {
			t.Fatalf("got %d, want %d: %s", w.Code, tc.status, w.Body.String())
		}
	}
	data, err := os.ReadFile(filepath.Join(dir, "enquiries.jsonl"))
	if err != nil || strings.Count(string(data), "\n") != 1 {
		t.Fatal("expected exactly one persisted enquiry", err)
	}
	select {
	case e := <-sent:
		if e.Email != "test@example.com" {
			t.Fatalf("emailed the wrong enquiry: %+v", e)
		}
	case <-time.After(time.Second):
		t.Fatal("the saved enquiry was not passed on to be emailed")
	}
	if len(sent) != 0 {
		t.Fatal("rejected enquiries must not be emailed")
	}
}

func TestEnquiryMessage(t *testing.T) {
	c := mailConfig{from: "sender@gmail.com", to: defaultEnquiryTo}
	e := enquiry{Name: "Nimal\r\nBcc: evil@example.com", Email: "nimal@example.com", Service: "Website design", Message: "Need a site for my bakery\nin Kandy", CreatedAt: time.Date(2026, 10, 13, 8, 30, 0, 0, time.UTC)}
	msg, err := enquiryMessage(c, e)
	if err != nil {
		t.Fatal(err)
	}
	text := string(msg)
	head, _, _ := strings.Cut(text, "\r\n\r\n")
	for _, want := range []string{"To: <calcusaisolutions@gmail.com>", "Reply-To: \"NimalBcc: evil@example.com\" <nimal@example.com>", "Subject: =?utf-8?q?New_enquiry"} {
		if !strings.Contains(head, want) {
			t.Fatalf("headers missing %q:\n%s", want, head)
		}
	}
	if strings.Contains(head, "\r\nBcc:") {
		t.Fatal("visitor input injected a header")
	}
	if !strings.Contains(text, "Need a site for my bakery\r\nin Kandy") || !strings.Contains(text, "2:00 PM (Colombo time)") {
		t.Fatalf("body missing message or local time:\n%s", text)
	}
}

func TestMailSettings(t *testing.T) {
	t.Setenv("SMTP_USER", "")
	t.Setenv("SMTP_PASSWORD", "")
	if _, ok := mailSettings(); ok {
		t.Fatal("email must stay off without credentials")
	}
	t.Setenv("SMTP_USER", "sender@gmail.com")
	t.Setenv("SMTP_PASSWORD", "abcd efgh ijkl mnop")
	c, ok := mailSettings()
	if !ok || c.to != defaultEnquiryTo || c.host != "smtp.gmail.com" || c.port != "587" || c.password != "abcdefghijklmnop" || c.from != "sender@gmail.com" {
		t.Fatalf("unexpected settings: %+v", c)
	}
}
func TestMethod(t *testing.T) {
	w := httptest.NewRecorder()
	handler().ServeHTTP(w, httptest.NewRequest("GET", "/api/enquiries", nil))
	if w.Code != 405 {
		t.Fatal(w.Code)
	}
}

func TestMovedPages(t *testing.T) {
	for _, path := range []string{"/packes/for-teachers/", "/packes/for-teachers", "/packes/for-teachers/?ref=fb"} {
		w := httptest.NewRecorder()
		handler().ServeHTTP(w, httptest.NewRequest("GET", path, nil))
		want := "/packages/for-teachers/"
		if strings.Contains(path, "?") {
			want += "?ref=fb"
		}
		if w.Code != 301 || w.Header().Get("Location") != want {
			t.Fatalf("%s: got %d %q, want 301 %q", path, w.Code, w.Header().Get("Location"), want)
		}
	}
}

func TestStaticFiles(t *testing.T) {
	dir := t.TempDir()
	os.MkdirAll(filepath.Join(dir, "services", "web"), 0o755)
	os.MkdirAll(filepath.Join(dir, "bots"), 0o755)
	os.WriteFile(filepath.Join(dir, "services", "web", "index.html"), []byte("web page"), 0o644)
	os.WriteFile(filepath.Join(dir, "404.html"), []byte("not found page"), 0o644)
	for _, tc := range []struct {
		path   string
		status int
		body   string
	}{{"/services/web/", 200, "web page"}, {"/services/missing/", 404, "not found page"}, {"/bots/", 404, "not found page"}, {"/../etc/passwd", 404, "not found page"}} {
		w := httptest.NewRecorder()
		staticFiles(dir).ServeHTTP(w, httptest.NewRequest("GET", tc.path, nil))
		if w.Code != tc.status || !strings.Contains(w.Body.String(), tc.body) {
			t.Fatalf("%s: got %d %q, want %d %q", tc.path, w.Code, w.Body.String(), tc.status, tc.body)
		}
	}
}
