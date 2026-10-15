/* Progressive enhancement only. The site is fully readable without this file. */

interface Cmd {
  id: string;
  group: string;
  label: string;
  keywords?: string;
  href?: string;
  action?: string;
  lang?: string;
  external?: boolean;
}
interface Cfg {
  lang: string;
  strings: Record<string, string>;
  email: string;
  commands: Cmd[];
}
interface GhUser { public_repos: number; followers: number }
interface GhRepo { language: string | null; fork: boolean }

const $ = <T extends Element>(sel: string, scope: ParentNode = document): T | null =>
  scope.querySelector<T>(sel);
const $$ = <T extends Element>(sel: string, scope: ParentNode = document): T[] =>
  Array.from(scope.querySelectorAll<T>(sel));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;

let ctrl: AbortController | null = null;

function init(): void {
  ctrl?.abort();
  const life = new AbortController();
  ctrl = life;
  const signal = life.signal;
  const on = <K extends keyof WindowEventMap>(t: K, fn: (e: WindowEventMap[K]) => void, o: AddEventListenerOptions = {}) =>
    addEventListener(t, fn, { ...o, signal });
  const cfgEl = $<HTMLScriptElement>("#kd-config");
  const cfg: Cfg = cfgEl ? (JSON.parse(cfgEl.textContent ?? "{}") as Cfg) : { lang: "en", strings: {}, email: "", commands: [] };
  const S = cfg.strings;

  /* ── Platform hint for the shortcut ── */
  const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  $$<HTMLElement>("[data-kbd]").forEach((k) => {
    k.textContent = mac ? "⌘K" : "Ctrl K";
  });

  /* ── Nav: scrolled state ── */
  const nav = $<HTMLElement>("[data-nav]");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 24);
    onScroll();
    on("scroll", onScroll, { passive: true });
  }

  /* ── Mobile dock: step aside while reading down, return on the way up ── */
  const dock = $<HTMLElement>(".dock");
  if (dock) {
    let lastY = scrollY;
    on("scroll", () => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 8) return;
      const atEnd = y + innerHeight >= document.documentElement.scrollHeight - 4;
      dock.classList.toggle("is-away", y > lastY && y > 160 && !atEnd && !dock.contains(document.activeElement));
      lastY = y;
    }, { passive: true });
  }

  /* ── Scrollspy (home sections + case-study contents) ── */
  const spy = (links: HTMLAnchorElement[], attr: string, targets: HTMLElement[], margin: string) => {
    if (!links.length || !targets.length || !("IntersectionObserver" in window)) return;
    const set = (id: string | null) =>
      links.forEach((a) => {
        if (a.dataset[attr] === id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) set(hit.target.id);
      },
      { rootMargin: margin, threshold: [0, 0.2, 1] },
    );
    targets.forEach((t) => io.observe(t));
    signal.addEventListener("abort", () => io.disconnect());
    on("scroll", () => {
      if (scrollY < 200) set(null);
    }, { passive: true });
  };
  const homeIds = ["work", "about", "stack", "credentials", "notes", "contact"];
  spy(
    $$<HTMLAnchorElement>("[data-nav-link]"),
    "navLink",
    homeIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null),
    "-35% 0px -55% 0px",
  );
  spy(
    $$<HTMLAnchorElement>("[data-toc-link]"),
    "tocLink",
    $$<HTMLElement>(".cs__block"),
    "-20% 0px -65% 0px",
  );

  /* ── Reading progress ── */
  const bar = $<HTMLElement>("[data-progress]");
  if (bar) {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", String(max > 0 ? Math.min(1, scrollY / max) : 0));
    };
    update();
    on("scroll", () => {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
  }

  /* ── Theme: system / light / dark ── */
  const themeNames: Record<string, string> = { system: S["system"] ?? "System", light: S["light"] ?? "Light", dark: S["dark"] ?? "Dark" };
  const getPref = () => root.getAttribute("data-pref") ?? "system";
  const syncTheme = () => {
    const p = getPref();
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = p === "system" ? (dark ? "dark" : "light") : p;
    $$<HTMLMetaElement>("meta[name='theme-color']").forEach((m) => {
      if (p === "system") m.content = m.media.includes("dark") ? "#121513" : "#f4efe6";
      else m.content = resolved === "light" ? "#f4efe6" : "#121513";
    });
    $$<HTMLButtonElement>("[data-theme-toggle]").forEach((b) =>
      b.setAttribute("aria-label", (S["themeCycle"] ?? "Theme: {current}").replace("{current}", themeNames[p] ?? p)),
    );
    $$<HTMLButtonElement>("[data-theme-set]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset["themeSet"] === p)),
    );
  };
  const setPref = (p: string) => {
    if (p === getPref()) return;
    const apply = () => {
      root.setAttribute("data-pref", p);
      syncTheme();
    };
    /* Cross-fade the whole page instead of letting every surface snap at once. */
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!reduced && doc.startViewTransition) doc.startViewTransition(apply);
    else apply();
    try {
      if (p === "system") localStorage.removeItem("kd-theme");
      else localStorage.setItem("kd-theme", p);
    } catch {
      /* ignore */
    }
  };
  /* Toggle order follows the system: the first click always changes what you see. */
  const nextPref = () => {
    const sys = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const other = sys === "dark" ? "light" : "dark";
    const p = getPref();
    return p === "system" ? other : p === other ? sys : "system";
  };
  $$<HTMLButtonElement>("[data-theme-toggle]").forEach((b) =>
    b.addEventListener("click", () => setPref(nextPref()), { signal }),
  );
  $$<HTMLButtonElement>("[data-theme-set]").forEach((b) =>
    b.addEventListener("click", () => setPref(b.dataset["themeSet"] ?? "system"), { signal }),
  );
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncTheme, { signal });
  syncTheme();

  /* ── Language: remember an explicit choice ── */
  $$<HTMLElement>("[data-set-lang]").forEach((a) =>
    a.addEventListener("click", () => {
      try {
        localStorage.setItem("kd-lang", a.dataset["setLang"] ?? "en");
      } catch {
        /* ignore */
      }
    }, { signal }),
  );

  /* ── Mobile menu ── */
  const sheet = $<HTMLElement>("[data-sheet]");
  const toggle = $<HTMLButtonElement>("[data-menu-toggle]");
  const closeBtn = $<HTMLButtonElement>("[data-menu-close]");
  if (sheet && toggle) {
    const focusables = () => $$<HTMLElement>("a, button", sheet).filter((el) => !el.hasAttribute("disabled"));
    const open = () => {
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.add("is-open"));
      toggle.setAttribute("aria-expanded", "true");
      root.style.overflow = "hidden";
      closeBtn?.focus();
    };
    const hide = () => {
      sheet.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      root.style.overflow = "";
    };
    const close = () => {
      hide();
      setTimeout(() => {
        sheet.hidden = true;
      }, reduced ? 0 : 260);
      toggle.focus();
    };
    toggle.addEventListener("click", open, { signal });
    closeBtn?.addEventListener("click", close, { signal });
    $$("[data-sheet-link]", sheet).forEach((a) =>
      a.addEventListener("click", () => {
        hide();
        sheet.hidden = true;
      }, { signal }),
    );
    on("keydown", (e) => {
      if (sheet.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0];
        const last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    matchMedia("(min-width: 1000px)").addEventListener("change", (m) => {
      if (m.matches && !sheet.hidden) close();
    }, { signal });
  }

  /* ── Copy email ── */
  const copyEmail = async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(cfg.email);
      return true;
    } catch {
      return false;
    }
  };
  const copyBtn = $<HTMLButtonElement>("[data-copy]");
  if (copyBtn && navigator.clipboard) {
    const label = $<HTMLElement>("[data-copy-label]", copyBtn);
    const live = $<HTMLElement>("[data-copy-live]");
    let timer: number | undefined;
    copyBtn.addEventListener("click", async () => {
      if (!(await copyEmail())) return;
      copyBtn.classList.add("is-copied");
      if (label) label.textContent = S["copied"] ?? "Copied";
      if (live) live.textContent = S["copiedLive"] ?? "";
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        copyBtn.classList.remove("is-copied");
        if (label) label.textContent = S["copy"] ?? "Copy";
      }, 2000);
    }, { signal });
  }

  /* ── Reveal on scroll ── */
  const reveals = $$<HTMLElement>("[data-reveal]");
  if (reveals.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      /* Hide below-the-fold blocks only now that this script is known to run. */
      const fold = innerHeight * 0.92;
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < fold) el.classList.add("is-in", "is-settled");
      });
      root.classList.add("reveal-ready");
      const io = new IntersectionObserver(
        (entries) => {
          /* Blocks entering together (a grid of cards, a list) arrive in sequence. */
          let n = 0;
          for (const e of entries) {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              el.style.setProperty("--rd", `${Math.min(n++, 5) * 70}ms`);
              el.classList.add("is-in");
              el.addEventListener("transitionend", (ev) => {
                if (ev.target === el && ev.propertyName === "opacity") el.classList.add("is-settled");
              }, { signal });
              io.unobserve(el);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      reveals.forEach((el) => io.observe(el));
      signal.addEventListener("abort", () => io.disconnect());
    }
  }

  /* ── Command palette ── */
  const dlg = $<HTMLDialogElement>("[data-palette]");
  const input = $<HTMLInputElement>("[data-palette-input]");
  const list = $<HTMLElement>("[data-palette-list]");
  const empty = $<HTMLElement>("[data-palette-empty]");
  if (dlg && input && list && empty && typeof dlg.showModal === "function") {
    let shown: Cmd[] = [];
    let active = 0;
    const matches = (c: Cmd, tokens: string[]) => {
      const hay = `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    };
    const paint = () => {
      list.textContent = "";
      let lastGroup = "";
      shown.forEach((c, i) => {
        if (c.group !== lastGroup) {
          lastGroup = c.group;
          const h = document.createElement("li");
          h.className = "palette__group";
          h.setAttribute("role", "presentation");
          h.textContent = c.group;
          list.append(h);
        }
        const li = document.createElement("li");
        li.className = "palette__item";
        li.id = `pal-${i}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", String(i === active));
        li.dataset["i"] = String(i);
        const label = document.createElement("span");
        label.textContent = c.label;
        li.append(label);
        if (c.external) {
          const x = document.createElement("span");
          x.className = "palette__ext";
          x.textContent = "↗";
          x.setAttribute("aria-hidden", "true");
          li.append(x);
        }
        list.append(li);
      });
      empty.hidden = shown.length > 0;
      input.setAttribute("aria-activedescendant", shown.length ? `pal-${active}` : "");
      $(`#pal-${active}`, list)?.scrollIntoView({ block: "nearest" });
    };
    const filter = () => {
      const tokens = input.value.toLowerCase().split(/\s+/).filter(Boolean);
      shown = cfg.commands.filter((c) => matches(c, tokens));
      active = 0;
      paint();
    };
    const run = (c: Cmd) => {
      dlg.close();
      if (c.action === "copy-email") void copyEmail();
      else if (c.action?.startsWith("theme:")) setPref(c.action.slice(6));
      if (c.lang) {
        try {
          localStorage.setItem("kd-lang", c.lang);
        } catch {
          /* ignore */
        }
      }
      if (c.href) {
        if (c.external) window.open(c.href, "_blank", "noopener");
        else location.assign(c.href);
      }
    };
    const open = () => {
      if (dlg.open) return;
      input.value = "";
      filter();
      dlg.showModal();
      root.style.overflow = "hidden";
      input.focus();
    };
    $$<HTMLElement>("[data-palette-open]").forEach((b) => b.addEventListener("click", open, { signal }));
    on("keydown", (e) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        if (dlg.open) dlg.close();
        else open();
      } else if (k === "/" && !dlg.open && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? "")) {
        e.preventDefault();
        open();
      }
    });
    dlg.addEventListener("close", () => {
      root.style.overflow = "";
    }, { signal });
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    }, { signal });
    input.addEventListener("input", filter, { signal });
    input.addEventListener("keydown", (e) => {
      if (!shown.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = (active + 1) % shown.length;
        paint();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = (active - 1 + shown.length) % shown.length;
        paint();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const c = shown[active];
        if (c) run(c);
      }
    }, { signal });
    list.addEventListener("click", (e) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>("[data-i]");
      const c = li ? shown[Number(li.dataset["i"])] : undefined;
      if (c) run(c);
    }, { signal });
    list.addEventListener("pointermove", (e) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>("[data-i]");
      const i = li ? Number(li.dataset["i"]) : -1;
      if (i >= 0 && i !== active) {
        active = i;
        $$<HTMLElement>("[role=option]", list).forEach((o, n) => o.setAttribute("aria-selected", String(n === i)));
        input.setAttribute("aria-activedescendant", `pal-${i}`);
      }
    }, { signal });
  }

  /* ── GitHub: live public data, cached for an hour, no token ── */
  const gh = $<HTMLElement>("[data-github]");
  if (gh) {
    const user = gh.dataset["github"] ?? "";
    const KEY = `gh:${user}:v1`;
    const TTL = 60 * 60 * 1000;
    const load = async (): Promise<{ u: GhUser; r: GhRepo[] } | null> => {
      try {
        const cached = JSON.parse(localStorage.getItem(KEY) ?? "null") as { t: number; u: GhUser; r: GhRepo[] } | null;
        if (cached && Date.now() - cached.t < TTL) return cached;
      } catch {
        /* storage unavailable */
      }
      const c = new AbortController();
      const to = setTimeout(() => c.abort(), 6000);
      try {
        const h = { Accept: "application/vnd.github+json" };
        const [ur, rr] = await Promise.all([
          fetch(`https://api.github.com/users/${user}`, { signal: c.signal, headers: h }),
          fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`, { signal: c.signal, headers: h }),
        ]);
        if (!ur.ok || !rr.ok) return null;
        const data = { t: Date.now(), u: (await ur.json()) as GhUser, r: (await rr.json()) as GhRepo[] };
        try {
          localStorage.setItem(KEY, JSON.stringify(data));
        } catch {
          /* ignore */
        }
        return data;
      } catch {
        return null;
      } finally {
        clearTimeout(to);
      }
    };
    void load().then((d) => {
      if (!d || signal.aborted) return;
      const set = (sel: string, v: string) => {
        const el = $<HTMLElement>(sel, gh);
        if (el) el.textContent = v;
      };
      set("[data-gh-repos]", String(d.u.public_repos));
      set("[data-gh-followers]", String(d.u.followers));
      set("[data-gh-status-text]", S["live"] ?? "Live");
      $("[data-gh-status]", gh)?.classList.add("is-live");
      const counts = new Map<string, number>();
      for (const r of d.r) if (!r.fork && r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
      const total = [...counts.values()].reduce((a, b) => a + b, 0);
      const wrap = $<HTMLElement>("[data-gh-langs]", gh);
      const barEl = $<HTMLElement>("[data-gh-bar]", gh);
      const legend = $<HTMLElement>("[data-gh-legend]", gh);
      if (!total || !wrap || !barEl || !legend) return;
      barEl.textContent = "";
      legend.textContent = "";
      const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
      sorted.forEach(([lang, n], i) => {
        const o = Math.max(0.28, 0.95 - i * 0.2).toFixed(2);
        const seg = document.createElement("i");
        seg.style.flex = String(n);
        seg.style.setProperty("--o", o);
        seg.title = `${lang}: ${n}`;
        barEl.append(seg);
        const li = document.createElement("li");
        const dot = document.createElement("i");
        dot.style.setProperty("--o", o);
        const pct = document.createElement("span");
        pct.textContent = `${Math.round((n / total) * 100)}%`;
        li.append(dot, document.createTextNode(`${lang} `), pct);
        legend.append(li);
      });
      barEl.setAttribute("aria-label", sorted.map(([l, n]) => `${l} ${Math.round((n / total) * 100)}%`).join(", "));
      wrap.hidden = false;
    });
  }
}

(window as unknown as { __kd: { init: () => void } }).__kd = { init };
if (!(window as unknown as { __kdPreview?: boolean }).__kdPreview) init();
