package main

import (
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestEnquiry(t *testing.T) {
	dir := t.TempDir()
	t.Setenv("DATA_DIR", dir)
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
}
func TestMethod(t *testing.T) {
	w := httptest.NewRecorder()
	handler().ServeHTTP(w, httptest.NewRequest("GET", "/api/enquiries", nil))
	if w.Code != 405 {
		t.Fatal(w.Code)
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
