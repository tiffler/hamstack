import * as React from "react";
import { Button } from "@/components/button/button";
import { COMPONENTS, type ComponentDoc } from "./registry";

const THEMES = [
  { key: "honey-glazed", label: "Honey-glazed", note: "terracotta · retro" },
  { key: "prosciutto", label: "Prosciutto", note: "dusty pink · minimal" },
  { key: "smoked", label: "Smoked", note: "smokey gray · modern" },
] as const;
type ThemeKey = (typeof THEMES)[number]["key"];

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "foundations", label: "Foundations" },
  { key: "components", label: "Components" },
  { key: "theme", label: "Theme editor" },
];

const EDIT_COLORS: [string, string][] = [
  ["--ham-primary", "Primary"],
  ["--ham-primary-ink", "Primary text"],
  ["--ham-accent", "Accent"],
  ["--ham-surface", "Surface"],
  ["--ham-surface-raised", "Raised surface"],
  ["--ham-ink", "Ink (text)"],
  ["--ham-danger", "Danger"],
  ["--ham-border-strong", "Border"],
];
const EDIT_RADII: [string, string, number, number][] = [
  ["--ham-radius", "Radius", 0, 28],
  ["--ham-radius-lg", "Large radius", 0, 40],
];
const EDIT_KEYS = [...EDIT_COLORS.map((c) => c[0]), ...EDIT_RADII.map((r) => r[0])];

/* ── small helpers ─────────────────────────────────────────────────────── */
// Plain state routing (no location.hash) so navigation works in any embed,
// including sandboxed artifact iframes. Mirrors the hash into the URL when
// allowed, purely as a nicety — never reads it back.
function useRoute() {
  const [route, setRoute] = React.useState("/overview");
  const nav = React.useCallback((r: string) => {
    setRoute(r);
    try { history.replaceState(null, "", "#" + r); } catch { /* sandboxed: ignore */ }
  }, []);
  return [route, nav] as const;
}

function SunMoon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></svg>
  );
}

// Minimal markdown → JSX for the design-law docs (headings, lists, bold, code).
function Markdown({ src }: { src: string }) {
  const inline = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let k = 0;
  const flush = () => { if (list.length) { blocks.push(<ul key={k++}>{list.map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inline(l) }} />)}</ul>); list = []; } };
  src.split("\n").forEach((ln) => {
    const h = ln.match(/^(#{1,4})\s+(.*)/);
    if (h) { flush(); const Tag = `h${Math.min(h[1].length + 1, 5)}` as any; blocks.push(<Tag key={k++} dangerouslySetInnerHTML={{ __html: inline(h[2]) }} />); }
    else if (/^\s*[-*]\s+/.test(ln) || /^\s*\d+\.\s+/.test(ln)) list.push(ln.replace(/^\s*([-*]|\d+\.)\s+/, ""));
    else if (ln.trim() === "") flush();
    else if (/^---+$/.test(ln.trim())) { flush(); blocks.push(<hr key={k++} />); }
    else { flush(); blocks.push(<p key={k++} dangerouslySetInnerHTML={{ __html: inline(ln) }} />); }
  });
  flush();
  return <div className="md">{blocks}</div>;
}

/* ── app shell ─────────────────────────────────────────────────────────── */
export function App() {
  const [theme, setTheme] = React.useState<ThemeKey>("honey-glazed");
  const [dark, setDark] = React.useState(false);
  const [edits, setEdits] = React.useState<Record<string, string>>({});
  const [route, nav] = useRoute();

  React.useEffect(() => { setDark(matchMedia("(prefers-color-scheme: dark)").matches); }, []);
  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", theme);
    r.classList.toggle("dark", dark);
  }, [theme, dark]);

  const pickTheme = (t: ThemeKey) => { setTheme(t); setEdits({}); };
  const toggleMode = () => { setDark((d) => !d); setEdits({}); };

  const view = route.split("/")[1] || "overview";
  const editStyle = edits as React.CSSProperties;

  // Sliding indicator: measure the active tab and animate a pill under it.
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const [ind, setInd] = React.useState({ left: 0, width: 0, ready: false });
  const measure = React.useCallback(() => {
    const el = tabsRef.current?.querySelector(".navtab.on") as HTMLElement | null;
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, []);
  React.useLayoutEffect(measure, [view, theme, dark, measure]);
  React.useEffect(() => {
    addEventListener("resize", measure);
    (document as any).fonts?.ready?.then(measure);
    return () => removeEventListener("resize", measure);
  }, [measure]);

  // Theme switcher: a color pill that slides to the selected theme (its
  // background is --ham-primary, so it recolors as the theme changes).
  const switchRef = React.useRef<HTMLDivElement>(null);
  const [sind, setSind] = React.useState({ left: 0, width: 0, ready: false });
  const measureSwitch = React.useCallback(() => {
    const el = switchRef.current?.querySelector('[aria-selected="true"]') as HTMLElement | null;
    if (el) setSind({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, []);
  React.useLayoutEffect(measureSwitch, [theme, measureSwitch]);
  React.useEffect(() => {
    addEventListener("resize", measureSwitch);
    (document as any).fonts?.ready?.then(measureSwitch);
    return () => removeEventListener("resize", measureSwitch);
  }, [measureSwitch]);

  return (
    // Theme-editor edits apply to this whole wrapper (nav + content). The
    // untouched theme base stays readable from <html>, which is outside it.
    <div className="app" style={editStyle}>
      <header className="nav">
        <div className="brand"><span className="dot" /> Hamstack <span className="ver">v0.1</span></div>
        <nav className="navtabs" ref={tabsRef}>
          <span className="navind" aria-hidden style={{ transform: `translateX(${ind.left}px)`, width: ind.width, opacity: ind.ready ? 1 : 0 }} />
          {NAV.map((n) => (
            <button key={n.key} className={view === n.key ? "navtab on" : "navtab"} onClick={() => nav(`/${n.key}`)}>{n.label}</button>
          ))}
        </nav>
        <div className="navright">
          <div className="switch" role="tablist" aria-label="Theme" ref={switchRef}>
            <span className="switchind" aria-hidden style={{ transform: `translateX(${sind.left}px)`, width: sind.width, opacity: sind.ready ? 1 : 0 }} />
            {THEMES.map((t) => (
              <button key={t.key} role="tab" aria-selected={theme === t.key} title={t.note} onClick={() => pickTheme(t.key)}>{t.label}</button>
            ))}
          </div>
          <button className="themetoggle" onClick={toggleMode} aria-label="Toggle light or dark mode"><SunMoon dark={dark} /><span>{dark ? "Dark" : "Light"}</span></button>
        </div>
      </header>

      {view === "overview" && <Overview nav={nav} dark={dark} />}
      {view === "foundations" && <Foundations />}
      {view === "components" && <Components route={route} nav={nav} />}
      {view === "theme" && <ThemeEditor theme={theme} dark={dark} edits={edits} setEdits={setEdits} />}

      <footer className="foot">
        <div className="footinner">
          <div className="footbrand"><span className="dot" /> Hamstack 🐹 — the design system for the systemless.</div>
          <nav className="footnav">
            {NAV.map((n) => <button key={n.key} onClick={() => nav(`/${n.key}`)}>{n.label}</button>)}
          </nav>
          <a className="footfeedback" href="https://github.com/tiffler/hamstack/issues/new?template=usability.md&labels=feedback" target="_blank" rel="noreferrer">🐹 Something unclear? Flag it here</a>
          <div className="footmeta mono"><a href="https://tiffler.github.io/hamstack/" target="_blank" rel="noreferrer">Live demo ↗</a> · by <a href="https://www.tienmedia.com" target="_blank" rel="noreferrer">tiffler</a> · MIT</div>
        </div>
      </footer>
    </div>
  );
}

/* ── views ─────────────────────────────────────────────────────────────── */
function Overview({ nav, dark }: { nav: (r: string) => void; dark: boolean }) {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Design system · Beta</p>
        <h1>The design system for the systemless.</h1>
        <p className="lede">Open, ownable, honey-glazed. Three themes — each a distinct personality with a light and dark mode — driven entirely by semantic <span className="mono">--ham-*</span> tokens. These are the real React components, hot-reloading from source.</p>
        <div className="cta">
          <Button variant="primary" size="lg" onClick={() => nav("/components/button")}>Browse components</Button>
          <Button variant="ghost" size="lg" onClick={() => nav("/theme")}>Open theme editor</Button>
        </div>
        <div className="chips"><span className="chip">3 themes × 2 modes</span><span className="chip">token-driven</span><span className="chip">WCAG AA</span><span className="chip">MIT</span></div>
      </section>

      <section>
        <div className="sechead"><p className="eyebrow">Three personalities, one component</p><h2>The tokens do the work</h2>
          <p>The same markup, re-themed. Each card locks to a theme in the current <b>{dark ? "dark" : "light"}</b> mode.</p></div>
        <div className="compare">
          {THEMES.map((t) => (
            <div className={dark ? "tcard dark" : "tcard"} key={t.key} data-theme={t.key}>
              <div className="tname">{t.label} · {t.note}</div>
              <h3>Ready to publish?</h3>
              <p>Your changes are saved. Ship it whenever you're ready.</p>
              <div className="acts"><Button variant="primary">Publish</Button><Button variant="ghost">Not yet</Button></div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="sechead"><p className="eyebrow">Point of view</p><h2>The house rules</h2></div>
        <div className="laws">
          {[["Warmth over sterility", "Warm surfaces, rich ink. Pure white and pure black are forbidden."], ["One hero per view", "Exactly one primary moment per screen."], ["Joy with a seatbelt", "Playful, but every pairing passes WCAG AA and every control has a focus ring."], ["The grid is 8", "4, 8, then multiples of 8. No orphan pixels."], ["Labels are verbs", "Buttons say exactly what happens. ‘Save changes’, never ‘Submit’."], ["Tokens are law", "Components reference semantic tokens only. A raw hex is a bug."]].map(([t, d]) => (
            <div className="law" key={t}><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Swatch({ v }: { v: string }) {
  return <div className="sw"><i style={{ background: `var(${v})` }} /><span>{v.replace("--ham-", "")}<br /><span className="swname">{v}</span></span></div>;
}
function Foundations() {
  return (
    <main className="page">
      <div className="sechead"><p className="eyebrow">Foundations</p><h2>Tokens are law</h2>
        <p>Live swatches — reading the current theme &amp; mode straight from the CSS variables. Every pairing passes WCAG AA.</p></div>
      <div className="founds">
        <div className="card"><h3>Color</h3><div className="swatches">
          {["--ham-surface", "--ham-surface-raised", "--ham-ink", "--ham-ink-soft", "--ham-primary", "--ham-accent", "--ham-success", "--ham-warning", "--ham-danger", "--ham-border-strong"].map((v) => <Swatch key={v} v={v} />)}
        </div></div>
        <div className="card"><h3>Type</h3><div className="tscale">
          <div><span className="tk">display</span><span style={{ fontFamily: "var(--ham-font-display)", fontSize: "1.6rem", fontWeight: 700 }}>Display</span></div>
          <div><span className="tk">body</span><span>Figtree, the workhorse</span></div>
          <div><span className="tk">mono</span><span className="mono">IBM Plex Mono 0123</span></div>
        </div><p className="hint">Display font changes per theme — Bricolage, Fraunces, Archivo.</p></div>
        <div className="card"><h3>Spacing — 8-point grid</h3>
          {[["1 · 4", 4], ["2 · 8", 8], ["3 · 16", 16], ["4 · 24", 24], ["5 · 32", 32], ["6 · 40", 40], ["8 · 64", 64]].map(([l, w]) => <div className="sprow" key={l as string}><span className="tk">space-{l}</span><span className="bar" style={{ width: w as number }} /></div>)}
        </div>
        <div className="card"><h3>Radius &amp; elevation</h3><div className="radrow">
          <div className="radchip"><i style={{ borderRadius: "var(--ham-radius-sm)" }} />sm</div>
          <div className="radchip"><i style={{ borderRadius: "var(--ham-radius)" }} />base</div>
          <div className="radchip"><i style={{ borderRadius: "var(--ham-radius-lg)" }} />lg</div>
        </div><div className="elev"><div style={{ boxShadow: "var(--ham-shadow-sm)" }}>sm</div><div style={{ boxShadow: "var(--ham-shadow)" }}>base</div><div style={{ boxShadow: "var(--ham-shadow-lg)" }}>lg</div></div>
        <p className="hint">Radii &amp; shadows carry each theme's personality.</p></div>
      </div>
    </main>
  );
}

function Components({ route, nav }: { route: string; nav: (r: string) => void }) {
  const key = route.split("/")[2] || COMPONENTS[0].key;
  const comp = COMPONENTS.find((c) => c.key === key) ?? COMPONENTS[0];
  return (
    <div className="browser">
      <aside className="sidebar">
        <div className="sidehead">Components</div>
        {COMPONENTS.map((c) => (
          <button key={c.key} className={c.key === comp.key ? "sideitem on" : "sideitem"} disabled={c.status === "planned"} onClick={() => nav(`/components/${c.key}`)}>
            {c.name}{c.status !== "stable" && <span className={`tag ${c.status}`}>{c.status}</span>}
          </button>
        ))}
      </aside>
      <main className="page detail">
        <ComponentDetail comp={comp} />
      </main>
    </div>
  );
}

function ComponentDetail({ comp }: { comp: ComponentDoc }) {
  if (comp.status === "planned")
    return (<><div className="sechead"><h2>{comp.name}</h2><p>{comp.tagline}</p></div><div className="planned">🚧 Planned — not built yet. Add it to <span className="mono">components/</span> and register it in <span className="mono">preview/registry.tsx</span>.</div></>);
  return (
    <>
      <div className="sechead"><p className="eyebrow">Component</p><h2>{comp.name}</h2><p>{comp.tagline}</p></div>
      {comp.examples.map((ex) => (
        <div className="example" key={ex.title}>
          <div className="exhead"><h3>{ex.title}</h3>{ex.desc && <p>{ex.desc}</p>}</div>
          <div className="exstage"><div className="exrow">{ex.node}</div></div>
        </div>
      ))}
      {comp.code && <><h3 className="subhead">Usage</h3><pre className="code">{comp.code}</pre></>}
      {comp.props.length > 0 && <>
        <h3 className="subhead">Props</h3>
        <div className="tablewrap"><table className="props"><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Notes</th></tr></thead>
          <tbody>{comp.props.map((p) => <tr key={p.name}><td className="mono">{p.name}</td><td className="mono ty">{p.type}</td><td className="mono">{p.def ?? "—"}</td><td>{p.desc}</td></tr>)}</tbody>
        </table></div>
      </>}
      {comp.intent && <><h3 className="subhead">Design law</h3><div className="intent"><Markdown src={comp.intent} /></div></>}
    </>
  );
}

function ThemeEditor({ theme, dark, edits, setEdits }: { theme: string; dark: boolean; edits: Record<string, string>; setEdits: React.Dispatch<React.SetStateAction<Record<string, string>>> }) {
  // Edits live on the `.app` wrapper, so the theme's untouched base values are
  // readable straight from <html> (which carries data-theme but no edits).
  const [base, setBase] = React.useState<Record<string, string>>({});
  React.useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const b: Record<string, string> = {};
    for (const [v] of EDIT_COLORS) { const raw = cs.getPropertyValue(v).trim(); b[v] = /^#[0-9a-f]{6}$/i.test(raw) ? raw : "#000000"; }
    for (const [v] of EDIT_RADII) b[v] = String(parseInt(cs.getPropertyValue(v)) || 0);
    setBase(b);
  }, [theme, dark]);

  const cval = (v: string) => edits[v] ?? base[v] ?? "#000000";
  const rval = (v: string) => parseInt(edits[v] ?? base[v] ?? "0") || 0;
  const setColor = (v: string, val: string) => setEdits((e) => ({ ...e, [v]: val, ...(v === "--ham-primary" ? { "--ham-primary-hover": val } : {}) }));
  const setRad = (v: string, val: number) => setEdits((e) => ({ ...e, [v]: val + "px" }));
  const dirty = Object.keys(edits).length > 0;
  const cssExport = `[data-theme="${theme}"]${dark ? ".dark" : ""} {\n${EDIT_KEYS.filter((k) => edits[k] !== undefined).map((k) => `  ${k}: ${edits[k]};`).join("\n")}\n}`;

  // Copy-to-clipboard with a graceful fallback: if the clipboard API is blocked
  // (insecure context, sandbox, denied permission) we select the text and tell
  // the user to press ⌘/Ctrl-C, instead of silently doing nothing.
  const preRef = React.useRef<HTMLPreElement>(null);
  const [copyMsg, setCopyMsg] = React.useState("");
  const copyCss = async () => {
    const selectForManualCopy = () => {
      const el = preRef.current;
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
      setCopyMsg("Press ⌘/Ctrl-C to copy");
    };
    try {
      const write = navigator.clipboard?.writeText(cssExport);
      if (!write) return selectForManualCopy();
      // writeText can hang forever without user activation — never leave the
      // button stuck; if it doesn't settle quickly, fall back to select-and-copy.
      await Promise.race([
        write,
        new Promise((_, reject) => window.setTimeout(() => reject(new Error("clipboard-timeout")), 1200)),
      ]);
      setCopyMsg("Copied ✓");
    } catch {
      selectForManualCopy();
    }
    window.setTimeout(() => setCopyMsg(""), 2500);
  };

  return (
    <div className="editor">
      <aside className="editpanel">
        <div className="sechead sm"><p className="eyebrow">Theme editor</p><h2>{theme}</h2>
          <p>Edit the tokens — every control updates the whole app live. Reseeds when you switch theme or mode.</p></div>
        <div className="pggroup"><h4>Colors</h4>
          {EDIT_COLORS.map(([v, label]) => (
            <label className="pgrow" key={v}>
              <input type="color" value={cval(v)} onChange={(e) => setColor(v, e.target.value)} />
              <span className="pglabel">{label}<br /><span className="pgvar">{v}</span></span>
              <span className="pghex">{cval(v).toUpperCase()}</span>
            </label>
          ))}
        </div>
        <div className="pggroup"><h4>Shape</h4>
          {EDIT_RADII.map(([v, label, min, max]) => (
            <label className="pgslider" key={v}><span>{label} <b>{rval(v)}px</b> · <span className="pgvar">{v}</span></span>
              <input type="range" min={min} max={max} value={rval(v)} onChange={(e) => setRad(v, +e.target.value)} /></label>
          ))}
        </div>
        <div className="editactions">
          <button className="pgreset" onClick={() => setEdits({})} disabled={!dirty}>↺ Reset</button>
        </div>
        {dirty && <div className="exportbox">
          <div className="exhd">Export — paste into <span className="mono">tokens/{theme}.css</span>
            <button className="copybtn" onClick={copyCss}>{copyMsg || "Copy"}</button>
          </div>
          <pre className="code sm" ref={preRef}>{cssExport}</pre>
        </div>}
      </aside>

      <main className="editpreview">
        <div className="pvcard">
          <span className="eye">Live preview</span>
          <h3>Ship your changes</h3>
          <p>Every control writes a <span className="mono">--ham-*</span> variable — the same tokens every component reads.</p>
          <div className="acts wrap"><Button variant="primary">Publish</Button><Button variant="secondary">Save draft</Button><Button variant="ghost">Cancel</Button><Button variant="danger">Delete</Button></div>
          <div className="acts wrap"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></div>
        </div>
      </main>
    </div>
  );
}
