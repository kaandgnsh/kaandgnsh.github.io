import { credentialCategoryOrder, credentials } from "../data/credentials.ts";
import { projects } from "../data/projects.ts";
import { publishedPosts } from "../data/posts.ts";
import { focusAreas, skills } from "../data/skills.ts";
import { githubSnapshot, siteConfig, socialLinks } from "../data/site.ts";
import { ui } from "../i18n/ui.ts";
import type { Project } from "../types.ts";
import { icons } from "./icons.ts";
import { asset, cmdLine, emph, esc, fmtDate, href, pick, sectionHref } from "./util.ts";
import type { RenderContext } from "./util.ts";

export const visibleProjects = (): Project[] => projects.filter((p) => !p.hidden);

const heading = (num: string, id: string, label: string, title: string, lede = ""): string => `
<header class="sec-head${lede ? " sec-head--split" : ""}" data-reveal>
  <p class="eyebrow"><span class="eyebrow__num">${num}</span>${esc(label)}</p>
  <h2 class="h2" id="${id}-title">${emph(title)}</h2>
  ${lede ? `<p class="lede">${esc(lede)}</p>` : ""}
</header>`;

export const sectionNumbers = (): Record<string, string> => {
  const order = ["work", "security", "about", "stack"];
  if (credentials.length) order.push("credentials");
  if (publishedPosts().length) order.push("notes");
  if (siteConfig.showGithubSection) order.push("github");
  order.push("contact");
  return Object.fromEntries(order.map((id, i) => [id, `0x${String(i + 1).padStart(2, "0")}`]));
};

/* ───────────── Hero ───────────── */
export const renderHero = (ctx: RenderContext): string => {
  const t = ui[ctx.lang];
  const git = socialLinks.find((s) => s.id === "github");
  const li = socialLinks.find((s) => s.id === "linkedin");
  // The card answers what a first-time visitor scans for: studies, latest
  // work, latest writing. Name and role are already above it.
  const project = visibleProjects().find((p) => p.caseStudy);
  const post = publishedPosts()[0];
  const rows = [
    [
      t.hero.studying,
      `${esc(pick(ctx, siteConfig.education.program))} · ${esc(pick(ctx, siteConfig.education.year))}<small>${esc(pick(ctx, siteConfig.education.university))}</small>`,
    ],
    project
      ? [t.hero.building, `<a class="spec__link" href="${href(ctx, `work/${project.slug}`)}">${esc(project.name)}</a><small>${esc(pick(ctx, project.tagline))}</small>`]
      : [t.hero.focus, pick(ctx, siteConfig.focus).map(esc).join(" · ")],
    post
      ? [t.hero.writing, `<a class="spec__link" href="${href(ctx, `notes/${post.slug}`)}">${esc(pick(ctx, post.title))}</a><small><time datetime="${post.date}">${esc(fmtDate(post.date, ctx.lang))}</time></small>`]
      : [t.hero.focus, `<a class="spec__link" href="${sectionHref(ctx, "security")}">${pick(ctx, siteConfig.focus).map(esc).join(" · ")}</a>`],
  ]
    .map(([k, v]) => `<div class="spec__row"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("");
  const status = siteConfig.openToInternship
    ? `<a class="hero__status" href="${sectionHref(ctx, "contact")}" data-rise style="--d:0"><span class="dot dot--live" aria-hidden="true"></span><span>${t.hero.internship}</span></a>`
    : "";
  const photo = siteConfig.photo
    ? `<img class="idcard__photo" src="${esc(asset(ctx, siteConfig.photo.avatar ?? siteConfig.photo.src))}" alt="" width="52" height="52" decoding="async">`
    : "";
  return `<section class="hero" aria-labelledby="hero-title">
  <div class="wrap">
    ${status}
    <h1 class="hero__title" id="hero-title" data-rise style="--d:1">${esc(siteConfig.name)}</h1>
    <p class="hero__role" data-rise style="--d:2"><span>${t.hero.roleA}</span><span class="sep" aria-hidden="true">/</span><span>${t.hero.roleB}<span class="caret" aria-hidden="true"></span></span></p>
    <div class="hero__grid" data-rise style="--d:3">
      <div class="hero__copy">
        <p class="hero__statement">${esc(pick(ctx, siteConfig.statement))}</p>
        <p class="hero__lede">${esc(pick(ctx, siteConfig.headline))}</p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="${sectionHref(ctx, "work")}">${t.hero.viewWork} <span class="btn__ic">${icons.arrowDown}</span></a>
          <a class="btn btn--ghost" href="${sectionHref(ctx, "contact")}">${t.hero.contact}</a>
          <a class="chip" href="${esc(git?.href ?? "")}" target="_blank" rel="noopener noreferrer">${icons.github}<span>GitHub</span>${icons.arrowUpRight}</a>
          <a class="chip" href="${esc(li?.href ?? "")}" target="_blank" rel="noopener noreferrer">${icons.linkedin}<span>LinkedIn</span>${icons.arrowUpRight}</a>
        </div>
      </div>
      <div class="idcard" role="group" aria-label="${esc(t.hero.glance)}">
        <div class="idcard__bar" aria-hidden="true"><span class="idcard__dots"><i></i><i></i><i></i></span><span class="idcard__cmd"><b>$</b> whoami</span></div>
        <div class="idcard__head">${photo}<div><p class="idcard__name">${esc(siteConfig.name)}</p><p class="idcard__meta">${esc(siteConfig.showLocation ? siteConfig.location : pick(ctx, siteConfig.education.program))}</p></div></div>
        <dl class="spec">${rows}</dl>
      </div>
    </div>
  </div>
</section>`;
};

/* ───────────── Work ───────────── */
const tags = (items: string[]): string =>
  `<ul class="tags">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;

export const renderWork = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  const list = visibleProjects();
  const featured = list.filter((p) => p.caseStudy);
  const more = list.filter((p) => !p.caseStudy);
  const cards = featured
    .map((p, i) => {
      const img = p.images?.[0];
      const media = img
        ? `<div class="card__media"><img src="${esc(asset(ctx, img.src))}" alt="${esc(pick(ctx, img.alt))}" loading="lazy" decoding="async"></div>`
        : "";
      return `<article class="card${img ? " card--media" : ""}" data-reveal>
  ${media}
  <div class="card__top">
    <span class="card__cat">${esc(pick(ctx, p.category))}</span>
    <span class="card__idx" aria-hidden="true">${String(i + 1).padStart(2, "0")} / ${String(featured.length).padStart(2, "0")}</span>
  </div>
  <h3 class="card__name"><a href="${href(ctx, `work/${p.slug}`)}" class="card__link">${esc(p.name)}</a></h3>
  <p class="card__tag">${esc(pick(ctx, p.tagline))}</p>
  <p class="card__purpose">${esc(pick(ctx, p.purpose))}</p>
  ${tags(p.tech)}
  ${p.cmd ? cmdLine(p.cmd) : ""}
  <div class="card__foot">
    <a class="textlink" href="${href(ctx, `work/${p.slug}`)}">${t.work.caseStudy} ${icons.arrowRight}</a>
    ${siteConfig.showRepoLinks ? `<a class="textlink textlink--quiet" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">${t.work.github} ${icons.arrowUpRight}</a>` : ""}
  </div>
</article>`;
    })
    .join("");
  const rows = more
    .map(
      (p) => siteConfig.showRepoLinks
        ? `<li class="row" data-reveal>
  <a class="row__link" href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">
    <span class="row__name">${esc(p.name)}</span>
    <span class="row__tag">${esc(pick(ctx, p.tagline))}</span>
    <span class="row__lang">${esc(p.languages.join(", "))}</span>
    <span class="row__ic">${icons.arrowUpRight}</span>
  </a>
</li>`
        : `<li class="row" data-reveal>
  <div class="row__link">
    <span class="row__name">${esc(p.name)}</span>
    <span class="row__tag">${esc(pick(ctx, p.tagline))}</span>
    <span class="row__lang">${esc(p.languages.join(", "))}</span>
  </div>
</li>`,
    )
    .join("");
  const ghLink = `<a href="${esc(siteConfig.github.url)}?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>`;
  return `<section class="sec" id="work" aria-labelledby="work-title">
  <div class="wrap">
    ${heading(num, "work", t.work.eyebrow, t.work.title, t.work.lede)}
    <div class="cards">${cards}</div>
    ${rows ? `<div class="more" data-reveal><p class="eyebrow">${t.work.also}</p><ul class="rows">${rows}</ul></div>` : ""}
    ${siteConfig.showRepoLinks ? `<p class="note" data-reveal>${t.work.note(ghLink)}</p>` : ""}
  </div>
</section>`;
};

/* ───────────── About ───────────── */
export const renderAbout = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  const photo = siteConfig.photo
    ? `<figure class="about__photo"><img src="${esc(asset(ctx, siteConfig.photo.src))}" alt="${esc(pick(ctx, siteConfig.photo.alt))}" loading="lazy" decoding="async"></figure>`
    : "";
  const location = siteConfig.showLocation
    ? `<div><dt>${t.about.location}</dt><dd>${esc(siteConfig.location)}</dd></div>`
    : "";
  return `<section class="sec" id="about" aria-labelledby="about-title">
  <div class="wrap">
    ${heading(num, "about", t.about.eyebrow, t.about.title)}
    <div class="about" data-reveal>
      <div class="about__main">
        <div class="about__text">${pick(ctx, siteConfig.about).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        <div class="about__learning">
          <p class="eyebrow">${t.about.learning}</p>
          <ul class="plain plain--cols">${pick(ctx, siteConfig.currentlyLearning).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </div>
      <div class="about__aside">
        ${photo}
        <dl class="facts">
          <div><dt>${t.about.name}</dt><dd>${esc(siteConfig.name)}</dd></div>
          ${location}
          <div><dt>${t.about.university}</dt><dd>${esc(pick(ctx, siteConfig.education.university))}</dd></div>
          <div><dt>${t.about.program}</dt><dd>${esc(pick(ctx, siteConfig.education.program))}, ${esc(pick(ctx, siteConfig.education.year))}</dd></div>
          <div><dt>${t.about.goal}</dt><dd>${esc(pick(ctx, siteConfig.goal))}</dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>`;
};

/* ───────────── Evidence (stack + security) ───────────── */
/** Small links to the projects or notes that back a claim, resolved by slug. */
const evidence = (ctx: RenderContext, slugs: string[] = []): string => {
  const t = ui[ctx.lang];
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const posts = new Map(publishedPosts().map((p) => [p.slug, p]));
  const items = slugs
    .map((slug) => {
      const p = bySlug.get(slug);
      if (p && !p.hidden) {
        if (p.caseStudy) return `<a href="${href(ctx, `work/${p.slug}`)}">${esc(p.name)}</a>`;
        return siteConfig.showRepoLinks
          ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>`
          : `<span>${esc(p.name)}</span>`;
      }
      const post = posts.get(slug);
      return post
        ? `<a href="${href(ctx, `notes/${post.slug}`)}"><span class="ev__kind">${t.stack.note}</span>${esc(pick(ctx, post.title))}</a>`
        : "";
    })
    .filter(Boolean)
    .join("");
  return items ? `<p class="ev">${items}</p>` : "";
};

/* ───────────── Stack ───────────── */
export const renderStack = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  const items = skills
    .map(
      (s) => `<li class="skill" data-reveal>
  <h3 class="skill__name">${esc(pick(ctx, s.name))}</h3>
  ${s.detail ? `<p class="skill__detail">${esc(pick(ctx, s.detail))}</p>` : ""}
  ${evidence(ctx, s.evidence)}
</li>`,
    )
    .join("");
  return `<section class="sec" id="stack" aria-labelledby="stack-title">
  <div class="wrap">
    ${heading(num, "stack", t.stack.eyebrow, t.stack.title, t.stack.lede)}
    <ul class="skills">${items}</ul>
  </div>
</section>`;
};

/* ───────────── Cybersecurity focus ───────────── */
export const renderSecurity = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  const items = focusAreas
    .map((a) => {
      return `<li class="focus__item" data-reveal>
  <h3 class="focus__name">${esc(pick(ctx, a.name))}</h3>
  <p>${esc(pick(ctx, a.note))}</p>
  ${evidence(ctx, a.evidence)}
</li>`;
    })
    .join("");
  return `<section class="sec" id="security" aria-labelledby="security-title">
  <div class="wrap">
    ${heading(num, "security", t.security.eyebrow, t.security.title, t.security.lede)}
    <div class="tenets" data-reveal>
      <p class="eyebrow">${t.security.approach}</p>
      <ol class="tenets__list">${t.security.tenets.map(([k = "", v = ""], i) => `<li><p class="tenets__k"><span>${String(i + 1).padStart(2, "0")}</span>${k}()</p><p class="tenets__v">${esc(v)}</p></li>`).join("")}</ol>
    </div>
    <ul class="focus">${items}</ul>
    <aside class="notice" data-reveal role="note">
      <span class="dot dot--alert" aria-hidden="true"></span>
      <p><strong>${t.security.noticeLead}</strong> ${esc(t.security.notice)}</p>
    </aside>
  </div>
</section>`;
};

/* ───────────── Credentials ───────────── */
export const renderCredentialsBody = (ctx: RenderContext): string => {
  const t = ui[ctx.lang];
  if (!credentials.length) {
    return `<div class="empty" data-reveal>
  <p class="empty__title">${t.credentials.emptyTitle}</p>
  <p class="empty__text">${t.credentials.emptyText}</p>
  <a class="textlink" href="${esc(siteConfig.linkedin.url)}details/certifications/" target="_blank" rel="noopener noreferrer">${t.credentials.linkedin} ${icons.arrowUpRight}</a>
</div>`;
  }
  return credentialCategoryOrder
    .map((cat) => {
      const items = credentials.filter((c) => c.category === cat);
      if (!items.length) return "";
      return `<div class="cred__group" data-reveal><h3 class="stack__cat">${t.credCats[cat]}</h3><ul class="cred__list">${items
        .map(
          (c) => `<li class="cred"><div><p class="cred__title">${esc(c.title)}</p><p class="cred__meta">${esc(c.issuer)}${c.date ? ` · ${esc(c.date)}` : ""}${c.credentialId ? ` · ${t.credentials.id} ${esc(c.credentialId)}` : ""}</p></div>${c.url ? `<a class="textlink textlink--quiet" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${t.credentials.verify} ${icons.arrowUpRight}</a>` : ""}</li>`,
        )
        .join("")}</ul></div>`;
    })
    .join("");
};

export const renderCredentials = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  return `<section class="sec" id="credentials" aria-labelledby="credentials-title">
  <div class="wrap">
    ${heading(num, "credentials", t.credentials.eyebrow, t.credentials.title)}
    ${renderCredentialsBody(ctx)}
    ${credentials.length ? `<p class="note" data-reveal><a href="${href(ctx, "credentials")}">${t.credentials.all} ${icons.arrowRight}</a></p>` : ""}
  </div>
</section>`;
};

/* ───────────── Notes ───────────── */
export const renderNotes = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  const list = publishedPosts().slice(0, 3);
  if (!list.length) return "";
  const rows = list
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
  return `<section class="sec" id="notes" aria-labelledby="notes-title">
  <div class="wrap">
    ${heading(num, "notes", t.notes.eyebrow, t.notes.title, t.notes.lede)}
    <ul class="rows rows--top" data-reveal>${rows}</ul>
    <p class="note" data-reveal><a href="${href(ctx, "notes")}">${t.notes.all} ${icons.arrowRight}</a></p>
  </div>
</section>`;
};

/* ───────────── GitHub ───────────── */
export const renderGithub = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  return `<section class="sec" id="github" aria-labelledby="github-title">
  <div class="wrap">
    ${heading(num, "github", t.github.eyebrow, t.github.title)}
    <div class="gh" data-reveal data-github="${esc(siteConfig.github.username)}">
      <div class="gh__top">
        <a class="gh__user" href="${esc(siteConfig.github.url)}" target="_blank" rel="noopener noreferrer">${icons.github}<span>@${esc(siteConfig.github.username)}</span></a>
        <p class="gh__status" data-gh-status><span class="dot" aria-hidden="true"></span><span data-gh-status-text>${esc(t.github.snapshot(fmtDate(githubSnapshot.capturedOn, ctx.lang)))}</span></p>
      </div>
      <dl class="gh__stats">
        <div><dt>${t.github.repos}</dt><dd data-gh-repos>${githubSnapshot.publicRepos}</dd></div>
        <div><dt>${t.github.followers}</dt><dd data-gh-followers>${githubSnapshot.followers}</dd></div>
      </dl>
      <div class="gh__langs" data-gh-langs hidden>
        <p class="eyebrow">${t.github.langs}</p>
        <div class="bar" role="img" aria-label="${esc(t.github.langBar)}" data-gh-bar></div>
        <ul class="legend" data-gh-legend></ul>
      </div>
      <a class="btn btn--ghost" href="${esc(siteConfig.github.url)}" target="_blank" rel="noopener noreferrer">${t.github.open} ${icons.arrowUpRight}</a>
    </div>
  </div>
</section>`;
};

/* ───────────── Contact ───────────── */
export const renderContact = (ctx: RenderContext, num: string): string => {
  const t = ui[ctx.lang];
  const others = socialLinks
    .filter((s) => s.id !== "email")
    .map(
      (s) => `<a class="contact__link" href="${esc(s.href)}" target="_blank" rel="noopener noreferrer"><span class="contact__ic">${icons[s.id]}</span><span><strong>${s.label}</strong><small>${esc(s.handle)}</small></span><span class="contact__arrow">${icons.arrowUpRight}</span></a>`,
    )
    .join("");
  const cv = siteConfig.cv
    ? `<a class="contact__link" href="${esc(siteConfig.cv.url)}" target="_blank" rel="noopener noreferrer"><span class="contact__ic">${icons.file}</span><span><strong>${esc(pick(ctx, siteConfig.cv.label))}</strong><small>PDF</small></span><span class="contact__arrow">${icons.arrowUpRight}</span></a>`
    : "";
  return `<section class="sec sec--contact" id="contact" aria-labelledby="contact-title">
  <div class="wrap">
    ${heading(num, "contact", t.contact.eyebrow, t.contact.title)}
    <div class="contact" data-reveal>
      <div class="contact__mail">
        ${siteConfig.openToInternship ? `<p class="contact__open"><span class="dot dot--live" aria-hidden="true"></span>${t.contact.internship}</p>` : ""}
        <p class="eyebrow">${t.contact.email}</p>
        <a class="contact__addr" href="mailto:${esc(siteConfig.email)}">${esc(siteConfig.email)}</a>
        <div class="contact__actions">
          <a class="btn btn--primary" href="mailto:${esc(siteConfig.email)}">${icons.email}<span>${t.contact.write}</span></a>
          <button class="btn btn--ghost" type="button" data-copy="${esc(siteConfig.email)}"><span class="btn__ic" data-copy-ic>${icons.copy}</span><span data-copy-label>${t.contact.copy}</span></button>
        </div>
        <p class="sr-only" role="status" aria-live="polite" data-copy-live></p>
      </div>
      <div class="contact__links">${others}${cv}</div>
    </div>
  </div>
</section>`;
};

export const renderHomeBody = (ctx: RenderContext): string => {
  const n = sectionNumbers();
  const num = (id: string): string => n[id] ?? "";
  return [
    renderHero(ctx),
    renderWork(ctx, num("work")),
    renderSecurity(ctx, num("security")),
    renderAbout(ctx, num("about")),
    renderStack(ctx, num("stack")),
    credentials.length ? renderCredentials(ctx, num("credentials")) : "",
    renderNotes(ctx, num("notes")),
    siteConfig.showGithubSection ? renderGithub(ctx, num("github")) : "",
    renderContact(ctx, num("contact")),
  ].join("\n");
};
