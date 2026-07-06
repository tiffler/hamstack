import React from "react";
import { createRoot } from "react-dom/client";

// Real design-system styles: the three theme token files, the brand fonts, and
// the compiled Tailwind utilities the Button uses (regenerate: npm run build:css).
import "../tokens/honey-glazed.css";
import "../tokens/prosciutto.css";
import "../tokens/smoked.css";
import "../tokens/fonts/fonts.css";
import "../dist/hamstack.css";
import "./preview.css";

import { App } from "./App";

// If a view throws while rendering, show a calm, on-brand message with a way out
// (reload) and a way to report it — never a blank white screen or console-only error.
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { crashed: boolean }> {
  state = { crashed: false };
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("Hamstack explorer hit an error:", error);
  }
  render() {
    if (!this.state.crashed) return this.props.children;
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", gap: "var(--ham-space-3)",
        alignItems: "center", justifyContent: "center", textAlign: "center", padding: "var(--ham-space-6)",
        background: "var(--ham-surface)", color: "var(--ham-ink)", fontFamily: "var(--ham-font-body)",
      }}>
        <div style={{ fontSize: "2rem" }}>🐹</div>
        <h1 style={{ fontFamily: "var(--ham-font-display)", margin: 0 }}>This view hit a snag.</h1>
        <p style={{ color: "var(--ham-ink-soft)", margin: 0, maxWidth: "42ch" }}>
          Something broke while rendering. Reloading usually fixes it — and if it keeps happening, please flag it so it gets fixed.
        </p>
        <div style={{ display: "flex", gap: "var(--ham-space-2)", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              cursor: "pointer", fontFamily: "var(--ham-font-body)", fontWeight: 600, fontSize: "var(--ham-text-base)",
              color: "var(--ham-primary-ink)", background: "var(--ham-primary)", border: 0,
              borderRadius: "var(--ham-radius)", padding: "12px 24px",
            }}
          >Reload</button>
          <a
            href="https://github.com/tiffler/hamstack/issues/new?template=usability.md&labels=bug"
            target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", fontFamily: "var(--ham-font-body)", fontWeight: 600,
              fontSize: "var(--ham-text-base)", color: "var(--ham-ink)", background: "var(--ham-surface-raised)",
              border: "1px solid var(--ham-border-strong)", borderRadius: "var(--ham-radius)", padding: "12px 24px",
              textDecoration: "none",
            }}
          >Report it →</a>
        </div>
      </div>
    );
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
