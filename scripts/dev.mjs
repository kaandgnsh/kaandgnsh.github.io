// Build, serve, and rebuild when src/ or public/ change.
import { spawn, spawnSync } from "node:child_process";
import { watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const build = () => spawnSync(process.execPath, ["scripts/build.mjs"], { cwd: root, stdio: "inherit" });
build();
spawn(process.execPath, ["scripts/serve.mjs"], { cwd: root, stdio: "inherit" });

let timer;
for (const dir of ["src", "public"]) {
  watch(resolve(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  });
}
