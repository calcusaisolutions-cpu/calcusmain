package main

import (
	"compress/gzip"
	"encoding/json"
	"io"
	"log"
	"mime"
	"net/http"
	"net/mail"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

type enquiry struct {
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Service   string    `json:"service"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"createdAt"`
}

var storageMu sync.Mutex

func enquiries(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != "POST" {
		w.Header().Set("Allow", "POST")
		http.Error(w, `{"error":"method not allowed"}`, 405)
		return
	}
	media, _, _ := mime.ParseMediaType(r.Header.Get("Content-Type"))
	if media != "application/json" {
		http.Error(w, `{"error":"JSON required"}`, 415)
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, 32768)
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	var e enquiry
	if decoder.Decode(&e) != nil || decoder.Decode(new(any)) != io.EOF {
		http.Error(w, `{"error":"invalid JSON"}`, 400)
		return
	}
	e.Name = strings.TrimSpace(e.Name)
	e.Email = strings.TrimSpace(e.Email)
	e.Message = strings.TrimSpace(e.Message)
	address, err := mail.ParseAddress(e.Email)
	allowed := map[string]bool{"AI solutions": true, "Business automation": true, "Interactive website": true, "3D experience": true, "Motion design": true, "Digital product": true}
	if e.Name == "" || len(e.Name) > 100 || err != nil || address.Address != e.Email || len(e.Email) > 254 || len(e.Message) < 10 || len(e.Message) > 5000 || !allowed[e.Service] {
		http.Error(w, `{"error":"invalid enquiry fields"}`, 400)
		return
	}
	e.CreatedAt = time.Now().UTC()
	dir := os.Getenv("DATA_DIR")
	if dir == "" {
		dir = "data"
	}
	storageMu.Lock()
	defer storageMu.Unlock()
	if err := os.MkdirAll(dir, 0700); err != nil {
		http.Error(w, `{"error":"storage unavailable"}`, 503)
		return
	}
	f, err := os.OpenFile(filepath.Join(dir, "enquiries.jsonl"), os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0600)
	if err != nil {
		http.Error(w, `{"error":"storage unavailable"}`, 503)
		return
	}
	err = json.NewEncoder(f).Encode(e)
	if err == nil {
		err = f.Sync()
	}
	closeErr := f.Close()
	if err != nil || closeErr != nil {
		http.Error(w, `{"error":"could not save enquiry"}`, 503)
		return
	}
	w.WriteHeader(http.StatusCreated)
	io.WriteString(w, `{"saved":true}`)
}
func handler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/enquiries", enquiries)
	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		io.WriteString(w, `{"status":"ok"}`)
	})
	mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) { http.NotFound(w, r) })
	mux.Handle("/", http.FileServer(http.Dir("dist")))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("X-Frame-Options", "DENY")
		switch path := r.URL.Path; {
		case strings.HasPrefix(path, "/assets/"):
			// Vite fingerprints these file names, so they can be cached forever.
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		case strings.HasPrefix(path, "/api/"):
			w.Header().Set("Cache-Control", "no-store")
		case path == "/" || strings.HasSuffix(path, ".html"):
			w.Header().Set("Cache-Control", "no-cache")
		default:
			w.Header().Set("Cache-Control", "public, max-age=86400")
		}
		if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") && compressible(r.URL.Path) {
			w.Header().Set("Content-Encoding", "gzip")
			w.Header().Add("Vary", "Accept-Encoding")
			gz := gzip.NewWriter(w)
			defer gz.Close()
			w = gzipResponseWriter{ResponseWriter: w, writer: gz}
		}
		mux.ServeHTTP(w, r)
	})
}

// compressible reports whether a static path is text that benefits from gzip (images are already compressed).
func compressible(path string) bool {
	if path == "/" {
		return true
	}
	switch strings.ToLower(filepath.Ext(path)) {
	case ".html", ".css", ".js", ".svg", ".json":
		return true
	}
	return false
}

type gzipResponseWriter struct {
	http.ResponseWriter
	writer *gzip.Writer
}

func (g gzipResponseWriter) Write(b []byte) (int, error) { return g.writer.Write(b) }

// WriteHeader drops Content-Length, which would describe the uncompressed body.
func (g gzipResponseWriter) WriteHeader(code int) {
	g.ResponseWriter.Header().Del("Content-Length")
	g.ResponseWriter.WriteHeader(code)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	s := &http.Server{Addr: ":" + port, Handler: handler(), ReadHeaderTimeout: 5 * time.Second, ReadTimeout: 10 * time.Second, WriteTimeout: 15 * time.Second, IdleTimeout: 60 * time.Second}
	log.Printf("Calcus Ai listening on :%s", port)
	log.Fatal(s.ListenAndServe())
}
