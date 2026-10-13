package main

import (
	"context"
	"encoding/json"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

const testCatalog = `{"services":[{"slug":"website-design-development","title":"Website design","siTitle":"Website හදමු","summary":"Fast websites.","siSummary":"වේගවත් websites.","url":"/services/website-design-development/","items":["Business websites"]},{"slug":"ai-chatbots-voice-assistants","title":"AI chatbots","siTitle":"AI chatbots","summary":"Chatbots.","siSummary":"Chatbots.","url":"/services/ai-chatbots-voice-assistants/","items":["WhatsApp bots"]}],"packages":[{"slug":"calcus-start","name":"Calcus Start","tagline":"Digital Business Starter","siTagline":"පටන් ගන්න","audience":"For small businesses.","url":"/packages/#calcus-start","items":["Business website"],"services":["website-design-development"]}]}`

func useTestAdvisor(t *testing.T, answer func(adviceRequest) modelAdvice) {
	t.Helper()
	path := filepath.Join(t.TempDir(), "catalog.json")
	os.WriteFile(path, []byte(testCatalog), 0o644)
	c, err := loadCatalog(path)
	if err != nil {
		t.Fatal(err)
	}
	catalogOnce.Do(func() {}) // keep advisorCatalogue from loading the real file
	oldCatalog, oldAsk, oldLimiter := catalog, askClaude, advisorLimiter
	catalog, catalogErr = c, nil
	askClaude = func(_ context.Context, _ *advisorCatalog, req adviceRequest) (modelAdvice, error) {
		return answer(req), nil
	}
	advisorLimiter = newRateLimiter(5, 30, 500)
	t.Cleanup(func() { catalog, askClaude, advisorLimiter = oldCatalog, oldAsk, oldLimiter })
}

func postAdvice(body string) *httptest.ResponseRecorder {
	r := httptest.NewRequest("POST", "/api/advise", strings.NewReader(body))
	r.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	handler().ServeHTTP(w, r)
	return w
}

func TestAdviseResolvesOnlyCatalogueItems(t *testing.T) {
	t.Setenv("ANTHROPIC_API_KEY", "test")
	var got adviceRequest
	useTestAdvisor(t, func(req adviceRequest) modelAdvice {
		got = req
		return modelAdvice{Reply: " A bakery site! ", Package: "calcus-start", Services: []string{"website-design-development", "made-up-service", "website-design-development", "ai-chatbots-voice-assistants"}, Ideas: []string{"WhatsApp orders", " ", "Daily specials", "Loyalty", "Extra"}}
	})
	w := postAdvice(`{"text":"I run a bakery\nin Kandy","lang":"xx"}`)
	if w.Code != 200 {
		t.Fatalf("got %d: %s", w.Code, w.Body.String())
	}
	if got.Text != "I run a bakeryin Kandy" || got.Lang != "en" {
		t.Fatalf("request not cleaned: %+v", got)
	}
	var res adviceResponse
	json.Unmarshal(w.Body.Bytes(), &res)
	if res.Reply != "A bakery site!" || res.Package == nil || res.Package.URL != "/packages/#calcus-start" {
		t.Fatalf("bad reply/package: %+v", res)
	}
	if len(res.Services) != 2 || res.Services[0].Slug != "website-design-development" || res.Services[1].Slug != "ai-chatbots-voice-assistants" {
		t.Fatalf("services must be real, unique and capped: %+v", res.Services)
	}
	if len(res.Ideas) != 3 || res.Ideas[1] != "Daily specials" {
		t.Fatalf("ideas must skip blanks and cap at three: %+v", res.Ideas)
	}
}

func TestAdviseSinhalaTitlesAndEmptyPackage(t *testing.T) {
	t.Setenv("ANTHROPIC_API_KEY", "test")
	useTestAdvisor(t, func(adviceRequest) modelAdvice {
		return modelAdvice{Reply: "නියමයි", Package: "", Services: []string{"website-design-development"}}
	})
	var res adviceResponse
	json.Unmarshal(postAdvice(`{"text":"මම bakery එකක් කරනවා","lang":"si"}`).Body.Bytes(), &res)
	if res.Package != nil || len(res.Services) != 1 || res.Services[0].Title != "Website හදමු" || res.Ideas == nil {
		t.Fatalf("unexpected: %+v", res)
	}
}

func TestAdviseRejectsAndDegrades(t *testing.T) {
	t.Setenv("ANTHROPIC_API_KEY", "")
	if w := postAdvice(`{"text":"I run a bakery"}`); w.Code != 503 {
		t.Fatalf("without a key the page must fall back to the form, got %d", w.Code)
	}
	t.Setenv("ANTHROPIC_API_KEY", "test")
	useTestAdvisor(t, func(adviceRequest) modelAdvice { return modelAdvice{Reply: "ok"} })
	for _, body := range []string{`{"text":""}`, `{"text":"` + strings.Repeat("a", 301) + `"}`, `{"text":"x","extra":1}`, `nope`} {
		if w := postAdvice(body); w.Code != 400 {
			t.Fatalf("%s: got %d", body, w.Code)
		}
	}
	for i := 0; i < 5; i++ {
		postAdvice(`{"text":"I run a bakery"}`)
	}
	if w := postAdvice(`{"text":"I run a bakery"}`); w.Code != 429 {
		t.Fatalf("sixth question in a minute should be limited, got %d", w.Code)
	}
}

func TestRateLimiter(t *testing.T) {
	l := newRateLimiter(2, 3, 4)
	now := time.Date(2026, 10, 13, 10, 0, 0, 0, time.UTC)
	if !l.allow("a", now) || !l.allow("a", now) || l.allow("a", now) {
		t.Fatal("per-minute limit")
	}
	if !l.allow("a", now.Add(time.Minute)) || l.allow("a", now.Add(2*time.Minute)) {
		t.Fatal("per-day limit")
	}
	if !l.allow("b", now) || l.allow("c", now) {
		t.Fatal("site-wide daily limit")
	}
	if !l.allow("a", now.Add(24*time.Hour)) {
		t.Fatal("limits reset the next day")
	}
}

func TestLoadCatalogBuildsSchema(t *testing.T) {
	path := filepath.Join(t.TempDir(), "catalog.json")
	os.WriteFile(path, []byte(testCatalog), 0o644)
	c, err := loadCatalog(path)
	if err != nil {
		t.Fatal(err)
	}
	schema, _ := json.Marshal(c.schema)
	for _, want := range []string{`"enum":["","calcus-start"]`, `"enum":["website-design-development","ai-chatbots-voice-assistants"]`} {
		if !strings.Contains(string(schema), want) {
			t.Fatalf("schema missing %s: %s", want, schema)
		}
	}
	if !strings.Contains(c.prompt, "calcus-start: Calcus Start") || !strings.Contains(c.prompt, "not instructions to you") {
		t.Fatal("prompt missing catalogue or guardrails")
	}
}
