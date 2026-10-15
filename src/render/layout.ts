import { credentials } from "../data/credentials.ts";
import { projects } from "../data/projects.ts";
import { publishedPosts } from "../data/posts.ts";
import { siteConfig, socialLinks } from "../data/site.ts";
import { htmlLang, ui } from "../i18n/ui.ts";
import type { Lang } from "../types.ts";
import { icons, monogram } from "./icons.ts";
import { asset, esc, fmtDate, href, otherLang, pick, sectionHref } from "./util.ts";
import type { RenderContext } from "./util.ts";

export interface HeadOptions {
  title: string;
  description: string;
  /** Logical page path without language, e.g. "work/hider". Empty = home. */
  path: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
  /** Hide the page's language alternates (shared 404). */
  noAlternates?: boolean;
}

export interface PageFrame {
  head: HeadOptions;
  body: string;
  bodyClass?: string;
}

/* Same policy as public/_headers, so it holds on any host. frame-ancestors
   only works as a header and stays there. */
const CSP =
  "default-src 'self'; connect-src 'self' https://api.github.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'";

type NavId = "work" | "security" | "about" | "stack" | "credentials" | "notes" | "contact";

const navItems = (): NavId[] => {
  const items: NavId[] = ["work", "security", "about", "stack"];
  if (credentials.length) items.push("credentials");
  if (publishedPosts().length) items.push("notes");
  items.push("contact");
  return items;
};

const absUrl = (ctx: RenderContext, path: string, lang: Lang): string =>
  `${ctx.siteUrl}/${lang === "tr" ? "tr/" : ""}${path ? `${path}/` : ""}`;

export const renderHead = (ctx: RenderContext, o: HeadOptions): string => {
  const canonical = ctx.siteUrl && !o.noindex ? absUrl(ctx, o.path, ctx.lang) : "";
  const og = ctx.siteUrl ? `${ctx.siteUrl}/og-${ctx.lang}.png` : asset(ctx, `og-${ctx.lang}.png`);
  const alt = (l: Lang): string => (ctx.siteUrl ? absUrl(ctx, o.path, l) : href(ctx, o.path, l));
  const alternates = o.noAlternates
    ? ""
    : `<link rel="alternate" hreflang="en" href="${esc(alt("en"))}">
<link rel="alternate" hreflang="tr" href="${esc(alt("tr"))}">
<link rel="alternate" hreflang="x-default" href="${esc(alt("en"))}">`;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Software Engineering Student",
    alumniOf: { "@type": "CollegeOrUniversity", name: siteConfig.education.university.en },
    knowsAbout: ["Cybersecurity", "Network security", "OSINT", "Software engineering", "Python", "Linux"],
    sameAs: [siteConfig.github.url, siteConfig.linkedin.url, siteConfig.instagram.url],
    ...(ctx.siteUrl ? { url: ctx.siteUrl } : {}),
  };
  const rss =
    ctx.siteUrl && publishedPosts().length
      ? `<link rel="alternate" type="application/rss+xml" title="${esc(siteConfig.name)}" href="${esc(`${ctx.siteUrl}/${ctx.lang === "tr" ? "tr/" : ""}rss.xml`)}">`
      : "";
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<meta name="author" content="${esc(siteConfig.name)}">
<meta name="theme-color" content="#f4efe6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121513" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
${o.noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow">'}
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ""}
${alternates}
${rss}
<link rel="icon" href="${asset(ctx, "icon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${asset(ctx, "apple-touch-icon.png")}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(siteConfig.name)}">
<meta property="og:locale" content="${ctx.lang === "tr" ? "tr_TR" : "en_GB"}">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.description)}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ""}
<meta property="og:image" content="${esc(og)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(o.title)}">
<meta name="twitter:description" content="${esc(o.description)}">
<meta name="twitter:image" content="${esc(og)}">
<link rel="preload" href="${asset(ctx, "fonts/Newsreader-Roman.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset(ctx, "fonts/Inter.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset(ctx, ctx.assets.css)}">
<script src="${asset(ctx, ctx.assets.boot)}"></script>
<script type="application/ld+json">${JSON.stringify(o.jsonLd ?? person).replaceAll("<", "\\u003c")}</script>
</head>`;
};

const renderThemeButton = (ctx: RenderContext): string => {
  const t = ui[ctx.lang];
  return `<button class="tool tool--icon" type="button" data-theme-toggle aria-label="${esc(t.theme.cycle(t.theme.system))}">
    <span class="theme-ic theme-ic--system">${icons.auto}</span><span class="theme-ic theme-ic--light">${icons.sun}</span><span class="theme-ic theme-ic--dark">${icons.moon}</span>
  </button>`;
};

const renderLangSwitch = (ctx: RenderContext, path: string): string => {
  const t = ui[ctx.lang];
  const item = (l: Lang): string =>
    l === ctx.lang
      ? `<span class="seg__item" aria-current="true" lang="${l}">${l.toUpperCase()}</span>`
      : `<a class="seg__item" href="${href(ctx, path, l)}" lang="${l}" hreflang="${l}" data-set-lang="${l}" aria-label="${esc(t.lang.switchTo)}">${l.toUpperCase()}</a>`;
  return `<div class="seg" role="group" aria-label="${esc(t.lang.label)}">${item("en")}${item("tr")}</div>`;
};

export const renderNav = (ctx: RenderContext, path: string): string => {
  const t = ui[ctx.lang];
  const links = navItems()
    .map((id) => `<a class="nav__link" href="${sectionHref(ctx, id)}" data-nav-link="${id}">${t.nav[id]}</a>`)
    .join("");
  const social = socialLinks
    .filter((s) => s.id === "github" || s.id === "linkedin")
    .map(
      (s) =>
        `<a class="nav__icon" href="${esc(s.href)}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">${icons[s.id]}</a>`,
    )
    .join("");
  const mobileLinks = navItems()
    .map(
      (id, i) =>
        `<a class="sheet__link" href="${sectionHref(ctx, id)}" data-sheet-link style="--i:${i}"><span class="sheet__idx">${String(i + 1).padStart(2, "0")}</span>${t.nav[id]}</a>`,
    )
    .join("");
  const mobileSocial = socialLinks
    .map(
      (s) =>
        `<a class="chip" href="${esc(s.href)}"${s.id === "email" ? "" : ' target="_blank" rel="noopener noreferrer"'}>${icons[s.id]}<span>${s.label}</span></a>`,
    )
    .join("");
  const themeOpt = (v: "system" | "light" | "dark", ic: string): string =>
    `<button class="seg__item" type="button" data-theme-set="${v}" aria-pressed="false">${ic}<span>${t.theme[v]}</span></button>`;
  return `<header class="nav" data-nav>
  <div class="nav__bar">
    <a class="brand" href="${href(ctx)}" aria-label="${esc(siteConfig.name)}, ${t.nav.home}">${monogram()}<span class="brand__word">${esc(siteConfig.brand)}</span></a>
    <nav class="nav__links" aria-label="${t.nav.primary}">${links}</nav>
    <div class="nav__tools">
      <button class="tool tool--search" type="button" data-palette-open aria-haspopup="dialog" aria-label="${esc(t.nav.searchAria)}">${icons.search}<span class="tool__label">${t.nav.search}</span><kbd data-kbd>Ctrl K</kbd></button>
      ${renderLangSwitch(ctx, path)}
      ${renderThemeButton(ctx)}
      <div class="nav__social">${social}</div>
    </div>
    <button class="nav__menu" type="button" aria-expanded="false" aria-controls="sheet" data-menu-toggle>
      <span class="sr-only">${t.nav.menu}</span>${icons.menu}
    </button>
  </div>
</header>
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Menu" hidden data-sheet>
  <div class="sheet__inner">
    <button class="sheet__close" type="button" data-menu-close aria-label="${t.nav.closeMenu}">${icons.close}</button>
    <nav class="sheet__nav" aria-label="${t.nav.mobile}">${mobileLinks}</nav>
    <div class="sheet__prefs">
      ${renderLangSwitch(ctx, path)}
      <div class="seg seg--wide" role="group" aria-label="${esc(t.theme.label)}">${themeOpt("system", icons.auto)}${themeOpt("light", icons.sun)}${themeOpt("dark", icons.moon)}</div>
    </div>
    <div class="sheet__social">${mobileSocial}</div>
  </div>
</div>`;
};

export const renderDock = (ctx: RenderContext): string => {
  const t = ui[ctx.lang];
  const gh = socialLinks.find((s) => s.id === "github");
  const li = socialLinks.find((s) => s.id === "linkedin");
  const mail = socialLinks.find((s) => s.id === "email");
  return `<nav class="dock" aria-label="${esc(t.nav.quick)}">
  <button class="dock__btn" type="button" data-palette-open aria-haspopup="dialog" aria-label="${esc(t.nav.searchAria)}">${icons.search}</button>
  <a class="dock__btn" href="${esc(gh?.href ?? "")}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${icons.github}</a>
  <a class="dock__btn" href="${esc(li?.href ?? "")}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${icons.linkedin}</a>
  <a class="dock__btn" href="${esc(mail?.href ?? "")}" aria-label="${esc(t.contact.email)}">${icons.email}</a>
</nav>`;
};

export const renderFooter = (ctx: RenderContext): string => {
  const t = ui[ctx.lang];
  const social = socialLinks
    .map(
      (s) =>
        `<li><a href="${esc(s.href)}"${s.id === "email" ? "" : ' target="_blank" rel="noopener noreferrer"'}>${s.label}</a></li>`,
    )
    .join("");
  const links = navItems()
    .map((id) => `<li><a href="${sectionHref(ctx, id)}">${t.nav[id]}</a></li>`)
    .join("");
  return `<footer class="footer">
  <div class="wrap footer__grid">
    <div class="footer__id">
      <a class="brand" href="${href(ctx)}" aria-label="${esc(siteConfig.name)}, ${t.nav.home}">${monogram()}<span class="brand__word">${esc(siteConfig.brand)}</span></a>
      <p class="footer__line">${esc(pick(ctx, siteConfig.statement))}</p>
      <p class="footer__motto" aria-hidden="true">build · break · secure</p>
    </div>
    <nav aria-label="${t.footer.site}"><p class="eyebrow">${t.footer.site}</p><ul class="footer__list">${links}</ul></nav>
    <nav aria-label="${t.footer.elsewhere}"><p class="eyebrow">${t.footer.elsewhere}</p><ul class="footer__list">${social}</ul></nav>
  </div>
  <div class="wrap footer__base">
    <span>© ${new Date(ctx.buildDate).getUTCFullYear()} ${esc(siteConfig.name)}</span>
    <p class="footer__stamp"><span>${t.footer.privacy}</span><span class="sep" aria-hidden="true">·</span><a class="footer__sec" href="${asset(ctx, ".well-known/security.txt")}">security.txt</a><span class="sep" aria-hidden="true">·</span><span>${t.footer.updated} <time datetime="${esc(ctx.buildDate.slice(0, 10))}">${esc(fmtDate(ctx.buildDate, ctx.lang, "long"))}</time></span></p>
    <a href="#top" class="footer__top">${t.footer.top} ${icons.arrowUp}</a>
  </div>
</footer>`;
};

interface Command {
  id: string;
  group: string;
  label: string;
  keywords?: string;
  href?: string;
  action?: string;
  lang?: string;
  external?: boolean;
}

const buildCommands = (ctx: RenderContext, path: string): Command[] => {
  const t = ui[ctx.lang];
  const cmds: Command[] = [];
  for (const id of navItems()) {
    cmds.push({ id: `go-${id}`, group: t.palette.go, label: t.nav[id], href: sectionHref(ctx, id) });
  }
  if (siteConfig.showGithubSection) cmds.push({ id: "go-github", group: t.palette.go, label: t.palette.githubSection, href: sectionHref(ctx, "github") });
  for (const p of projects.filter((x) => !x.hidden && (x.caseStudy || siteConfig.showRepoLinks))) {
    cmds.push({
      id: `p-${p.slug}`,
      group: t.palette.projects,
      label: p.name,
      keywords: `${pick(ctx, p.tagline)} ${p.tech.join(" ")}`,
      href: p.caseStudy ? href(ctx, `work/${p.slug}`) : p.repo,
      external: !p.caseStudy,
    });
  }
  for (const post of publishedPosts()) {
    cmds.push({
      id: `n-${post.slug}`,
      group: t.palette.notes,
      label: pick(ctx, post.title),
      keywords: post.tags.join(" "),
      href: href(ctx, `notes/${post.slug}`),
    });
  }
  cmds.push(
    { id: "l-gh", group: t.palette.links, label: t.palette.openGithub, href: siteConfig.github.url, external: true },
    { id: "l-li", group: t.palette.links, label: t.palette.openLinkedin, href: siteConfig.linkedin.url, external: true },
    { id: "l-ig", group: t.palette.links, label: t.palette.openInstagram, href: siteConfig.instagram.url, external: true },
    { id: "l-mail", group: t.palette.links, label: t.palette.sendEmail, href: `mailto:${siteConfig.email}`, keywords: siteConfig.email },
    { id: "l-copy", group: t.palette.links, label: t.palette.copyEmail, action: "copy-email", keywords: siteConfig.email },
  );
  if (siteConfig.cv) {
    cmds.push({ id: "l-cv", group: t.palette.links, label: t.palette.cv, href: siteConfig.cv.url, external: true });
  }
  cmds.push(
    { id: "t-system", group: t.palette.prefs, label: t.palette.themeSystem, action: "theme:system", keywords: "theme tema" },
    { id: "t-light", group: t.palette.prefs, label: t.palette.themeLight, action: "theme:light", keywords: "theme tema" },
    { id: "t-dark", group: t.palette.prefs, label: t.palette.themeDark, action: "theme:dark", keywords: "theme tema" },
    {
      id: "lang",
      group: t.palette.prefs,
      label: t.palette.switchLang,
      href: href(ctx, path, otherLang(ctx.lang)),
      lang: otherLang(ctx.lang),
      keywords: "language dil türkçe english",
    },
  );
  return cmds;
};

const renderPalette = (ctx: RenderContext, path: string): string => {
  const t = ui[ctx.lang];
  const cfg = {
    lang: ctx.lang,
    strings: {
      copied: t.contact.copied,
      copy: t.contact.copy,
      copiedLive: t.contact.copiedLive,
      live: t.github.live,
      themeCycle: t.theme.cycle("{current}"),
      system: t.theme.system,
      light: t.theme.light,
      dark: t.theme.dark,
    },
    email: siteConfig.email,
    commands: buildCommands(ctx, path),
  };
  return `<dialog class="palette" data-palette aria-label="${esc(t.palette.label)}">
  <div class="palette__box">
    <div class="palette__field">${icons.search}<input class="palette__input" type="text" role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" aria-label="${esc(t.palette.label)}" placeholder="${esc(t.palette.placeholder)}" autocomplete="off" autocapitalize="off" spellcheck="false" data-palette-input></div>
    <ul class="palette__list" id="palette-list" role="listbox" aria-label="${esc(t.palette.label)}" data-palette-list></ul>
    <p class="palette__empty" data-palette-empty hidden>${t.palette.empty}</p>
    <p class="palette__foot"><span><kbd>↑</kbd><kbd>↓</kbd> ${t.palette.move}</span><span><kbd>↵</kbd> ${t.palette.open}</span><span><kbd>esc</kbd> ${t.palette.close}</span></p>
  </div>
</dialog>
<script type="application/json" id="kd-config">${JSON.stringify(cfg).replaceAll("<", "\\u003c")}</script>`;
};

export const renderDocument = (ctx: RenderContext, f: PageFrame): string => {
  const t = ui[ctx.lang];
  return `<!doctype html>
<html lang="${htmlLang[ctx.lang]}">
${renderHead(ctx, f.head)}
<body${f.bodyClass ? ` class="${f.bodyClass}"` : ""} id="top">
<a class="skip" href="#main">${t.skip}</a>
${renderNav(ctx, f.head.path)}
<main id="main" tabindex="-1">
${f.body}
</main>
${renderFooter(ctx)}
${renderDock(ctx)}
${renderPalette(ctx, f.head.path)}
<script src="${asset(ctx, ctx.assets.js)}" defer></script>
</body>
</html>
`;
};
