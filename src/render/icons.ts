const base = (inner: string, viewBox = "0 0 24 24", extra = ""): string =>
  `<svg class="icon" viewBox="${viewBox}" width="1em" height="1em" aria-hidden="true" focusable="false" ${extra}>${inner}</svg>`;

const stroke =
  'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

export const icons = {
  github: base(
    '<path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>',
    "0 0 16 16",
  ),
  linkedin: base(
    '<path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 11-.001 5.001A2.5 2.5 0 014.98 3.5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V21h-4z"/>',
  ),
  instagram: base(
    `<rect x="3.5" y="3.5" width="17" height="17" rx="5" ${stroke}/><circle cx="12" cy="12" r="4" ${stroke}/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>`,
  ),
  email: base(
    `<rect x="3" y="5" width="18" height="14" rx="3" ${stroke}/><path d="m4 7.5 8 6 8-6" ${stroke}/>`,
  ),
  file: base(
    `<path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z" ${stroke}/><path d="M14 3.5v4h4" ${stroke}/>`,
  ),
  arrowUpRight: base(`<path d="M7 17 17 7M8.5 7H17v8.5" ${stroke}/>`),
  arrowRight: base(`<path d="M5 12h14m-5-5 5 5-5 5" ${stroke}/>`),
  arrowDown: base(`<path d="M12 5v14m-5-5 5 5 5-5" ${stroke}/>`),
  shield: base(`<path ${stroke} d="M12 3.2 19 6v5.2c0 4.4-2.9 8.2-7 9.6-4.1-1.4-7-5.2-7-9.6V6l7-2.8Z"/><path ${stroke} d="m9.2 12.1 1.9 1.9 3.8-3.9"/>`),
  arrowUp: base(`<path d="M12 19V5m-5 5 5-5 5 5" ${stroke}/>`),
  copy: base(
    `<rect x="9" y="9" width="11" height="11" rx="2.5" ${stroke}/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" ${stroke}/>`,
  ),
  menu: base(`<path d="M4 8h16M4 16h16" ${stroke}/>`),
  close: base(`<path d="m6 6 12 12M18 6 6 18" ${stroke}/>`),
  search: base(`<circle cx="11" cy="11" r="6.5" ${stroke}/><path d="m16 16 4.5 4.5" ${stroke}/>`),
  sun: base(
    `<circle cx="12" cy="12" r="4" ${stroke}/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" ${stroke}/>`,
  ),
  moon: base(`<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" ${stroke}/>`),
  auto: base(
    `<circle cx="12" cy="12" r="8" ${stroke}/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>`,
  ),
};

/** Minimal monogram: a "K" built from one stem and two strokes. */
export const monogram = (): string =>
  `<svg class="mono-mark" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false"><rect x="0.75" y="0.75" width="30.5" height="30.5" rx="8" fill="none" stroke="currentColor" stroke-opacity=".28" stroke-width="1.5"/><path d="M11 8v16M21 8l-8.5 8.5M14.8 14.6 21.5 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
