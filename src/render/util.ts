import { locale } from "../i18n/ui.ts";
import type { L, Lang } from "../types.ts";

export interface RenderContext {
  lang: Lang;
  /** Directory depth of the page being written (EN home = 0, TR home = 1). */
  depth: number;
  /** Emit /index.html links so the build also opens from file://. */
  fileLinks: boolean;
  /** Public site URL, or empty when no domain exists yet. */
  siteUrl: string;
  /** Hashed asset file names, relative to the site root. */
  assets: { css: string; js: string; boot: string };
  /** ISO date the site was built. */
  buildDate: string;
  /** Root-absolute asset and link paths (used by the shared 404 page). */
  abs?: boolean;
}

export const otherLang = (l: Lang): Lang => (l === "en" ? "tr" : "en");

export const esc = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

/** Escape, then turn `code` spans into <code>. */
export const inline = (value: string): string =>
  esc(value).replace(/`([^`]+)`/g, "<code>$1</code>");

/** Escape, then turn *emphasis* into <em> (used sparingly in headings). */
export const emph = (value: string): string =>
  esc(value).replace(/\*([^*]+)\*/g, "<em>$1</em>");

export const pick = <T>(ctx: RenderContext, v: L<T>): T => v[ctx.lang];

export const root = (ctx: RenderContext): string =>
  ctx.abs ? "/" : ctx.depth === 0 ? "./" : "../".repeat(ctx.depth);

/** Link to an internal page. `path` has no slashes at the ends, e.g. "work/hider". */
export const href = (ctx: RenderContext, path = "", lang: Lang = ctx.lang): string => {
  const base = root(ctx) + (lang === "tr" ? "tr/" : "");
  if (!path) return ctx.fileLinks ? `${base}index.html` : base;
  return ctx.fileLinks ? `${base}${path}/index.html` : `${base}${path}/`;
};

/** Link to a section on the home page. */
export const sectionHref = (ctx: RenderContext, id: string): string => `${href(ctx)}#${id}`;

export const asset = (ctx: RenderContext, path: string): string => root(ctx) + path;

export const fmtDate = (iso: string, lang: Lang, month: "short" | "long" = "short"): string =>
  new Intl.DateTimeFormat(locale[lang], {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso.slice(0, 10)}T00:00:00Z`));

/** A shell command whose lines break only between arguments, never inside one. */
export const cmdLine = (cmd: string, lg = false): string =>
  `<p class="term${lg ? " term--lg" : ""}"><span class="term__p" aria-hidden="true">$</span><code>${cmd
    .split(" ")
    .map((w) => `<span>${esc(w)}</span>`)
    .join(" ")}</code></p>`;

const PROMPT: Record<string, string> = { bash: "$", fish: "›", powershell: "PS>" };

/**
 * A README code block as a terminal window. Commands get a prompt (not part
 * of the copied text), `#` lines read as comments, and lines continued with
 * a trailing backslash keep no prompt.
 */
export const termWindow = (o: {
  label: string;
  code: string;
  shell?: "bash" | "powershell" | "fish" | "text";
  note?: string;
  copy: string;
}): string => {
  const shell = o.shell ?? "bash";
  const prompt = PROMPT[shell];
  let cont = false;
  const lines = o.code
    .split("\n")
    .map((line) => {
      const body = esc(line);
      let out: string;
      if (!prompt || !line.trim()) out = body;
      else if (line.trimStart().startsWith("#")) out = `<span class="tw__c">${body}</span>`;
      else if (cont) out = body;
      else out = `<span class="tw__p" aria-hidden="true">${prompt} </span>${body}`;
      cont = !!prompt && line.endsWith("\\");
      return out;
    })
    .join("\n");
  return `<figure class="tw">
  <figcaption class="tw__bar"><span class="tw__dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="tw__label">${esc(o.label)}</span><span class="tw__shell">${shell}</span><button class="tw__copy" type="button" data-copy-code="${esc(o.code)}">${esc(o.copy)}</button></figcaption>
  <pre class="tw__pre" tabindex="0"><code>${lines}</code></pre>
</figure>${o.note ? `<p class="tw__note">${inline(o.note)}</p>` : ""}`;
};
