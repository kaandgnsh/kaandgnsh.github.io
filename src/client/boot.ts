/* Runs synchronously in <head>: applies the saved theme before first paint and picks the language. */
(() => {
  const d = document.documentElement;
  d.classList.add("js");

  let pref = "system";
  let saved: string | null = null;
  try {
    const t = localStorage.getItem("kd-theme");
    if (t === "light" || t === "dark") pref = t;
    saved = localStorage.getItem("kd-lang");
  } catch {
    /* storage unavailable: fall back to system / browser language */
  }
  d.setAttribute("data-pref", pref);

  /* Language: a saved choice wins. Otherwise detect once per session from the browser. */
  const current = d.lang === "tr" ? "tr" : "en";
  let want: string | null = saved === "tr" || saved === "en" ? saved : null;
  if (!want) {
    let seen = false;
    try {
      seen = sessionStorage.getItem("kd-auto") === "1";
      sessionStorage.setItem("kd-auto", "1");
    } catch {
      seen = true;
    }
    if (!seen) {
      const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
      want = nav.toLowerCase().startsWith("tr") ? "tr" : "en";
    }
  }
  if (want && want !== current) {
    const alt = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${want}"]`);
    if (alt) location.replace(alt.href + location.search + location.hash);
  }
})();
