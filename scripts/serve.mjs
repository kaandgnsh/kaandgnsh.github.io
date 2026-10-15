// Tiny static server for dist/ (serves 404.html for unknown paths).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "..", process.env.OUT_DIR || "dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".woff": "font/woff", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml", ".json": "application/json",
};

const resolveFile = async (urlPath) => {
  const p = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  let file = join(dist, p);
  if (!file.startsWith(dist)) return null;
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
};

createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  let file = await resolveFile(url.pathname);
  let status = 200;
  if (!file) { file = join(dist, "404.html"); status = 404; }
  const body = await readFile(file);
  res.writeHead(status, { "content-type": types[extname(file)] || "application/octet-stream" });
  res.end(body);
}).listen(port, () => console.log(`http://localhost:${port}`));
