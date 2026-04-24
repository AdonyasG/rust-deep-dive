import { useState, useEffect, useMemo } from 'react';
import {
  Home, Map, BookOpen, Hammer, Link as LinkIcon, CheckCircle2, Circle,
  AlertTriangle, Lightbulb, Code2, ArrowRight, Terminal, Zap, Shield,
  GitBranch, Package, Layers, FileCode, Menu, X, ChevronRight, Target,
  Wrench, Flame, Cpu, Database, Boxes, Sparkles, BookMarked, Milestone,
  TriangleAlert, CircleCheck, Hash, Quote, MoveRight, Braces, ExternalLink,
  ListChecks, Clock, Coffee, CircleDot, HardDrive
} from 'lucide-react';

/* ================================================================
   RUST DEEP DIVE — A Learning Site for Go Backend Engineers
   Single-file React artifact
   ================================================================ */

// ------------------------- Syntax Highlighter (Rust) -------------------------
const RUST_KEYWORDS = [
  'as', 'break', 'const', 'continue', 'crate', 'else', 'enum', 'extern',
  'false', 'fn', 'for', 'if', 'impl', 'in', 'let', 'loop', 'match', 'mod',
  'move', 'mut', 'pub', 'ref', 'return', 'self', 'Self', 'static', 'struct',
  'super', 'trait', 'true', 'type', 'unsafe', 'use', 'where', 'while',
  'async', 'await', 'dyn'
];
const RUST_TYPES = [
  'i8','i16','i32','i64','i128','isize',
  'u8','u16','u32','u64','u128','usize',
  'f32','f64','bool','char','str','String','Vec','HashMap','Option','Result',
  'Some','None','Ok','Err','Box','Rc','Arc'
];

function highlightRust(src) {
  // Tokenize via a single regex walk so we don't double-highlight inside strings/comments.
  const tokens = [];
  const re = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])')|(\b0x[0-9a-fA-F_]+\b|\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?(?:[iuf]\d+|[iu]size)?\b)|([A-Za-z_][A-Za-z0-9_]*!?)|([{}()\[\];,:.<>])|([+\-*/%&|^!?=]+)|(\s+)|(.)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (m[1]) tokens.push({ t: 'comment', v: m[1] });
    else if (m[2]) tokens.push({ t: 'string', v: m[2] });
    else if (m[3]) tokens.push({ t: 'string', v: m[3] });
    else if (m[4]) tokens.push({ t: 'number', v: m[4] });
    else if (m[5]) {
      const word = m[5];
      if (word.endsWith('!')) tokens.push({ t: 'macro', v: word });
      else if (RUST_KEYWORDS.includes(word)) tokens.push({ t: 'kw', v: word });
      else if (RUST_TYPES.includes(word)) tokens.push({ t: 'type', v: word });
      else if (/^[A-Z]/.test(word)) tokens.push({ t: 'type', v: word });
      else tokens.push({ t: 'ident', v: word });
    } else if (m[6]) tokens.push({ t: 'punct', v: m[6] });
    else if (m[7]) tokens.push({ t: 'op', v: m[7] });
    else tokens.push({ t: 'plain', v: m[0] });
  }
  return tokens;
}

function CodeBlock({ code, filename }) {
  const tokens = useMemo(() => highlightRust(code.trim()), [code]);
  const colorFor = {
    comment: 'var(--rust-muted)',
    string: 'var(--rust-string)',
    number: 'var(--rust-number)',
    kw: 'var(--rust-kw)',
    type: 'var(--rust-type)',
    macro: 'var(--rust-macro)',
    ident: 'var(--rust-ident)',
    punct: 'var(--rust-punct)',
    op: 'var(--rust-op)',
    plain: 'var(--rust-ident)',
  };
  return (
    <div className="my-5 overflow-hidden rounded border" style={{ borderColor: 'var(--line)', background: 'var(--code-bg)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b text-xs" style={{ borderColor: 'var(--line)', color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }}></span>
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }}></span>
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }}></span>
          </div>
          <span className="ml-2">{filename || 'main.rs'}</span>
        </div>
        <span>rust</span>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
        <code>
          {tokens.map((tok, i) => (
            <span key={i} style={{ color: colorFor[tok.t] || 'var(--rust-ident)' }}>{tok.v}</span>
          ))}
        </code>
      </pre>
    </div>
  );
}

// ------------------------- Callouts -------------------------
function Callout({ type = 'info', title, children }) {
  const config = {
    info:    { Icon: Lightbulb, border: 'var(--accent)', bg: 'var(--callout-info)',    label: 'NOTE' },
    warn:    { Icon: TriangleAlert, border: '#d4a054',   bg: 'var(--callout-warn)',    label: 'WATCH OUT' },
    go:      { Icon: GitBranch, border: 'var(--go-blue)', bg: 'var(--callout-go)',     label: 'GO ANCHOR' },
    win:     { Icon: CircleCheck, border: '#7fa368',     bg: 'var(--callout-win)',     label: 'KEY TAKEAWAY' },
    mistake: { Icon: Flame, border: '#b8654b',           bg: 'var(--callout-mistake)', label: 'COMMON MISTAKE' },
    exercise:{ Icon: Target, border: '#a78257',          bg: 'var(--callout-ex)',      label: 'EXERCISE' },
  }[type];
  const { Icon, border, bg, label } = config;
  return (
    <div className="my-5 rounded-r border-l-4 p-4 pl-5" style={{ borderColor: border, background: bg }}>
      <div className="flex items-center gap-2 mb-2 text-xs tracking-widest uppercase" style={{ color: border, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
        <Icon size={14} /> {title || label}
      </div>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
        {children}
      </div>
    </div>
  );
}

// ------------------------- Checklist (persistent) -------------------------
function useProgress() {
  const [progress, setProgress] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get('rust-progress');
        if (r && r.value) setProgress(JSON.parse(r.value));
      } catch (e) {
        // key doesn't exist yet; fine
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const toggle = async (id) => {
    const next = { ...progress, [id]: !progress[id] };
    setProgress(next);
    try { await window.storage.set('rust-progress', JSON.stringify(next)); } catch (e) {}
  };

  const reset = async () => {
    setProgress({});
    try { await window.storage.set('rust-progress', JSON.stringify({})); } catch (e) {}
  };

  return { progress, toggle, reset, loaded };
}

function Check({ id, progress, toggle, children }) {
  const done = !!progress[id];
  return (
    <li className="flex items-start gap-3 py-1.5 group">
      <button
        onClick={() => toggle(id)}
        className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110"
        aria-label={done ? 'Mark incomplete' : 'Mark complete'}
      >
        {done
          ? <CheckCircle2 size={18} style={{ color: 'var(--accent)' }} />
          : <Circle size={18} style={{ color: 'var(--rust-muted)' }} />
        }
      </button>
      <span className={done ? 'line-through opacity-60' : ''} style={{ color: 'var(--ink)' }}>
        {children}
      </span>
    </li>
  );
}

// ------------------------- Content blocks -------------------------
function SectionHeader({ eyebrow, title, subtitle, Icon }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3 text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          {Icon && <Icon size={14} />} {eyebrow}
        </div>
      )}
      <h2 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-strong)', lineHeight: 1.05 }}>
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>{subtitle}</p>
      )}
    </div>
  );
}

function TopicHeader({ num, title, sub }) {
  return (
    <div className="mb-5 pb-3 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="flex items-baseline gap-4">
        <span className="text-xs tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{num}</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink-strong)' }}>{title}</h3>
      </div>
      {sub && <p className="mt-2 text-base leading-relaxed" style={{ color: 'var(--ink)' }}>{sub}</p>}
    </div>
  );
}

// ============= PAGE: HOME =============
function HomePage({ navigate }) {
  return (
    <div>
      {/* Hero */}
      <div className="relative mb-16 pt-4">
        <div className="flex items-center gap-2 mb-6 text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          <span className="inline-block w-8 h-px" style={{ background: 'var(--accent)' }}></span>
          A Learning Plan for Go Engineers
        </div>
        <h1 className="mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.98, color: 'var(--ink-strong)' }}>
          From <em style={{ fontStyle: 'italic', color: 'var(--go-blue)' }}>go run</em><br/>
          to <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>cargo build</em>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed mb-10" style={{ color: 'var(--ink)' }}>
          You already think in types, pointers, and package boundaries. This is a two-phase plan
          to rewire those instincts for Rust — without pretending the borrow checker isn't going
          to fight you for a week.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('phase-a')}
            className="px-5 py-3 rounded transition-all hover:scale-[1.02]"
            style={{ background: 'var(--accent)', color: 'var(--surface)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.05em' }}
          >
            START PHASE A <ArrowRight size={14} className="inline ml-1" />
          </button>
          <button
            onClick={() => navigate('roadmap')}
            className="px-5 py-3 rounded border transition-all hover:bg-black/5"
            style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-strong)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.05em' }}
          >
            VIEW ROADMAP
          </button>
        </div>
      </div>

      {/* Timeline snapshot */}
      <div className="mb-16 rounded border p-6 md:p-8" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
        <div className="flex items-center gap-2 mb-5 text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          <Clock size={14}/> Realistic Timeline
        </div>
        <p className="mb-6 leading-relaxed" style={{ color: 'var(--ink)' }}>
          At roughly three flexible sessions per week, this is a <strong style={{ color: 'var(--ink-strong)' }}>four-to-six week plan</strong> for
          a busy engineer. Sessions don't need to be consecutive or regular — just consistent.
        </p>
        <div className="grid gap-3">
          {[
            { label: 'Block 1 — Syntax', sess: '1–3 sessions', note: 'Quick wins, familiar ground', Icon: Code2 },
            { label: 'Block 2 — Ownership', sess: '4–6 sessions', note: 'Slow down here intentionally', Icon: Shield, warn: true },
            { label: 'Phase B — Modeling', sess: '2–4 sessions', note: 'Go patterns resurface', Icon: Boxes },
            { label: 'Phase B — Collections', sess: '2–3 sessions', note: 'Wraps it up cleanly', Icon: Database },
            { label: 'Mini Project', sess: '2–4 sessions', note: 'Cements everything permanently', Icon: Hammer },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 gap-3 items-center py-3 border-b last:border-0" style={{ borderColor: 'var(--line)' }}>
              <div className="col-span-1"><row.Icon size={18} style={{ color: row.warn ? '#d4a054' : 'var(--accent)' }} /></div>
              <div className="col-span-5 md:col-span-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--ink-strong)' }}>
                {row.label}
              </div>
              <div className="col-span-3 md:col-span-3 text-sm" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>{row.sess}</div>
              <div className="col-span-12 md:col-span-4 text-sm italic" style={{ color: 'var(--ink)' }}>{row.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase cards */}
      <div className="grid md:grid-cols-2 gap-5 mb-16">
        <div className="rounded border p-6 md:p-7 transition-all hover:translate-y-[-2px]" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
          <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
            <Flame size={14}/> PHASE A · 2 WEEKS
          </div>
          <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, color: 'var(--ink-strong)' }}>Survive the Compiler</h3>
          <p className="mb-4 leading-relaxed text-sm" style={{ color: 'var(--ink)' }}>
            Foundations, ownership, borrowing. The phase that separates people who learn Rust
            from people who quietly give up.
          </p>
          <button onClick={() => navigate('phase-a')} className="text-xs tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
            Open Phase A <ArrowRight size={12}/>
          </button>
        </div>
        <div className="rounded border p-6 md:p-7 transition-all hover:translate-y-[-2px]" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
          <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
            <Wrench size={14}/> PHASE B · 2–3 WEEKS
          </div>
          <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, color: 'var(--ink-strong)' }}>Write Real Rust</h3>
          <p className="mb-4 leading-relaxed text-sm" style={{ color: 'var(--ink)' }}>
            Data modeling, error handling, collections, traits. Your Go instincts pay off here —
            most patterns translate, just more explicitly.
          </p>
          <button onClick={() => navigate('phase-b')} className="text-xs tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
            Open Phase B <ArrowRight size={12}/>
          </button>
        </div>
      </div>

      {/* Philosophy */}
      <div className="mb-16">
        <SectionHeader
          eyebrow="Learning Philosophy"
          Icon={Sparkles}
          title="Slow is fast"
          subtitle="The wall is ownership. Every other part of Rust is reasonable, but ownership is genuinely new territory if you've only written garbage-collected code. Don't try to skim it."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: 'Break things intentionally', b: 'The borrow checker is the teacher. You learn Rust by provoking errors and reading them — not by reading a book cover to cover.', Icon: Zap },
            { t: 'Translate from Go', b: 'Every concept has a Go Anchor on this site. Map new ideas onto what you already know — don\'t learn them in a vacuum.', Icon: GitBranch },
            { t: 'Build before reading more', b: 'After Phase B, you stop reading and start building. Nothing cements ownership like shipping a small real project.', Icon: Hammer },
          ].map((card, i) => (
            <div key={i} className="p-5 rounded border" style={{ borderColor: 'var(--line)' }}>
              <card.Icon size={18} style={{ color: 'var(--accent)' }} className="mb-3"/>
              <h4 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 500, color: 'var(--ink-strong)' }}>{card.t}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{card.b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============= PAGE: ROADMAP =============
function RoadmapPage({ navigate }) {
  const nodes = [
    { phase: 'Phase A', block: 'Block 1', title: 'Get Running + Core Syntax', sessions: '1–3', link: 'phase-a-block-1', topics: ['Toolchain setup', 'Variables & types', 'Control flow', 'Functions', 'Strings'] },
    { phase: 'Phase A', block: 'Block 2', title: 'Ownership & Borrowing', sessions: '4–6', link: 'phase-a-block-2', warn: true, topics: ['Ownership rules', 'Copy vs Move', 'References & borrowing', 'Mutable refs', 'Borrow checker errors', 'clone() & when to avoid it'] },
    { phase: 'Phase B', block: 'Modeling', title: 'Structs, Enums & Match', sessions: '2–3', link: 'phase-b-modeling', topics: ['Structs & impl', 'Enums with data', 'Exhaustive match'] },
    { phase: 'Phase B', block: 'Errors', title: 'Option, Result & the ? operator', sessions: '1–2', link: 'phase-b-errors', topics: ['Option<T>', 'Result<T, E>', '? operator'] },
    { phase: 'Phase B', block: 'Collections', title: 'Vec, HashMap & Iterators', sessions: '2–3', link: 'phase-b-collections', topics: ['Vec<T>', 'HashMap<K, V>', 'Iterator chains'] },
    { phase: 'Phase B', block: 'Structure', title: 'Traits, Lifetimes & Modules', sessions: '1–2', link: 'phase-b-structure', topics: ['Traits', 'Lifetime syntax', 'mod organization'] },
    { phase: 'Exit', block: 'Build', title: 'Mini Project', sessions: '2–4', link: 'projects', accent: true, topics: ['CLI tool', 'In-memory KV', 'HTTP + JSON client'] },
  ];
  return (
    <div>
      <SectionHeader
        eyebrow="The Journey"
        Icon={Map}
        title="Roadmap"
        subtitle="Six stops between a working Go brain and a working Rust brain. The map is linear — the pace is not."
      />
      <div className="relative pl-6 md:pl-10">
        {/* Vertical rail */}
        <div className="absolute left-1.5 md:left-3 top-2 bottom-2 w-px" style={{ background: 'var(--line-strong)' }}></div>
        {nodes.map((n, i) => (
          <div key={i} className="relative mb-8">
            <div
              className="absolute -left-[30px] md:-left-[38px] top-1.5 w-4 h-4 rounded-full border-2"
              style={{ background: n.accent ? 'var(--accent)' : 'var(--surface)', borderColor: n.warn ? '#d4a054' : 'var(--accent)' }}
            ></div>
            <button
              onClick={() => navigate(n.link)}
              className="text-left w-full rounded border p-5 md:p-6 transition-all hover:translate-x-1"
              style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2 text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rust-muted)' }}>
                <span style={{ color: n.accent ? 'var(--accent)' : 'var(--ink)' }}>{n.phase}</span>
                <span>·</span>
                <span>{n.block}</span>
                <span>·</span>
                <span style={{ color: n.warn ? '#d4a054' : 'var(--rust-muted)' }}>{n.sessions} sessions</span>
                {n.warn && <span className="ml-2 px-2 py-0.5 rounded" style={{ background: 'rgba(212,160,84,0.15)', color: '#d4a054' }}>THE WALL</span>}
              </div>
              <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--ink-strong)' }}>
                {n.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {n.topics.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-1 rounded" style={{ background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= PAGE: PHASE A — BLOCK 1 =============
function PhaseABlock1({ progress, toggle }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Phase A · Block 1"
        Icon={Code2}
        title="Get Running + Core Syntax"
        subtitle="Be comfortable reading and writing basic Rust without friction. This is the friendly hill before the mountain. Most of it maps onto Go syntax you already know — just with stricter defaults."
      />

      {/* 1.1 Toolchain */}
      <section className="mb-14">
        <TopicHeader num="1.1" title="Toolchain & First Run" sub="Install rustup, create a project, and deliberately break it so you can meet the compiler." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          Rust's toolchain is one of its quiet superpowers. <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>rustup</code> manages
          compiler versions, <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>cargo</code> handles
          build, dependencies, test, and documentation — think
          <em> go + go mod + gofmt + golangci-lint</em> rolled into one binary. Most of your first week will happen
          inside <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>cargo run</code>.
        </p>
        <CodeBlock filename="terminal" code={`# install once
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# new project
cargo new hello
cd hello

# the three commands you'll use forever
cargo run       // compile + run
cargo build     // compile only
cargo check     // typecheck without codegen — fast feedback loop`} />
        <Callout type="go">
          Like <code style={{ fontFamily: 'var(--font-mono)' }}>go build</code>, but the compiler is significantly
          more talkative. That's a feature, not noise — every long error message is a lesson you don't have to
          learn at 3am in production.
        </Callout>
        <p className="mb-3 font-semibold" style={{ color: 'var(--ink-strong)' }}>Project anatomy:</p>
        <CodeBlock filename="hello/" code={`hello/
├── Cargo.toml        // like go.mod — metadata + deps
├── Cargo.lock        // like go.sum — committed for binaries
└── src/
    └── main.rs       // entry point for a binary crate`} />
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="a1.1-a" progress={progress} toggle={toggle}>Install rustup and verify with <code>rustc --version</code></Check>
            <Check id="a1.1-b" progress={progress} toggle={toggle}>Create <code>hello</code> with <code>cargo new</code> and run it</Check>
            <Check id="a1.1-c" progress={progress} toggle={toggle}>Break it — remove a semicolon, misspell <code>println!</code>, read the full error output</Check>
            <Check id="a1.1-d" progress={progress} toggle={toggle}>Run <code>cargo check</code> and notice it's faster than <code>cargo build</code></Check>
          </ul>
        </Callout>
      </section>

      {/* 1.2 Variables */}
      <section className="mb-14">
        <TopicHeader num="1.2" title="Variables & Types" sub="Immutable by default. No implicit conversions. Shadowing lets you reuse a name inside a scope without mutation." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          In Go, <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>x := 5</code> creates a
          mutable variable; if you want immutability you use <code style={{ fontFamily: 'var(--font-mono)' }}>const</code> and
          accept its limits. Rust inverts this: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>let</code> is
          immutable, and you opt into mutation with <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>let mut</code>.
          This default matters — it makes mutation a deliberate, visible choice in every line.
        </p>
        <CodeBlock code={`let x = 5;         // immutable — reassigning is a compile error
let mut y = 10;    // mutable — y = 11 is fine
let z: u64 = 42;   // explicit type annotation

// Shadowing: redeclare a name, even with a different type
let spaces = "   ";          // &str
let spaces = spaces.len();   // now a usize — totally legal

// No implicit conversion — even widening requires 'as'
let a: i32 = 100;
let b: i64 = a as i64;       // explicit, always`} />
        <Callout type="go">
          Go's <code style={{ fontFamily: 'var(--font-mono)' }}>var x int = 5</code> and Rust's
          <code style={{ fontFamily: 'var(--font-mono)' }}> let x: i32 = 5</code> are essentially the same idea —
          Rust is just stricter about mutation and about narrowing/widening.
        </Callout>
        <p className="mb-3 font-semibold" style={{ color: 'var(--ink-strong)' }}>Scalar types you'll use constantly:</p>
        <div className="overflow-x-auto mb-4 rounded border" style={{ borderColor: 'var(--line)' }}>
          <table className="w-full text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
            <thead style={{ background: 'var(--surface-alt)' }}>
              <tr><th className="text-left px-4 py-2">Rust</th><th className="text-left px-4 py-2">Go</th><th className="text-left px-4 py-2">Use for</th></tr>
            </thead>
            <tbody>
              {[
                ['i32', 'int32', 'default signed integer'],
                ['i64', 'int64', 'big counters, timestamps'],
                ['u32 / u64', 'uint32 / uint64', 'never-negative values like sizes'],
                ['usize', 'int (index)', 'collection indexes & lengths'],
                ['f64', 'float64', 'default floating-point'],
                ['bool', 'bool', 'same as Go'],
                ['char', 'rune', 'single Unicode scalar — 4 bytes'],
              ].map((r, i) => (
                <tr key={i} className="border-t" style={{ borderColor: 'var(--line)' }}>
                  <td className="px-4 py-2" style={{ color: 'var(--accent)' }}>{r[0]}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--go-blue)' }}>{r[1]}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="mistake">
          Writing <code>let sum = a + b</code> where <code>a: i32</code> and <code>b: i64</code>. Rust
          refuses — you must pick a target type with <code>as</code>. This feels pedantic until it
          catches a real bug.
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="a1.2-a" progress={progress} toggle={toggle}>Declare a <code>let</code>, try to reassign, read the error</Check>
            <Check id="a1.2-b" progress={progress} toggle={toggle}>Shadow a <code>&amp;str</code> as a <code>usize</code> in one function</Check>
            <Check id="a1.2-c" progress={progress} toggle={toggle}>Force an <code>i32 → u64</code> conversion with <code>as</code></Check>
          </ul>
        </Callout>
      </section>

      {/* 1.3 Control Flow */}
      <section className="mb-14">
        <TopicHeader num="1.3" title="Control Flow" sub="if and match are expressions — they return values. loop can break with a value. for is always range-based." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          The headline difference: control-flow constructs in Rust are expressions, not statements.
          They evaluate to a value, which means you assign <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>let x = if cond {'{ ... }'}</code> directly
          instead of writing a helper. Once you notice this, you'll never miss Go's ternary-shaped hole.
        </p>
        <CodeBlock code={`// if is an expression
let score = 87;
let label = if score > 90 { "high" } else if score > 70 { "mid" } else { "low" };

// loop returns a value via break
let first_even = loop {
    let n = next_number();
    if n % 2 == 0 { break n; }
};

// while — same as Go
let mut n = 0;
while n < 5 { n += 1; }

// for — always iterator-based, like Go's 'for _, v := range'
for item in &["api", "worker", "db"] {
    println!("{}", item);
}

// Range-based for
for i in 0..5 { println!("{}", i); }       // 0,1,2,3,4
for i in 0..=5 { println!("{}", i); }      // 0,1,2,3,4,5  (inclusive)`} />
        <Callout type="go">
          Go has <code style={{ fontFamily: 'var(--font-mono)' }}>for i := 0; i &lt; n; i++</code> as its
          workhorse — Rust's equivalent is <code style={{ fontFamily: 'var(--font-mono)' }}>for i in 0..n</code>.
          Cleaner, and you can't accidentally go out of bounds.
        </Callout>
        <Callout type="win">
          Write FizzBuzz in Rust before moving on. It forces you to combine <code>for</code>,
          <code>if</code>, integer arithmetic, and <code>println!</code> — and getting it right without
          looking anything up is a real confidence signal.
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="a1.3-a" progress={progress} toggle={toggle}>Write FizzBuzz for 1..=100</Check>
            <Check id="a1.3-b" progress={progress} toggle={toggle}>Rewrite FizzBuzz using <code>match</code> on <code>(i % 3, i % 5)</code></Check>
            <Check id="a1.3-c" progress={progress} toggle={toggle}>Use <code>loop</code> with <code>break value</code> to find the first number divisible by 17</Check>
          </ul>
        </Callout>
      </section>

      {/* 1.4 Functions */}
      <section className="mb-14">
        <TopicHeader num="1.4" title="Functions" sub="Typed parameters, typed returns, implicit return from the last expression. Reserve explicit 'return' for early exits only." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          The mechanics are ordinary — what takes adjustment is that the <strong style={{ color: 'var(--ink-strong)' }}>last
          expression without a semicolon is the return value</strong>. Coming from Go, your fingers will
          keep typing <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>return x;</code> for
          a week. That's fine. Rewrite your first few functions to rely on implicit return and it stops feeling weird.
        </p>
        <CodeBlock code={`fn add(a: i32, b: i32) -> i32 {
    a + b      // no semicolon → this is the return value
}

fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        return 0.0;    // explicit 'return' for early exit — still valid
    }
    a / b
}

fn greet(name: &str) {
    // no return type means: returns () — Rust's "unit", like void
    println!("hi {}", name);
}`} />
        <Callout type="info">
          The distinction between <strong>expression</strong> (no semicolon, produces a value) and
          <strong> statement</strong> (with semicolon, produces nothing) is one of the two or three
          mental models that unlocks Rust. You'll see it again in blocks, matches, and closures.
        </Callout>
        <Callout type="mistake">
          Writing <code>a + b;</code> in the last line of a function that promises to return an
          <code> i32</code>. The trailing semicolon turns the expression into a statement — now the
          block evaluates to <code>()</code> and the compiler complains about a type mismatch.
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="a1.4-a" progress={progress} toggle={toggle}>Write <code>fn max(a: i32, b: i32) -&gt; i32</code> using an <code>if</code> expression</Check>
            <Check id="a1.4-b" progress={progress} toggle={toggle}>Write <code>fn is_prime(n: u32) -&gt; bool</code> using early <code>return</code></Check>
            <Check id="a1.4-c" progress={progress} toggle={toggle}>Remove the early returns and rewrite with single-expression style</Check>
          </ul>
        </Callout>
      </section>

      {/* 1.5 Strings */}
      <section className="mb-14">
        <TopicHeader num="1.5" title="Strings — The First Real Gotcha" sub="There are two string types in Rust. The question 'do I own this string or just look at it?' is the seed of all of Phase A." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          Go has one <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>string</code> type
          and it's immutable and passed by value. Rust splits the job in two because sometimes you <em>own</em> a
          string (allocate, mutate, free it) and sometimes you just want to <em>look at</em> some existing
          bytes. Collapsing these cases into one type is what makes Go ergonomic and Rust fast.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-5">
          <div className="p-5 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
            <h4 className="mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>String</h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              Owned, heap-allocated, growable. <strong>You</strong> are responsible for it. When it goes
              out of scope, its buffer is freed. Use when you're <em>building</em> or <em>returning</em>
              a string.
            </p>
          </div>
          <div className="p-5 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
            <h4 className="mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>&amp;str</h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              A <em>borrowed</em> view into some existing string data — either a slice of a
              <code> String</code>, or a string literal baked into the binary. Use when you're just
              <em> reading</em>.
            </p>
          </div>
        </div>
        <CodeBlock code={`let owned: String = String::from("hello");
let literal: &str = "world";          // lives in the binary forever
let view: &str = &owned;              // borrowed slice of 'owned'

// Convert between them
let back_to_owned: String = literal.to_string();
let also: String = String::from(literal);
let as_slice: &str = owned.as_str();

// Mutation only works on owned Strings
let mut greeting = String::from("hello");
greeting.push_str(", world!");        // fine
// "hello".push_str(...)  // compile error — can't mutate a literal

// Concatenation
let a = String::from("hello, ");
let b = String::from("world");
let c = a + &b;        // a is MOVED here, b is borrowed
// println!("{}", a);  // error — a is gone`} />
        <Callout type="go">
          Go's <code style={{ fontFamily: 'var(--font-mono)' }}>string</code> is effectively Rust's
          <code style={{ fontFamily: 'var(--font-mono)' }}> &amp;str</code> — immutable, cheap to pass. When
          Go's GC handles the lifetime for you, Rust asks: "Okay, so who owns this? And for how long?"
        </Callout>
        <Callout type="win">
          Heuristic: write function parameters as <code>&amp;str</code> by default. Only ask for
          <code> String</code> when the function needs to take ownership — e.g. to store it in a struct.
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="a1.5-a" progress={progress} toggle={toggle}>Write <code>fn greet(name: &amp;str) -&gt; String</code> that returns <code>"hello, Alice!"</code></Check>
            <Check id="a1.5-b" progress={progress} toggle={toggle}>Try to push_str to a <code>&amp;str</code> — read the error</Check>
            <Check id="a1.5-c" progress={progress} toggle={toggle}>Explain to yourself when you'd write <code>&amp;str</code> vs <code>String</code> as a parameter</Check>
          </ul>
        </Callout>
      </section>
    </div>
  );
}

// ============= PAGE: PHASE A — BLOCK 2 =============
function PhaseABlock2({ progress, toggle }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Phase A · Block 2 · The Wall"
        Icon={Shield}
        title="Ownership & Borrowing"
        subtitle="Spend the majority of your Phase A time here. If Block 1 took 3 sessions, Block 2 should take 6–8. Don't rush. This is the phase that separates people who learn Rust from people who give up."
      />

      <Callout type="warn" title="YOU ARE AT THE WALL">
        Every page before this one mapped onto concepts you already knew. From here down, ownership is
        genuinely new if you've only written garbage-collected code. Read twice, experiment three times.
      </Callout>

      {/* 2.1 Ownership rules */}
      <section className="mb-14">
        <TopicHeader num="2.1" title="The Three Ownership Rules" sub="Everything else in Phase A is a consequence of these three rules. Memorize them cold." />
        <div className="mb-5 p-5 rounded border" style={{ borderColor: 'var(--accent)', background: 'var(--callout-info)' }}>
          <ol className="space-y-2 list-decimal pl-5" style={{ color: 'var(--ink-strong)' }}>
            <li>Every value has exactly <strong>one owner</strong>.</li>
            <li>When the owner goes <strong>out of scope</strong>, the value is dropped (freed).</li>
            <li>There can only be <strong>one owner at a time</strong>.</li>
          </ol>
        </div>
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          Rust has no garbage collector and no manual <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>free()</code>.
          Instead, the compiler tracks ownership statically. When it can see exactly who owns each value
          and when that owner falls out of scope, it can insert the cleanup for you — at compile time,
          with zero runtime cost. The entire borrow checker exists to preserve the invariants that make
          this possible.
        </p>
        <CodeBlock code={`fn main() {
    let s1 = String::from("hello");
    let s2 = s1;                      // ownership MOVED from s1 → s2

    println!("{}", s2);               // ✅ fine
    // println!("{}", s1);            // 💥 error: value borrowed after move
}                                     // s2 dropped here → heap buffer freed`} />
        <Callout type="go">
          In Go, <code style={{ fontFamily: 'var(--font-mono)' }}>s2 := s1</code> copies a string header;
          both still point to the same underlying bytes; the GC reaps them when nothing references them.
          In Rust there's no GC, so the compiler picks one owner and invalidates the rest. No double-free,
          no use-after-free, at compile time.
        </Callout>
      </section>

      {/* 2.2 Copy vs Move */}
      <section className="mb-14">
        <TopicHeader num="2.2" title="Copy vs Move" sub="Small, stack-only types are copied on assignment. Anything with heap data is moved." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          The Copy/Move distinction is where most confusion starts. The rule is simple: types that are
          cheap and self-contained on the stack (integers, floats, booleans, chars, small tuples of those)
          implement the <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Copy</code> trait
          and are duplicated on assignment. Types that own heap data
          (<code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>String</code>,
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}> Vec</code>,
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}> HashMap</code>)
          cannot safely be duplicated silently — so they move instead.
        </p>
        <CodeBlock code={`// COPY — primitives are duplicated
let x: i32 = 5;
let y = x;
println!("{} {}", x, y);     // ✅ both valid — x was copied

// MOVE — heap types transfer ownership
let s1 = String::from("hi");
let s2 = s1;
// println!("{}", s1);       // 💥 error — s1 moved into s2
println!("{}", s2);          // ✅

// Structs of Copy types need #[derive(Copy, Clone)] to also be Copy
#[derive(Copy, Clone)]
struct Point { x: i32, y: i32 }

let p1 = Point { x: 1, y: 2 };
let p2 = p1;
println!("{} {}", p1.x, p2.x);   // ✅ both valid`} />
        <Callout type="info">
          Why isn't <code>String</code> Copy? Because silently duplicating a heap buffer would either
          double-free (if both owners tried to clean up) or cost a hidden allocation. Rust wants all
          heap allocations to be explicit, so it forces you to call <code>.clone()</code> when you
          actually mean "give me an independent copy of this heap data."
        </Callout>
      </section>

      {/* 2.3 References & Borrowing */}
      <section className="mb-14">
        <TopicHeader num="2.3" title="References & Borrowing" sub="Ownership by itself would be tedious — every function call would transfer ownership. References let you temporarily look at a value without taking it." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          A reference, written <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>&T</code>,
          is the Rust word for "pointer to <code>T</code>, which I borrowed and promise not to keep past its
          lifetime." The owner doesn't change. The reference disappears when it goes out of scope. The
          compiler verifies that the referent still exists every time you use it.
        </p>
        <CodeBlock code={`fn print_length(s: &String) {       // borrow — does not take ownership
    println!("length is {}", s.len());
}

fn main() {
    let s = String::from("hello");
    print_length(&s);                // pass a reference
    println!("{}", s);               // ✅ s is still valid — we only borrowed
}

// You can have as many immutable (&) borrows as you want
let s = String::from("data");
let a = &s;
let b = &s;
let c = &s;
println!("{} {} {}", a, b, c);       // ✅ fine`} />
        <Callout type="go">
          Like passing <code style={{ fontFamily: 'var(--font-mono)' }}>*string</code> in Go, except Go trusts
          you not to misuse it — "don't hold this pointer after the object is gone" is a vibe, not a
          rule. Rust's compiler verifies it at compile time, every time.
        </Callout>
      </section>

      {/* 2.4 Mutable References */}
      <section className="mb-14">
        <TopicHeader num="2.4" title="Mutable References & The Golden Rule" sub="One mutable reference OR many immutable ones. Never both. This single rule eliminates data races at compile time." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          If you want the borrower to modify the value, you need a mutable reference,
          written <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>&mut T</code>. The
          original binding must itself be <code style={{ fontFamily: 'var(--font-mono)' }}>mut</code> (because
          allowing mutation is a property of the binding, not just the reference).
        </p>
        <CodeBlock code={`fn grow(s: &mut String) {
    s.push_str(", world");
}

let mut s = String::from("hello");
grow(&mut s);
println!("{}", s);                    // "hello, world"

// THE GOLDEN RULE in action:
let mut s = String::from("data");
let r1 = &s;                          // immutable borrow
let r2 = &s;                          // another immutable — still fine
// let w  = &mut s;                   // 💥 error: can't mix with r1, r2
println!("{} {}", r1, r2);            // last use of r1, r2

let w = &mut s;                       // ✅ now we can — r1, r2 are done
w.push_str("!");`} />
        <Callout type="info" title="WHY THE GOLDEN RULE EXISTS">
          If two threads could both write to the same memory, you'd have a data race. If one thread wrote
          while another read, you'd have a data race. By statically proving at compile time that you
          never have those configurations, Rust eliminates entire categories of concurrency bugs —
          without needing a runtime race detector or a GIL.
        </Callout>
        <Callout type="win" title="NON-LEXICAL LIFETIMES">
          Modern Rust is smart: <code>r1</code> and <code>r2</code> are considered "done" after their
          last use, not at the closing brace. That's why the example above compiles. Older Rust
          tutorials may make this feel more restrictive than it actually is.
        </Callout>
      </section>

      {/* 2.5 Borrow Checker Errors */}
      <section className="mb-14">
        <TopicHeader num="2.5" title="Borrow Checker Errors — Lean Into Them" sub="The compiler is your tutor. You learn the rules faster by deliberately breaking them than by reading about them." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          Rust's error messages are unusually good — they quote your code, point at the exact span, and
          usually <em>tell you what to change</em>. The fastest way to internalize ownership is to
          provoke these errors on purpose and read them in full. Don't skim.
        </p>
        <p className="mb-3 font-semibold" style={{ color: 'var(--ink-strong)' }}>Errors worth triggering intentionally:</p>
        <CodeBlock code={`// (a) use after move
fn use_after_move() {
    let s = String::from("x");
    let t = s;
    println!("{}", s);   // error[E0382]: borrow of moved value: \`s\`
}

// (b) mix mutable + immutable borrow
fn mix_borrows() {
    let mut v = vec![1, 2, 3];
    let r = &v;
    let m = &mut v;       // error[E0502]
    println!("{:?} {:?}", r, m);
}

// (c) return reference to a local
fn dangling() -> &String {   // error[E0106]: missing lifetime specifier
    let s = String::from("bye");
    &s
}`} />
        <Callout type="win">
          Read every error <em>to the end</em>. Rust often prints a "help:" line with the fix. Over a
          few sessions you'll recognize the shapes of E0382, E0502, E0106 — and stop fearing them.
        </Callout>
      </section>

      {/* 2.6 Clone */}
      <section className="mb-14">
        <TopicHeader num="2.6" title="clone() — When, and When Not" sub="Cloning always works. That's why it's often a crutch that hides a misunderstanding of ownership." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>.clone()</code> makes
          a deep, independent copy. Both variables become independent owners. It's a legitimate tool —
          but if you reach for it to silence a borrow checker error, you're paying for an allocation
          to avoid thinking about the problem.
        </p>
        <CodeBlock code={`let s1 = String::from("hello");
let s2 = s1.clone();             // ← deliberate: I want two independent Strings
println!("{} {}", s1, s2);       // ✅

// When NOT to clone
fn print_length(s: String) { ... }   // takes ownership

let s = String::from("data");
print_length(s.clone());         // 😬 "fix" — but the real fix is:
// ↓
fn print_length(s: &str) { ... }     // borrow instead

let s = String::from("data");
print_length(&s);                // ✅ no allocation, s still valid`} />
        <Callout type="warn" title="TREAT CLONE AS A CODE SMELL">
          If you're cloning more than once or twice in a small program, you probably haven't understood
          ownership yet. Before writing <code>.clone()</code>, ask: "could I borrow instead? Could I
          restructure who owns this?"
        </Callout>
        <Callout type="info">
          Legitimate clone uses: spawning a thread that needs its own copy of a <code>String</code>,
          building independent copies for a cache, or breaking an ownership cycle where two parts
          genuinely need to keep the same data. Those are rare.
        </Callout>
      </section>

      {/* Phase A Exit */}
      <section className="mb-14 p-6 md:p-8 rounded border" style={{ borderColor: 'var(--accent)', background: 'var(--surface-alt)' }}>
        <div className="flex items-center gap-2 mb-3 text-xs tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          <Milestone size={14}/> Phase A Exit Checklist
        </div>
        <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, color: 'var(--ink-strong)' }}>
          Before moving to Phase B, you should be able to:
        </h3>
        <ul className="space-y-1">
          <Check id="a-exit-1" progress={progress} toggle={toggle}>Explain why <code>let s2 = s1</code> invalidates <code>s1</code> for a <code>String</code> but not for an <code>i32</code></Check>
          <Check id="a-exit-2" progress={progress} toggle={toggle}>Know when to use <code>&amp;T</code> vs <code>&amp;mut T</code> vs just <code>T</code> as a parameter</Check>
          <Check id="a-exit-3" progress={progress} toggle={toggle}>Write a function that borrows a <code>String</code> and returns its length — no cloning</Check>
          <Check id="a-exit-4" progress={progress} toggle={toggle}>Read a borrow checker error and understand what it's telling you</Check>
          <Check id="a-exit-5" progress={progress} toggle={toggle}>Explain the difference between <code>String</code> and <code>&amp;str</code> to someone else</Check>
        </ul>
      </section>
    </div>
  );
}

// ============= PAGE: PHASE B — Modeling =============
function PhaseBModeling({ progress, toggle }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Phase B · Data Modeling"
        Icon={Boxes}
        title="Structs, Enums & Match"
        subtitle="By now the compiler is less of an enemy. This is where your Go instincts pay off — structs map cleanly, but enums and match are a strict upgrade over what Go offers."
      />

      {/* Structs */}
      <section className="mb-14">
        <TopicHeader num="B.1" title="Structs & Methods" sub="Identical concept to Go structs. Behavior goes in 'impl' blocks." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          Structs are where Rust feels most like Go. You define data, then attach behavior to it in an
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}> impl</code> block. The only
          interesting wrinkle is the three flavors of <em>self</em> a method can take: a shared reference,
          an exclusive reference, or ownership itself.
        </p>
        <CodeBlock code={`struct Server {
    host: String,
    port: u16,
    healthy: bool,
}

impl Server {
    // Associated function — no self; called as Server::new(...)
    fn new(host: &str, port: u16) -> Self {
        Server { host: host.to_string(), port, healthy: true }
    }

    // &self  — read-only access
    fn address(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }

    // &mut self — mutates the server in place
    fn mark_unhealthy(&mut self) {
        self.healthy = false;
    }

    // self — CONSUMES the server (called rarely; for builder-style APIs)
    fn into_address(self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}

fn main() {
    let mut s = Server::new("api.example.com", 8080);
    println!("{}", s.address());
    s.mark_unhealthy();
}`} />
        <Callout type="go">
          Exactly like <code style={{ fontFamily: 'var(--font-mono)' }}>func (s Server) Address() string</code> — just
          with three explicit receiver flavors instead of value-vs-pointer.
        </Callout>
        <Callout type="info" title="self vs &self vs &mut self">
          <ul className="space-y-1 mt-1">
            <li><code>&self</code> — method reads the struct. Use this by default.</li>
            <li><code>&mut self</code> — method mutates the struct. Requires the caller's binding to be <code>mut</code>.</li>
            <li><code>self</code> — method consumes the struct. After the call, the caller loses it. Used for transformations like <code>into_x()</code>.</li>
          </ul>
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="b1-a" progress={progress} toggle={toggle}>Define a <code>User</code> struct with <code>name: String</code> and <code>age: u32</code></Check>
            <Check id="b1-b" progress={progress} toggle={toggle}>Add <code>new</code>, <code>greeting(&amp;self) -&gt; String</code>, <code>have_birthday(&amp;mut self)</code></Check>
            <Check id="b1-c" progress={progress} toggle={toggle}>Add <code>into_name(self) -&gt; String</code> — note the struct is consumed</Check>
          </ul>
        </Callout>
      </section>

      {/* Enums & Match */}
      <section className="mb-14">
        <TopicHeader num="B.2" title="Enums & Exhaustive Match" sub="Each variant can carry its own data. Match forces you to handle every case — no default escape hatch unless you ask for one." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          In Go, modeling a value that can be one of several distinct shapes typically involves a
          mixture of struct, constants, and type assertions. Rust collapses all of that into one
          feature: a sum type where each variant can carry its own payload.
        </p>
        <CodeBlock code={`enum ConnectionStatus {
    Connected,
    Connecting(u32),              // carries retry count
    Failed(String),               // carries error message
    Closed { reason: String, code: u16 },   // struct-like variant
}

fn describe(status: &ConnectionStatus) -> String {
    match status {
        ConnectionStatus::Connected              => "ok".to_string(),
        ConnectionStatus::Connecting(attempt)    => format!("retry {}", attempt),
        ConnectionStatus::Failed(msg)            => format!("error: {}", msg),
        ConnectionStatus::Closed { reason, code } => format!("closed {} ({})", reason, code),
    }
}`} />
        <Callout type="win" title="EXHAUSTIVENESS IS THE SUPERPOWER">
          If you add a new variant to <code>ConnectionStatus</code> six months later, every
          <code> match</code> that doesn't handle it becomes a compile error. You can't forget a case.
          That property is worth the entire feature on its own — it's how you refactor a large Rust
          codebase without fear.
        </Callout>
        <p className="mb-3 font-semibold" style={{ color: 'var(--ink-strong)' }}>Match can do more than enums:</p>
        <CodeBlock code={`// match on tuples
let point = (0, 5);
match point {
    (0, 0) => println!("origin"),
    (0, y) => println!("on y-axis at {}", y),
    (x, 0) => println!("on x-axis at {}", x),
    _      => println!("somewhere else"),
}

// match with guards
let n = 42;
match n {
    x if x < 0  => println!("negative"),
    0           => println!("zero"),
    x if x < 10 => println!("small"),
    _           => println!("big"),
}`} />
        <Callout type="mistake">
          Using <code>_ =&gt; ...</code> as a shortcut in a match over an enum. It works, but silently
          absorbs future variants. Prefer enumerating every variant — the compile error when you add a
          new one is the feature.
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="b2-a" progress={progress} toggle={toggle}>Model HTTP method as an enum: GET, POST(body: String), PUT(id: u64, body: String), DELETE(id: u64)</Check>
            <Check id="b2-b" progress={progress} toggle={toggle}>Write a function <code>describe(&amp;Method) -&gt; String</code> with an exhaustive match</Check>
            <Check id="b2-c" progress={progress} toggle={toggle}>Add a new variant — feel the compiler force you to handle it everywhere</Check>
          </ul>
        </Callout>
      </section>
    </div>
  );
}

// ============= PAGE: PHASE B — Errors =============
function PhaseBErrors({ progress, toggle }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Phase B · Error Handling"
        Icon={AlertTriangle}
        title="Option, Result & the ? Operator"
        subtitle="No null. No panics on missing values. Error propagation in one character. This is the part Go engineers quietly envy."
      />

      {/* Option */}
      <section className="mb-14">
        <TopicHeader num="B.3" title="Option<T> — Rust's Answer to nil" sub="Absence is modeled in the type system. The compiler forces you to handle it." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          Rust has no <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>nil</code>. A
          function that might not have a result returns <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Option&lt;T&gt;</code>,
          which is <code style={{ fontFamily: 'var(--font-mono)' }}>Some(value)</code> or
          <code style={{ fontFamily: 'var(--font-mono)' }}> None</code>. Because it's an enum, the compiler
          refuses to let you ignore the <code>None</code> case — eliminating nil pointer panics
          entirely.
        </p>
        <CodeBlock code={`fn find_port(name: &str) -> Option<u16> {
    match name {
        "http"  => Some(80),
        "https" => Some(443),
        "ssh"   => Some(22),
        _       => None,
    }
}

// match — always works
match find_port("http") {
    Some(port) => println!("port: {}", port),
    None       => println!("unknown service"),
}

// if let — cleaner when you only care about Some
if let Some(port) = find_port("https") {
    println!("found: {}", port);
}

// .unwrap_or(default) — extract value or fall back
let port = find_port("gopher").unwrap_or(70);

// .map(...) — transform without unwrapping
let doubled: Option<u16> = find_port("http").map(|p| p * 2);`} />
        <Callout type="go">
          Like returning <code style={{ fontFamily: 'var(--font-mono)' }}>(value, bool)</code> or
          <code style={{ fontFamily: 'var(--font-mono)' }}> (*T, error)</code> in Go. The difference: Go lets you
          ignore the second value and deference a nil pointer. Rust makes that a compile error.
        </Callout>
        <Callout type="mistake">
          Using <code>.unwrap()</code> anywhere near production code. It panics on <code>None</code>. Fine
          for throwaway scripts or prototypes; a ticking bomb in a real service. Prefer
          <code> .expect("reason")</code>, <code>.unwrap_or(...)</code>, or <code>match</code>.
        </Callout>
      </section>

      {/* Result & ? */}
      <section className="mb-14">
        <TopicHeader num="B.4" title="Result<T, E> & The ? Operator" sub="Go's (T, error) pair, but the compiler enforces it. And you get to throw away 'if err != nil { return err }'." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Result&lt;T, E&gt;</code> is
          either <code style={{ fontFamily: 'var(--font-mono)' }}>Ok(value)</code> or
          <code style={{ fontFamily: 'var(--font-mono)' }}> Err(error)</code>. Functions that can fail return
          one. The language then gives you the <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>?</code> operator:
          if it's <code>Err</code>, return it early (converting error type if needed); if it's <code>Ok</code>,
          unwrap and continue.
        </p>
        <CodeBlock code={`use std::fs;
use std::io;

// Without ? — every step is a match
fn read_config_verbose(path: &str) -> Result<String, io::Error> {
    let content = match fs::read_to_string(path) {
        Ok(c)  => c,
        Err(e) => return Err(e),
    };
    Ok(content.trim().to_string())
}

// With ? — the same logic, compressed
fn read_config(path: &str) -> Result<String, io::Error> {
    let content = fs::read_to_string(path)?;   // if Err → return Err
    Ok(content.trim().to_string())
}

// Chained ? — each step short-circuits on error
fn load_port(path: &str) -> Result<u16, Box<dyn std::error::Error>> {
    let text   = fs::read_to_string(path)?;
    let port   = text.trim().parse::<u16>()?;   // parse returns Result<_, ParseIntError>
    Ok(port)
}`} />
        <Callout type="win" title="THE ? OPERATOR">
          <code>?</code> is exactly <code>if err != nil {'{ return nil, err }'}</code> from Go — compressed into
          one character, and with an automatic error conversion through the
          <code> From</code> trait. It's the single biggest ergonomic win over Go error handling, and
          most Rust engineers forget how much time they used to spend writing that boilerplate.
        </Callout>
        <Callout type="info" title="A CRATE YOU'LL MEET EARLY">
          Real Rust services usually use the <code>anyhow</code> crate (for application error handling)
          or <code>thiserror</code> (for library error types) on top of plain <code>Result</code>. You
          don't need them for Phase B — but don't be surprised when they appear in any real project.
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="b4-a" progress={progress} toggle={toggle}>Write <code>fn parse_and_double(s: &amp;str) -&gt; Result&lt;i32, ParseIntError&gt;</code> using <code>?</code></Check>
            <Check id="b4-b" progress={progress} toggle={toggle}>Chain two <code>?</code> calls in one function</Check>
            <Check id="b4-c" progress={progress} toggle={toggle}>Catch the error at the top with <code>match</code> and print a friendly message</Check>
          </ul>
        </Callout>
      </section>
    </div>
  );
}

// ============= PAGE: PHASE B — Collections =============
function PhaseBCollections({ progress, toggle }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Phase B · Collections"
        Icon={Database}
        title="Vec, HashMap & Iterators"
        subtitle="Familiar data structures with a functional iterator API layered on top. Most Go slice and map patterns translate with minor syntactic rearrangement."
      />

      {/* Vec */}
      <section className="mb-14">
        <TopicHeader num="B.5" title="Vec<T>" sub="Rust's growable, heap-allocated, ordered collection. Directly analogous to Go slices." />
        <CodeBlock code={`// Construction
let mut servers: Vec<String> = Vec::new();
servers.push(String::from("api-1"));
servers.push(String::from("api-2"));

// The vec! macro — concise literal
let ports = vec![80, 443, 8080];

// Iteration
for s in &servers {            // borrow — servers still valid after
    println!("{}", s);
}

for s in &mut servers {        // mutable borrow
    s.push_str("-updated");
}

for s in servers {             // MOVE — servers is consumed here
    println!("owned: {}", s);
}
// servers is gone now

// Access — bounds-checked
let first = &ports[0];             // panics if out of bounds
let maybe = ports.get(100);        // returns Option<&i32> — safe`} />
        <Callout type="go">
          Go's slice is Rust's <code>Vec</code> in spirit. Two mechanical differences: Rust ranges return
          references unless you opt into ownership, and indexing with <code>[]</code> will panic
          out-of-bounds while <code>.get()</code> returns an <code>Option</code>.
        </Callout>
      </section>

      {/* HashMap */}
      <section className="mb-14">
        <TopicHeader num="B.6" title="HashMap<K, V>" sub="Same concept as Go's map. Follows the same ownership rules as everything else." />
        <CodeBlock code={`use std::collections::HashMap;

let mut scores: HashMap<String, i32> = HashMap::new();
scores.insert(String::from("alice"), 95);
scores.insert(String::from("bob"),   82);

// Lookup returns Option<&V>
match scores.get("alice") {
    Some(s) => println!("alice: {}", s),
    None    => println!("no alice"),
}

// Iteration — order is NOT guaranteed
for (name, score) in &scores {
    println!("{}: {}", name, score);
}

// The .entry() API — idiomatic "get or insert"
let counter = scores.entry(String::from("carol")).or_insert(0);
*counter += 1;`} />
        <Callout type="info" title="THE ENTRY API">
          The <code>.entry(key).or_insert(default)</code> pattern is Rust's version of Go's
          <code> m[k]++</code>-if-absent-else-insert dance. It returns a mutable reference you can
          modify in place, avoiding the double-lookup problem. Use it any time you'd otherwise write a
          match on <code>.get()</code> followed by <code>.insert()</code>.
        </Callout>
      </section>

      {/* Iterators */}
      <section className="mb-14">
        <TopicHeader num="B.7" title="Iterators — map, filter, collect" sub="Lazy by default. Chains compile down to tight loops. This is a genuinely lovely part of Rust." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          Iterators in Rust do nothing until consumed by a terminal operation like
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}> .collect()</code>,
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}> .sum()</code>,
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}> .for_each(...)</code>.
          Because of this laziness, chaining ten operations doesn't allocate ten intermediate buffers —
          the compiler fuses them into a single loop that's often faster than a hand-written one.
        </p>
        <CodeBlock code={`let ports = vec![80, 443, 22, 8080, 3000, 25];

// Filter high ports, collect into a new Vec
let high: Vec<u16> = ports
    .iter()
    .filter(|&&p| p > 1024)
    .copied()
    .collect();

// Transform each element
let doubled: Vec<u16> = ports
    .iter()
    .map(|p| p * 2)
    .collect();

// Combine operations
let sum: u32 = ports
    .iter()
    .filter(|&&p| p < 1024)
    .map(|&p| p as u32)
    .sum();

// find — returns Option<&T>
let first_secure = ports.iter().find(|&&p| p == 443);

// fold — general reduction
let total_digits: u32 = ports
    .iter()
    .fold(0u32, |acc, &p| acc + p.to_string().len() as u32);`} />
        <Callout type="win">
          When you first rewrite a nested Go for-loop as an iterator chain and it turns out to be
          faster, clearer, and shorter — that's the moment Rust starts to feel good.
        </Callout>
        <Callout type="exercise">
          <ul className="mt-1 space-y-1">
            <Check id="b7-a" progress={progress} toggle={toggle}>From <code>vec![1,2,3,4,5,6]</code>, build a <code>Vec&lt;i32&gt;</code> of the squares of even numbers</Check>
            <Check id="b7-b" progress={progress} toggle={toggle}>Count the characters across a <code>Vec&lt;String&gt;</code> using <code>.map</code> and <code>.sum</code></Check>
            <Check id="b7-c" progress={progress} toggle={toggle}>Use <code>.zip</code> to combine two Vecs into a <code>Vec&lt;(A, B)&gt;</code></Check>
          </ul>
        </Callout>
      </section>
    </div>
  );
}

// ============= PAGE: PHASE B — Structure =============
function PhaseBStructure({ progress, toggle }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Phase B · Organization"
        Icon={Layers}
        title="Traits, Lifetimes & Modules"
        subtitle="How to compose large Rust programs. Traits replace Go interfaces. Lifetimes are new but mostly inferred. Modules organize code just like Go packages."
      />

      {/* Traits */}
      <section className="mb-14">
        <TopicHeader num="B.8" title="Traits" sub="Like Go interfaces — but explicit. You opt in with 'impl Trait for Type'." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          A trait is a set of methods a type must implement to satisfy it. The concept is identical to
          Go interfaces with one crucial difference: in Go, satisfying an interface is implicit — if
          your type has the right methods, it counts. In Rust, you <em>explicitly</em> declare
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}> impl Trait for Type</code>. More
          typing, but also more discoverable, and it lets traits have default implementations.
        </p>
        <CodeBlock code={`trait Healthcheck {
    fn is_healthy(&self) -> bool;

    // Default method — types can override or accept it
    fn status_label(&self) -> &str {
        if self.is_healthy() { "OK" } else { "DOWN" }
    }
}

struct Server { port: u16 }
struct Worker { queue_depth: u32 }

impl Healthcheck for Server {
    fn is_healthy(&self) -> bool { self.port > 0 }
}

impl Healthcheck for Worker {
    fn is_healthy(&self) -> bool { self.queue_depth < 1000 }
}

// Functions can accept any type that implements a trait
fn report(item: &impl Healthcheck) {
    println!("{}", item.status_label());
}`} />
        <Callout type="go">
          Go's <code style={{ fontFamily: 'var(--font-mono)' }}>type Healthcheck interface {'{ IsHealthy() bool }'}</code> is
          satisfied automatically. Rust's <code style={{ fontFamily: 'var(--font-mono)' }}>impl Healthcheck for Server</code> is
          explicit. Same concept, one keyword longer.
        </Callout>
        <Callout type="info" title="DERIVED TRAITS">
          Many common traits can be auto-implemented with <code>#[derive(...)]</code> — for example
          <code> #[derive(Debug, Clone, PartialEq)]</code> on a struct gives you printing, cloning, and
          equality for free. You'll sprinkle these on almost every struct you write.
        </Callout>
      </section>

      {/* Lifetimes */}
      <section className="mb-14">
        <TopicHeader num="B.9" title="Lifetimes — Just Recognize the Syntax" sub="You don't need to master lifetimes in Phase B. You just need to stop panicking when you see them." />
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>
          A lifetime annotation tells the compiler how long a reference is valid. Most of the time they're
          inferred and you never write them. You'll only need to add them yourself when a function
          signature contains multiple references and the compiler can't figure out the relationship.
          That's a small percentage of real code.
        </p>
        <CodeBlock code={`// No explicit lifetimes needed — inferred
fn first_word(s: &str) -> &str {
    s.split_whitespace().next().unwrap_or("")
}

// Required — compiler can't tell which input the output borrows from
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// The 'a means: "x, y, and the return all live at least as long as 'a".
// This lets the compiler prove the returned reference won't outlive its source.`} />
        <Callout type="win" title="THE PHASE B RULE FOR LIFETIMES">
          Recognize <code>'a</code> syntax. Understand that it's a constraint, not a runtime value.
          When the compiler demands one, read its "help:" line — it usually tells you exactly what
          to write. Defer deep lifetime work until you need it.
        </Callout>
      </section>

      {/* Modules */}
      <section className="mb-14">
        <TopicHeader num="B.10" title="Code Organization with mod" sub="mod = Go package. pub = exported (like Go's capital-letter convention). You'll split main.rs as the project grows." />
        <CodeBlock filename="project layout" code={`my_service/
├── Cargo.toml
└── src/
    ├── main.rs             // binary entry point
    ├── config.rs           // a module — use from main with 'mod config;'
    ├── server/             // module with submodules
    │   ├── mod.rs          //   (or server.rs with a 'server/' dir alongside)
    │   ├── handlers.rs
    │   └── middleware.rs
    └── util.rs`} />
        <CodeBlock filename="src/main.rs" code={`mod config;                 // load src/config.rs
mod server;                 // load src/server/mod.rs or src/server.rs

use config::load_config;    // bring symbol into scope
use server::handlers;

fn main() {
    let cfg = load_config("app.toml");
    handlers::start(cfg);
}`} />
        <CodeBlock filename="src/config.rs" code={`pub struct Config {        // pub = exported
    pub host: String,
    pub port: u16,
}

pub fn load_config(path: &str) -> Config {
    // ...
    Config { host: "0.0.0.0".to_string(), port: 8080 }
}

// private helpers — no 'pub'
fn validate(_: &Config) -> bool { true }`} />
        <Callout type="go">
          <code style={{ fontFamily: 'var(--font-mono)' }}>mod</code> is your <code style={{ fontFamily: 'var(--font-mono)' }}>package</code>,
          <code style={{ fontFamily: 'var(--font-mono)' }}> pub</code> is your capitalized name,
          <code style={{ fontFamily: 'var(--font-mono)' }}> use</code> is your <code style={{ fontFamily: 'var(--font-mono)' }}>import</code>.
          The file-per-module convention is more flexible than Go's — and crates (entire compilation units)
          are your rough equivalent of Go modules.
        </Callout>
      </section>

      {/* Phase B Exit */}
      <section className="mb-14 p-6 md:p-8 rounded border" style={{ borderColor: 'var(--accent)', background: 'var(--surface-alt)' }}>
        <div className="flex items-center gap-2 mb-3 text-xs tracking-widest uppercase" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
          <Milestone size={14}/> Phase B Exit Checklist
        </div>
        <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, color: 'var(--ink-strong)' }}>
          Before you stop reading and start building:
        </h3>
        <ul className="space-y-1">
          <Check id="b-exit-1" progress={progress} toggle={toggle}>Write a struct with methods using <code>impl</code> and <code>&amp;self</code></Check>
          <Check id="b-exit-2" progress={progress} toggle={toggle}>Use <code>match</code> on an enum with data-carrying variants</Check>
          <Check id="b-exit-3" progress={progress} toggle={toggle}>Return <code>Result&lt;T, E&gt;</code> from a function and use <code>?</code></Check>
          <Check id="b-exit-4" progress={progress} toggle={toggle}>Iterate over a <code>Vec</code> using <code>.iter().map().filter().collect()</code></Check>
          <Check id="b-exit-5" progress={progress} toggle={toggle}>Define a trait and implement it for a struct</Check>
        </ul>
      </section>
    </div>
  );
}

// ============= PAGE: PROJECTS =============
function ProjectsPage({ progress, toggle }) {
  const projects = [
    {
      id: 'cli-config',
      title: 'Config-file CLI Validator',
      sub: 'Reads a TOML or JSON config file and validates its shape. Touches file I/O, error handling, and structs.',
      why: 'Forces you to use Result + ?, structs with derive macros, and at least one real crate (serde). Small enough to finish in 3–4 sessions.',
      stack: ['serde', 'serde_json / toml', 'clap or std::env'],
      spec: [
        'Accept a --path argument pointing to a config file',
        'Deserialize into a Config struct using #[derive(Deserialize)]',
        'Validate: port must be 1..=65535, host must be non-empty',
        'Print OK / ERROR with the specific violation',
        'Exit code 0 on success, 1 on invalid',
      ],
      touches: ['Result<T, E>', '? operator', 'Structs', 'Traits (derive)', 'std::env / std::fs']
    },
    {
      id: 'kv-store',
      title: 'In-Memory Key-Value Store',
      sub: 'A small library + binary: string keys, string values, get/set/delete, with a simple REPL.',
      why: 'HashMap + ownership in tight quarters. You\'ll feel the difference between storing owned Strings and borrowing them — one of the most useful Rust lessons there is.',
      stack: ['std::collections::HashMap', 'std::io (for the REPL)'],
      spec: [
        'Struct Store wrapping a HashMap<String, String>',
        'Methods: get(&self, &str) -> Option<&String>, set(&mut self, String, String), delete(&mut self, &str) -> Option<String>',
        'Simple text REPL: GET, SET, DEL, LIST, EXIT',
        'Return typed errors for malformed commands',
      ],
      touches: ['HashMap', 'Option / Result', 'Borrow vs own decisions', 'I/O loops']
    },
    {
      id: 'http-json',
      title: 'HTTP Client + JSON Parser',
      sub: 'Fetch JSON from a public API, deserialize it into typed structs, print a summary.',
      why: 'Introduces you to real crates, async basics (via blocking flavor), derive-based deserialization, and the full Result pipeline with ?.',
      stack: ['reqwest (blocking feature)', 'serde', 'serde_json', 'anyhow'],
      spec: [
        'Hit a real API — try https://api.github.com/repos/rust-lang/rust',
        'Define a struct matching the response shape with #[derive(Deserialize, Debug)]',
        'Use reqwest::blocking::get + .json::<T>()',
        'Return Result<_, anyhow::Error> and chain ? through the whole pipeline',
        'Print a one-line summary: "name · stars · open issues"',
      ],
      touches: ['Real crates', 'Derive macros', 'Error propagation with ?', 'Structs matching external data']
    },
  ];

  return (
    <div>
      <SectionHeader
        eyebrow="Phase B Exit"
        Icon={Hammer}
        title="Build Something"
        subtitle="After Phase B, don't move on to more reading. Building beats reading every time — and the closer the project is to your day-to-day work, the faster ownership clicks permanently."
      />
      <Callout type="win" title="PICK ONE — DON'T PICK THREE">
        These projects overlap on purpose. One of them, finished, teaches you more than three of them,
        half-done. Pick whichever is closest to something you'd build at work.
      </Callout>

      <div className="space-y-6 mt-8">
        {projects.map((p, i) => (
          <div key={p.id} className="rounded border p-6 md:p-7" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
            <div className="flex items-center gap-2 mb-2 text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              PROJECT {i + 1}
            </div>
            <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, color: 'var(--ink-strong)' }}>
              {p.title}
            </h3>
            <p className="mb-4 leading-relaxed" style={{ color: 'var(--ink)' }}>{p.sub}</p>

            <div className="mb-4">
              <div className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>Why this project</div>
              <p className="text-sm leading-relaxed italic" style={{ color: 'var(--ink)' }}>{p.why}</p>
            </div>

            <div className="mb-4">
              <div className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>What you'll touch</div>
              <div className="flex flex-wrap gap-2">
                {p.touches.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-1 rounded" style={{ background: 'var(--surface)', color: 'var(--ink-strong)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>Suggested crates</div>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s, j) => (
                  <span key={j} className="text-xs px-2 py-1 rounded border" style={{ borderColor: 'var(--line)', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{s}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>Spec / checklist</div>
              <ul className="space-y-1">
                {p.spec.map((s, j) => (
                  <Check key={j} id={`${p.id}-${j}`} progress={progress} toggle={toggle}>{s}</Check>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= PAGE: RESOURCES =============
function ResourcesPage() {
  const sections = [
    {
      title: 'Official & Essential',
      items: [
        { name: 'The Rust Book', url: 'https://doc.rust-lang.org/book/', note: 'The canonical reference. Chapters 3, 4, 6, 8, 9 map almost exactly to this plan.' },
        { name: 'Rust By Example', url: 'https://doc.rust-lang.org/rust-by-example/', note: 'The same material as the book, but example-first. Good second pass.' },
        { name: 'Rustlings', url: 'https://github.com/rust-lang/rustlings', note: 'Small exercises that compile-fail until you fix them — exactly the "break things, read errors" loop.' },
        { name: 'std library docs', url: 'https://doc.rust-lang.org/std/', note: 'You\'ll live here once you start building. Search-friendly, examples for every method.' },
      ]
    },
    {
      title: 'For Go Engineers Specifically',
      items: [
        { name: 'A half-hour to learn Rust', url: 'https://fasterthanli.me/articles/a-half-hour-to-learn-rust', note: 'Fast tour. Useful if you want the shape of the language before committing to a plan.' },
        { name: 'Rust for Gophers', url: 'https://www.youtube.com/results?search_query=rust+for+gophers', note: 'Various conference talks. Search on YouTube — the 30-minute ones are usually the best.' },
        { name: 'Effective Rust', url: 'https://www.lurklurk.org/effective-rust/', note: 'In the shape of Effective Go. Good to skim after Phase B, not before.' },
      ]
    },
    {
      title: 'Tooling You\'ll Want',
      items: [
        { name: 'rust-analyzer', url: 'https://rust-analyzer.github.io/', note: 'The LSP. Install in your editor before writing anything — type-on-hover alone is worth it.' },
        { name: 'clippy', url: 'https://doc.rust-lang.org/clippy/', note: 'Run with "cargo clippy". Catches idiomatic improvements the compiler doesn\'t.' },
        { name: 'rustfmt', url: 'https://github.com/rust-lang/rustfmt', note: 'Bundled with rustup. "cargo fmt" is "gofmt". No style debates required.' },
        { name: 'cargo-watch', url: 'https://github.com/watchexec/cargo-watch', note: 'Auto-rerun on file changes. Your tight feedback loop.' },
      ]
    },
    {
      title: 'Beyond the Plan',
      items: [
        { name: 'Tokio', url: 'https://tokio.rs/', note: 'The async runtime. Relevant once you need real concurrency — leave it until after the mini project.' },
        { name: 'anyhow & thiserror', url: 'https://docs.rs/anyhow/', note: 'Error-handling crates used in virtually every Rust application.' },
        { name: 'crates.io', url: 'https://crates.io/', note: 'The npm / go pkg of Rust. Search by keyword, read "Most Recent Versions".' },
        { name: 'This Week in Rust', url: 'https://this-week-in-rust.org/', note: 'Weekly digest. Subscribe after Phase B to stay current without doomscrolling HN.' },
      ]
    }
  ];

  return (
    <div>
      <SectionHeader
        eyebrow="Curated Links"
        Icon={LinkIcon}
        title="Resources"
        subtitle="A short, high-signal list. Fewer inputs, more repetition. Everything below was chosen because it either maps directly onto this plan or solves a problem you'll hit in Phase B."
      />
      <div className="space-y-10">
        {sections.map((sec, i) => (
          <div key={i}>
            <h3 className="mb-4 pb-2 border-b" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'var(--ink-strong)', borderColor: 'var(--line)' }}>
              {sec.title}
            </h3>
            <div className="grid gap-3">
              {sec.items.map((item, j) => (
                <a
                  key={j}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start gap-4 p-4 rounded border transition-all hover:translate-x-1"
                  style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}
                >
                  <ExternalLink size={16} style={{ color: 'var(--accent)' }} className="mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-strong)', fontSize: '0.95rem' }}>{item.name}</span>
                      <span className="text-xs" style={{ color: 'var(--rust-muted)' }}>{new URL(item.url).hostname}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{item.note}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= PAGE: PROGRESS =============
function ProgressPage({ progress, toggle, reset }) {
  // Build a tree from known IDs
  const groups = [
    { title: 'Phase A · Block 1 — Syntax', ids: [
      ['a1.1-a', 'Install rustup and verify rustc'],
      ['a1.1-b', 'cargo new hello and run it'],
      ['a1.1-c', 'Break a program intentionally, read the error'],
      ['a1.1-d', 'Run cargo check and compare to cargo build'],
      ['a1.2-a', 'Declare a let, try to reassign, read the error'],
      ['a1.2-b', 'Shadow a &str as a usize'],
      ['a1.2-c', 'Force an i32 → u64 conversion'],
      ['a1.3-a', 'FizzBuzz 1..=100'],
      ['a1.3-b', 'FizzBuzz using match on (i % 3, i % 5)'],
      ['a1.3-c', 'loop with break value'],
      ['a1.4-a', 'fn max using if expression'],
      ['a1.4-b', 'fn is_prime with early return'],
      ['a1.4-c', 'Rewrite is_prime single-expression style'],
      ['a1.5-a', 'fn greet(&str) -> String'],
      ['a1.5-b', 'push_str on a &str — read the error'],
      ['a1.5-c', 'Explain &str vs String to yourself'],
    ]},
    { title: 'Phase A · Block 2 — Ownership', ids: [
      ['a-exit-1', 'Explain move vs copy'],
      ['a-exit-2', '&T vs &mut T vs T'],
      ['a-exit-3', 'Borrow a String, return its length'],
      ['a-exit-4', 'Read a borrow-checker error'],
      ['a-exit-5', 'Explain String vs &str'],
    ]},
    { title: 'Phase B — Modeling', ids: [
      ['b1-a', 'Define User struct'],
      ['b1-b', 'Add new, greeting, have_birthday'],
      ['b1-c', 'Add into_name(self)'],
      ['b2-a', 'Model HTTP method as enum'],
      ['b2-b', 'describe(&Method) with exhaustive match'],
      ['b2-c', 'Add a variant, feel the compile errors'],
    ]},
    { title: 'Phase B — Errors & Collections', ids: [
      ['b4-a', 'parse_and_double with ?'],
      ['b4-b', 'Chain two ? calls'],
      ['b4-c', 'Catch at the top with match'],
      ['b7-a', 'Squares of even numbers'],
      ['b7-b', 'Count characters across Vec<String>'],
      ['b7-c', '.zip two Vecs'],
    ]},
    { title: 'Phase Exits', ids: [
      ['b-exit-1', 'Struct with &self methods'],
      ['b-exit-2', 'Match on enum with data'],
      ['b-exit-3', 'Return Result + ?'],
      ['b-exit-4', 'Iterator chain with map/filter/collect'],
      ['b-exit-5', 'Define + implement a trait'],
    ]},
  ];

  const total = groups.reduce((a, g) => a + g.ids.length, 0);
  const done = groups.reduce((a, g) => a + g.ids.filter(([id]) => progress[id]).length, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <SectionHeader
        eyebrow="Your Journey"
        Icon={ListChecks}
        title="Progress Tracker"
        subtitle="A consolidated view of every exercise across the plan. Your progress is saved automatically — close the tab and come back."
      />

      {/* Progress summary */}
      <div className="mb-10 p-6 rounded border" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>Overall</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--ink-strong)', letterSpacing: '-0.02em' }}>
              {done}<span style={{ color: 'var(--rust-muted)' }}> / {total}</span>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', color: 'var(--accent)' }}>
            {pct}%
          </div>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
          <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: 'var(--accent)' }}></div>
        </div>
        <button
          onClick={reset}
          className="mt-4 text-xs tracking-widest uppercase px-3 py-1.5 rounded border transition-colors hover:bg-black/5"
          style={{ borderColor: 'var(--line-strong)', color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Reset progress
        </button>
      </div>

      {/* Per-group progress */}
      <div className="space-y-8">
        {groups.map((g, i) => {
          const gDone = g.ids.filter(([id]) => progress[id]).length;
          return (
            <div key={i}>
              <div className="flex items-baseline justify-between mb-3 pb-2 border-b" style={{ borderColor: 'var(--line)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--ink-strong)' }}>{g.title}</h3>
                <div className="text-sm" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>{gDone} / {g.ids.length}</div>
              </div>
              <ul className="space-y-1">
                {g.ids.map(([id, label]) => (
                  <Check key={id} id={id} progress={progress} toggle={toggle}>{label}</Check>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============= APP SHELL =============
const NAV_ITEMS = [
  { id: 'home',              label: 'Home',           Icon: Home },
  { id: 'roadmap',           label: 'Roadmap',        Icon: Map },
  { id: 'phase-a',           label: 'Phase A',        Icon: Flame, group: 'Phase A · Survive the Compiler' },
  { id: 'phase-a-block-1',   label: 'Block 1 · Syntax',   Icon: Code2, indent: true },
  { id: 'phase-a-block-2',   label: 'Block 2 · Ownership', Icon: Shield, indent: true, warn: true },
  { id: 'phase-b',           label: 'Phase B',        Icon: Wrench, group: 'Phase B · Write Real Rust' },
  { id: 'phase-b-modeling',  label: 'Modeling',       Icon: Boxes, indent: true },
  { id: 'phase-b-errors',    label: 'Errors',         Icon: AlertTriangle, indent: true },
  { id: 'phase-b-collections', label: 'Collections',  Icon: Database, indent: true },
  { id: 'phase-b-structure', label: 'Structure',      Icon: Layers, indent: true },
  { id: 'projects',          label: 'Projects',       Icon: Hammer },
  { id: 'resources',         label: 'Resources',      Icon: LinkIcon },
  { id: 'progress',          label: 'Progress',       Icon: ListChecks },
];

// Phase A landing page (overview card)
function PhaseALanding({ navigate }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Phase A · 2 weeks"
        Icon={Flame}
        title="Survive the Compiler"
        subtitle="Foundations, ownership, borrowing. The phase that decides whether you learn Rust or not. Every concept here is unfamiliar territory compared to Go. Slow is fast."
      />
      <div className="grid md:grid-cols-2 gap-5 mt-8">
        <button onClick={() => navigate('phase-a-block-1')} className="text-left rounded border p-6 transition-all hover:translate-y-[-2px]" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
          <Code2 size={22} style={{ color: 'var(--accent)' }} className="mb-3"/>
          <div className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>Block 1 · 1–3 sessions</div>
          <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--ink-strong)' }}>Get Running + Core Syntax</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>Toolchain, variables, control flow, functions, and the first real gotcha — strings.</p>
        </button>
        <button onClick={() => navigate('phase-a-block-2')} className="text-left rounded border p-6 transition-all hover:translate-y-[-2px]" style={{ borderColor: '#d4a054', background: 'var(--surface-alt)' }}>
          <Shield size={22} style={{ color: '#d4a054' }} className="mb-3"/>
          <div className="text-xs tracking-widest uppercase mb-2 flex items-center gap-2" style={{ color: '#d4a054', fontFamily: 'var(--font-mono)' }}>
            Block 2 · 4–6 sessions <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(212,160,84,0.15)' }}>THE WALL</span>
          </div>
          <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--ink-strong)' }}>Ownership & Borrowing</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>The compiler will fight you. That's not a bug — that's the curriculum. Spend double the time here.</p>
        </button>
      </div>
    </div>
  );
}

function PhaseBLanding({ navigate }) {
  const cards = [
    { id: 'phase-b-modeling', Icon: Boxes, title: 'Structs, Enums & Match', sub: 'Data modeling with exhaustiveness guarantees your Go code never had.', sess: '2–3 sessions' },
    { id: 'phase-b-errors', Icon: AlertTriangle, title: 'Option, Result & ?', sub: 'No nil, no silent error swallowing. Your if err != nil reflex replaced with one character.', sess: '1–2 sessions' },
    { id: 'phase-b-collections', Icon: Database, title: 'Vec, HashMap & Iterators', sub: 'Go slices and maps with a clean functional iteration layer on top.', sess: '2–3 sessions' },
    { id: 'phase-b-structure', Icon: Layers, title: 'Traits, Lifetimes & Modules', sub: 'How you compose large Rust programs. Interfaces, but explicit.', sess: '1–2 sessions' },
  ];
  return (
    <div>
      <SectionHeader
        eyebrow="Phase B · 2–3 weeks"
        Icon={Wrench}
        title="Write Real Rust"
        subtitle="By now the compiler is less of an enemy. This is where Rust starts feeling good — and where your Go instincts pay off the most."
      />
      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {cards.map((c, i) => (
          <button key={i} onClick={() => navigate(c.id)} className="text-left rounded border p-6 transition-all hover:translate-y-[-2px]" style={{ borderColor: 'var(--line)', background: 'var(--surface-alt)' }}>
            <c.Icon size={22} style={{ color: 'var(--accent)' }} className="mb-3"/>
            <div className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>{c.sess}</div>
            <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 500, color: 'var(--ink-strong)' }}>{c.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{c.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RustDeepDive() {
  const [page, setPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { progress, toggle, reset, loaded } = useProgress();

  const navigate = (id) => {
    setPage(id);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };

  const pageEl = (() => {
    switch (page) {
      case 'home':               return <HomePage navigate={navigate} />;
      case 'roadmap':            return <RoadmapPage navigate={navigate} />;
      case 'phase-a':            return <PhaseALanding navigate={navigate} />;
      case 'phase-a-block-1':    return <PhaseABlock1 progress={progress} toggle={toggle} />;
      case 'phase-a-block-2':    return <PhaseABlock2 progress={progress} toggle={toggle} />;
      case 'phase-b':            return <PhaseBLanding navigate={navigate} />;
      case 'phase-b-modeling':   return <PhaseBModeling progress={progress} toggle={toggle} />;
      case 'phase-b-errors':     return <PhaseBErrors progress={progress} toggle={toggle} />;
      case 'phase-b-collections':return <PhaseBCollections progress={progress} toggle={toggle} />;
      case 'phase-b-structure':  return <PhaseBStructure progress={progress} toggle={toggle} />;
      case 'projects':           return <ProjectsPage progress={progress} toggle={toggle} />;
      case 'resources':          return <ResourcesPage />;
      case 'progress':           return <ProgressPage progress={progress} toggle={toggle} reset={reset} />;
      default:                   return <HomePage navigate={navigate} />;
    }
  })();

  return (
    <div className="min-h-screen" style={{
      background: 'var(--surface)',
      color: 'var(--ink)',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Theme + fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        :root {
          --surface:          #f5efe4;
          --surface-alt:      #ece4d4;
          --ink:              #3d3226;
          --ink-strong:       #1f1710;
          --line:             #d9cdb7;
          --line-strong:      #b8a583;
          --accent:           #b7410e;        /* rust */
          --accent-soft:      #ce6a3e;
          --go-blue:          #00add8;

          /* callouts */
          --callout-info:     #f3ebd7;
          --callout-warn:     #f3e3c0;
          --callout-go:       #e4f1f2;
          --callout-win:      #e8edd6;
          --callout-mistake:  #f2d9cf;
          --callout-ex:       #ede1c6;

          /* code */
          --code-bg:          #1f1710;
          --rust-muted:       #8b7560;
          --rust-string:      #c39a5a;
          --rust-number:      #d4a054;
          --rust-kw:          #ce6a3e;
          --rust-type:        #90b89f;
          --rust-macro:       #d4a054;
          --rust-ident:       #e8dfce;
          --rust-punct:       #8b7560;
          --rust-op:          #ce6a3e;

          --font-display:     'Fraunces', Georgia, serif;
          --font-mono:        'IBM Plex Mono', ui-monospace, monospace;
          --font-sans:        'IBM Plex Sans', system-ui, sans-serif;
        }

        * { box-sizing: border-box; }
        body { margin: 0; }

        /* Paper-like grain texture */
        .grain::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          z-index: 1;
          background-image:
            radial-gradient(circle at 20% 10%, rgba(139,117,96,0.08) 0, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(183,65,14,0.05) 0, transparent 50%);
        }

        code {
          font-family: var(--font-mono);
          font-size: 0.88em;
          background: rgba(183,65,14,0.08);
          color: var(--accent);
          padding: 0.08em 0.35em;
          border-radius: 3px;
        }
        .sidebar-link {
          transition: all 120ms ease;
        }
        .sidebar-link:hover {
          background: rgba(183,65,14,0.08);
        }

        @media (max-width: 1024px) {
          .desktop-sidebar { display: none; }
        }
        @media (min-width: 1024px) {
          .mobile-sidebar-trigger { display: none; }
        }
      `}</style>

      <div className="grain"></div>

      {/* Mobile header */}
      <div className="mobile-sidebar-trigger sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b" style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}>
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded">
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--accent)' }}>rust</span><span style={{ color: 'var(--rust-muted)' }}>://</span>deep-dive
        </div>
        <div className="w-8"></div>
      </div>

      {/* Layout */}
      <div className="flex relative" style={{ minHeight: '100vh' }}>
        {/* Sidebar — desktop */}
        <aside className="desktop-sidebar sticky top-0 h-screen overflow-y-auto border-r" style={{
          width: 280,
          flexShrink: 0,
          background: 'var(--surface-alt)',
          borderColor: 'var(--line)'
        }}>
          <SidebarContent page={page} navigate={navigate} />
        </aside>

        {/* Sidebar — mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)}></div>
            <aside className="relative w-72 h-full overflow-y-auto border-r" style={{ background: 'var(--surface-alt)', borderColor: 'var(--line)' }}>
              <div className="flex justify-end p-2">
                <button onClick={() => setSidebarOpen(false)} className="p-2"><X size={18}/></button>
              </div>
              <SidebarContent page={page} navigate={navigate} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 relative" style={{ zIndex: 2 }}>
          <div className="max-w-4xl mx-auto px-5 md:px-12 py-8 md:py-16">
            {pageEl}
            {/* Footer */}
            <div className="mt-20 pt-8 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--line)' }}>
              <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rust-muted)' }}>
                rust-deep-dive · for Go engineers · slow is fast
              </div>
              <div className="text-xs flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--rust-muted)' }}>
                <CircleDot size={12} style={{ color: loaded ? '#7fa368' : 'var(--rust-muted)' }}/>
                {loaded ? 'progress synced' : 'loading…'}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ page, navigate }) {
  return (
    <div className="p-5">
      {/* Brand */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink-strong)' }}>
          <span style={{ color: 'var(--accent)' }}>🦀</span> Rust Deep Dive
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--rust-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          A plan for Go engineers
        </div>
      </div>

      {/* Nav */}
      <nav>
        {NAV_ITEMS.map((item, i) => {
          const isActive = page === item.id;
          return (
            <div key={item.id}>
              {item.group && (
                <div className="mt-5 mb-2 pl-2 text-xs tracking-widest uppercase" style={{ color: 'var(--rust-muted)', fontFamily: 'var(--font-mono)' }}>
                  {item.group}
                </div>
              )}
              <button
                onClick={() => navigate(item.id)}
                className="sidebar-link flex items-center gap-3 w-full text-left px-3 py-2 rounded text-sm"
                style={{
                  background: isActive ? 'rgba(183,65,14,0.12)' : 'transparent',
                  color: isActive ? 'var(--accent)' : (item.warn ? '#d4a054' : 'var(--ink)'),
                  fontWeight: isActive ? 600 : 400,
                  paddingLeft: item.indent ? '2rem' : '0.75rem'
                }}
              >
                <item.Icon size={15} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Footer mini */}
      <div className="mt-10 pt-5 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="text-xs leading-relaxed italic" style={{ color: 'var(--rust-muted)' }}>
          "Slow is fast."
        </div>
      </div>
    </div>
  );
}