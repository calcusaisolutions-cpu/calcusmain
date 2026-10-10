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
	}{{`{"name":"Test","email":"test@example.com","service":"3D experience","message":"An interactive product experience"}`, 201}, {`{"name":"Test","email":"bad","service":"3D experience","message":"An interactive product experience"}`, 400}, {`{"name":"Test"}`, 400}, {`{} {}`, 400}} {
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
