// Static build: TS data + render functions -> dist/. No bundler, no dependencies.
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(here, "..");
const out = resolve(rootDir, process.env.OUT_DIR || "dist");
const siteUrl = (process.env.SITE_URL || "").replace(/\/+$/, "");
const fileLinks = process.env.FILE_LINKS === "1";
// Local calendar date (sv-SE formats as YYYY-MM-DD), so the stamp matches the day it was built.
const buildDate = process.env.BUILD_DATE || new Date().toLocaleDateString("sv-SE");

const { renderDocument } = await import("../src/render/layout.ts");
const pages = await import("../src/render/pages.ts");
const { projects } = await import("../src/data/projects.ts");
const { publishedPosts } = await import("../src/data/posts.ts");
const { credentials } = await import("../src/data/credentials.ts");
const { siteConfig } = await import("../src/data/site.ts");
const { visibleProjects } = await import("../src/render/sections.ts");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(rootDir, "public"), out, { recursive: true });

const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 8);
const minCss = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").split("\n").map((l) => l.trim()).filter(Boolean).join("\n");
const minJs = (s) =>
  s.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("//")).join("\n");

const emit = (name, content) => {
  const file = join(out, name);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

const css = minCss(readFileSync(join(rootDir, "src/styles/main.css"), "utf8"));
const js = minJs(stripTypeScriptTypes(readFileSync(join(rootDir, "src/client/main.ts"), "utf8")));
const boot = minJs(stripTypeScriptTypes(readFileSync(join(rootDir, "src/client/boot.ts"), "utf8")));
const assets = {
  css: `main.${hash(css)}.css`,
  js: `main.${hash(js)}.js`,
  boot: `boot.${hash(boot)}.js`,
};
emit(assets.css, css);
emit(assets.js, js);
emit(assets.boot, boot);

const ctxFor = (lang, path, extra = {}) => ({
  lang,
  depth: (path ? path.split("/").length : 0) + (lang === "tr" ? 1 : 0),
  fileLinks,
  siteUrl,
  assets,
  buildDate,
  ...extra,
});

const urls = []; // logical paths, for sitemap
const write = (lang, path, frameFn) => {
  const ctx = ctxFor(lang, path);
  const rel = `${lang === "tr" ? "tr/" : ""}${path ? `${path}/` : ""}index.html`;
  emit(rel, renderDocument(ctx, frameFn(ctx)));
  if (lang === "en") urls.push(path);
};

const posts = publishedPosts();
for (const lang of ["en", "tr"]) {
  write(lang, "", pages.homeFrame);
  for (const p of visibleProjects().filter((x) => x.caseStudy)) {
    write(lang, `work/${p.slug}`, (c) => pages.caseStudyFrame(c, p));
  }
  if (credentials.length) write(lang, "credentials", pages.credentialsFrame);
  if (posts.length) {
    write(lang, "notes", pages.notesIndexFrame);
    for (const post of posts) write(lang, `notes/${post.slug}`, (c) => pages.postFrame(c, post));
  }
}

// Shared 404 (root-absolute links so it works at any depth).
{
  const ctx = ctxFor("en", "", { abs: true });
  emit("404.html", renderDocument(ctx, pages.notFoundFrame(ctx)));
}

emit("robots.txt", `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ""}`);

if (siteUrl) {
  const loc = (lang, p) => `${siteUrl}/${lang === "tr" ? "tr/" : ""}${p ? `${p}/` : ""}`;
  const entries = urls
    .map(
      (p) => `  <url>
    <loc>${loc("en", p)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc("en", p)}"/>
    <xhtml:link rel="alternate" hreflang="tr" href="${loc("tr", p)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc("en", p)}"/>
    <lastmod>${buildDate}</lastmod>
  </url>
  <url>
    <loc>${loc("tr", p)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc("en", p)}"/>
    <xhtml:link rel="alternate" hreflang="tr" href="${loc("tr", p)}"/>
    <lastmod>${buildDate}</lastmod>
  </url>`,
    )
    .join("\n");
  emit(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`,
  );

  if (posts.length) {
    const x = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    for (const lang of ["en", "tr"]) {
      const base = `${siteUrl}/${lang === "tr" ? "tr/" : ""}`;
      const items = posts
        .map(
          (p) => `<item><title>${x(p.title[lang])}</title><link>${base}notes/${p.slug}/</link><guid>${base}notes/${p.slug}/</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${x(p.summary[lang])}</description></item>`,
        )
        .join("");
      emit(
        `${lang === "tr" ? "tr/" : ""}rss.xml`,
        `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${x(siteConfig.name)}</title><link>${base}</link><description>${x(lang === "tr" ? "Notlar" : "Notes")}</description><language>${lang}</language>${items}</channel></rss>`,
      );
    }
  }
}

// security.txt — first person, expires a year out.
{
  const exp = new Date(`${buildDate}T00:00:00Z`);
  exp.setUTCFullYear(exp.getUTCFullYear() + 1);
  emit(
    ".well-known/security.txt",
    `# Found a security issue on this site? Please report it by email.
# Reports in English or Turkish are welcome.
Contact: mailto:${siteConfig.email}
Expires: ${exp.toISOString().replace(/\.\d+Z$/, "Z")}
Preferred-Languages: en, tr
${siteUrl ? `Canonical: ${siteUrl}/.well-known/security.txt\n` : ""}`,
  );
}

if (!existsSync(join(out, "index.html"))) throw new Error("build failed: no index.html");
console.log(`built ${out} (${projects.length} projects, ${posts.length} notes, ${credentials.length} credentials)`);
