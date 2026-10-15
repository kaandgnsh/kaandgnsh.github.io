import { publishedPosts, readingMinutes } from "../data/posts.ts";
import { siteConfig } from "../data/site.ts";
import { ui } from "../i18n/ui.ts";
import type { Block, Post, Project } from "../types.ts";
import { icons } from "./icons.ts";
import type { PageFrame } from "./layout.ts";
import { renderCredentialsBody, renderHomeBody, visibleProjects } from "./sections.ts";
import { asset, cmdLine, esc, fmtDate, href, inline, pick, sectionHref } from "./util.ts";
import type { RenderContext } from "./util.ts";

export const homeFrame = (ctx: RenderContext): PageFrame => ({
  head: {
    title: pick(ctx, siteConfig.title),
    description: pick(ctx, siteConfig.description),
    path: "",
  },
  body: renderHomeBody(ctx),
  bodyClass: "home",
});

const list = (items: string[]): string =>
  `<ul class="plain plain--lg">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

const tags = (items: string[]): string =>
  `<ul class="tags">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

interface Section {
  id: string;
  label: string;
  html: string;
}

const progress = `<div class="progress" aria-hidden="true" data-progress></div>`;

interface PagerCell {
  href: string;
  label: string;
  name: string;
}

const pager = (prev?: PagerCell, next?: PagerCell): string => {
  if (!prev && !next) return "";
  const cell = (c: PagerCell | undefined, dir: "prev" | "next"): string =>
    c
      ? `<a class="pager__item pager__item--${dir}" href="${c.href}"><span class="eyebrow">${esc(c.label)}</span><span class="pager__name">${esc(c.name)}</span><span class="pager__ic">${icons.arrowRight}</span></a>`
      : `<span></span>`;
  return `<nav class="pager" data-reveal aria-label="${esc((prev ?? next)?.label ?? "")}">${cell(prev, "prev")}${cell(next, "next")}</nav>`;
};

/* ───────────── Case study ───────────── */
export const caseStudyFrame = (ctx: RenderContext, p: Project): PageFrame => {
  const t = ui[ctx.lang];
  const all = visibleProjects().filter((x) => x.caseStudy);
  const idx = all.findIndex((x) => x.slug === p.slug);
  const prevP = all.length > 1 ? all[(idx - 1 + all.length) % all.length] : undefined;
  const nextP = all.length > 1 ? all[(idx + 1) % all.length] : undefined;

  const sections: Section[] = [];
  sections.push({ id: "overview", label: t.cs.overview, html: `<p>${esc(pick(ctx, p.purpose))}</p>${tags(p.tech)}` });
  sections.push({ id: "what", label: t.cs.what, html: list(pick(ctx, p.capabilities)) });
  const cmd = p.cmd ? cmdLine(p.cmd, true) : "";
  sections.push({ id: "run", label: t.cs.run, html: cmd + list(pick(ctx, p.usage)) });
  const resp = pick(ctx, p.responsible);
  if (resp.length) sections.push({ id: "responsible", label: t.cs.responsible, html: list(resp) });
  if (p.structure.length > 1) sections.push({
    id: "anatomy",
    label: t.cs.anatomy,
    html: `<ul class="tree">${p.structure.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`,
  });
  if (p.images?.length) {
    sections.push({
      id: "screenshots",
      label: t.cs.screenshots,
      html: `<div class="gallery">${p.images
        .map(
          (im) =>
            `<figure><img src="${esc(asset(ctx, im.src))}" alt="${esc(pick(ctx, im.alt))}" loading="lazy" decoding="async">${im.caption ? `<figcaption>${esc(pick(ctx, im.caption))}</figcaption>` : ""}</figure>`,
        )
        .join("")}</div>`,
    });
  }
  if (p.why) sections.push({ id: "why", label: t.cs.why, html: `<p>${esc(pick(ctx, p.why))}</p>` });
  if (p.challenges) sections.push({ id: "challenges", label: t.cs.challenges, html: `<p>${esc(pick(ctx, p.challenges))}</p>` });
  if (p.learned) sections.push({ id: "learned", label: t.cs.learned, html: list(pick(ctx, p.learned)) });
  if (siteConfig.showRepoLinks) sections.push({
    id: "source",
    label: t.cs.source,
    html: `<p>${esc(t.cs.sourceText)}</p><p><a class="textlink" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">${esc(p.repo.replace("https://", ""))} ${icons.arrowUpRight}</a></p>`,
  });

  const facts = [
    ...p.facts.map((f) => ({ k: pick(ctx, f.label), v: pick(ctx, f.value) })),
    ...(siteConfig.showRepoLinks ? [{ k: t.cs.repository, v: t.cs.publicOnGithub }] : []),
  ]
    .map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`)
    .join("");

  const toc = sections.map((s) => `<li><a href="#${s.id}" data-toc-link="${s.id}">${esc(s.label)}</a></li>`).join("");
  const blocks = sections
    .map(
      (s) =>
        `<section class="cs__block" id="${s.id}" data-reveal><h2 class="cs__label">${esc(s.label)}</h2><div class="cs__body">${s.html}</div></section>`,
    )
    .join("");

  const body = `${progress}<article class="cs">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="${sectionHref(ctx, "work")}">${icons.arrowRight}<span>${t.cs.crumb}</span></a>
    </nav>
    <header class="cs__head" data-rise style="--d:0">
      <p class="eyebrow">${esc(pick(ctx, p.category))} — ${t.cs.tag}</p>
      <h1 class="cs__title">${esc(p.name)}</h1>
      <p class="cs__tag">${esc(pick(ctx, p.tagline))}</p>
      <div class="cs__cta">
        ${siteConfig.showRepoLinks ? `<a class="btn btn--primary" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">${t.cs.viewRepo} ${icons.arrowUpRight}</a>` : ""}
        ${p.demo ? `<a class="btn btn--ghost" href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">${t.cs.demo} ${icons.arrowUpRight}</a>` : ""}
      </div>
    </header>
    <dl class="cs__facts" data-rise style="--d:1">${facts}</dl>
    <div class="cs__layout">
      <aside class="toc" aria-label="${esc(t.cs.toc)}">
        <p class="eyebrow toc__title">${t.cs.toc}</p>
        <ol class="toc__list" data-toc>${toc}</ol>
      </aside>
      <div class="cs__main">${blocks}</div>
    </div>
    ${pager(
      prevP && prevP.slug !== p.slug ? { href: href(ctx, `work/${prevP.slug}`), label: t.cs.prev, name: prevP.name } : undefined,
      nextP && nextP.slug !== p.slug ? { href: href(ctx, `work/${nextP.slug}`), label: t.cs.next, name: nextP.name } : undefined,
    )}
  </div>
</article>`;
  return {
    head: {
      title: `${p.name} — ${siteConfig.name}`,
      description: `${pick(ctx, p.tagline)} ${t.cs.tag}: ${siteConfig.name}.`,
      path: `work/${p.slug}`,
    },
    body,
  };
};

/* ───────────── Credentials page ───────────── */
export const credentialsFrame = (ctx: RenderContext): PageFrame => {
  const t = ui[ctx.lang];
  return {
    head: {
      title: `${t.credentials.eyebrow} — ${siteConfig.name}`,
      description: t.credentials.title,
      path: "credentials",
    },
    body: `<section class="sec sec--page"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${href(ctx)}">${icons.arrowRight}<span>${esc(siteConfig.name)}</span></a></nav>
  <header class="sec-head" data-rise style="--d:0"><p class="eyebrow">${t.credentials.eyebrow}</p><h1 class="h2">${t.credentials.title}</h1></header>
  ${renderCredentialsBody(ctx)}
</div></section>`,
  };
};

/* ───────────── Notes ───────────── */
const renderBlock = (b: Block): string => {
  switch (b.t) {
    case "p":
      return `<p>${inline(b.x)}</p>`;
    case "h":
      return `<h2 class="prose__h">${inline(b.x)}</h2>`;
    case "code":
      return `<pre class="code" tabindex="0"><code>${esc(b.x)}</code></pre>`;
    case "ul":
      return `<ul class="plain plain--lg">${b.x.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`;
    case "note":
      return `<aside class="callout" role="note"><p>${inline(b.x)}</p></aside>`;
  }
};

export const notesIndexFrame = (ctx: RenderContext): PageFrame => {
  const t = ui[ctx.lang];
  const rows = publishedPosts()
    .map(
      (p) => `<li class="row row--note" data-reveal>
  <a class="row__link" href="${href(ctx, `notes/${p.slug}`)}">
    <span class="row__date">${esc(fmtDate(p.date, ctx.lang))}</span>
    <span class="row__name">${esc(pick(ctx, p.title))}</span>
    <span class="row__tag">${esc(pick(ctx, p.summary))}</span>
    <span class="row__ic">${icons.arrowRight}</span>
  </a>
</li>`,
    )
    .join("");
  return {
    head: { title: `${t.notes.pageTitle} — ${siteConfig.name}`, description: t.notes.pageDesc, path: "notes" },
    body: `<section class="sec sec--page"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${href(ctx)}">${icons.arrowRight}<span>${esc(siteConfig.name)}</span></a></nav>
  <header class="sec-head" data-rise style="--d:0"><p class="eyebrow">${t.notes.eyebrow}</p><h1 class="h2">${t.notes.title}</h1><p class="lede">${t.notes.lede}</p></header>
  <ul class="rows rows--top">${rows}</ul>
</div></section>`,
  };
};

export const postFrame = (ctx: RenderContext, post: Post): PageFrame => {
  const t = ui[ctx.lang];
  const all = publishedPosts();
  const i = all.findIndex((p) => p.slug === post.slug);
  const newer = i > 0 ? all[i - 1] : undefined;
  const older = i >= 0 ? all[i + 1] : undefined;
  const title = pick(ctx, post.title);
  const body = `${progress}<article class="cs post">
  <div class="wrap wrap--narrow">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${href(ctx, "notes")}">${icons.arrowRight}<span>${t.notes.back}</span></a></nav>
    <header class="cs__head" data-rise style="--d:0">
      <p class="eyebrow"><time datetime="${esc(post.date)}">${esc(fmtDate(post.date, ctx.lang))}</time><span aria-hidden="true">·</span><span>${esc(t.notes.minutes(readingMinutes(post, ctx.lang)))}</span></p>
      <h1 class="post__title">${esc(title)}</h1>
      <p class="cs__tag">${esc(pick(ctx, post.summary))}</p>
      ${tags(post.tags)}
    </header>
    <div class="prose" data-rise style="--d:1">${post.body[ctx.lang].map(renderBlock).join("")}</div>
    ${pager(
      newer ? { href: href(ctx, `notes/${newer.slug}`), label: t.notes.prev, name: pick(ctx, newer.title) } : undefined,
      older ? { href: href(ctx, `notes/${older.slug}`), label: t.notes.next, name: pick(ctx, older.title) } : undefined,
    )}
  </div>
</article>`;
  return {
    head: {
      title: `${title} — ${siteConfig.name}`,
      description: pick(ctx, post.summary),
      path: `notes/${post.slug}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: pick(ctx, post.summary),
        datePublished: post.date,
        inLanguage: ctx.lang,
        author: { "@type": "Person", name: siteConfig.name },
      },
    },
    body,
  };
};

/* ───────────── 404 (bilingual, shared) ───────────── */
export const notFoundFrame = (ctx: RenderContext): PageFrame => {
  const en = ui.en.nf;
  const tr = ui.tr.nf;
  return {
    head: { title: `${en.title} · ${tr.title} — ${siteConfig.name}`, description: en.heading, path: "404", noindex: true, noAlternates: true },
    body: `<section class="sec sec--page"><div class="wrap">
  <p class="eyebrow">404</p>
  <h1 class="h2">${en.heading}</h1>
  <p class="lede">${en.text} <span lang="tr">${tr.heading} ${tr.text}</span></p>
  <p class="nf__cta"><a class="btn btn--primary" href="${href(ctx, "", "en")}">${en.home}</a> <a class="btn btn--ghost" href="${href(ctx, "", "tr")}" lang="tr">${tr.home}</a></p>
</div></section>`,
  };
};
