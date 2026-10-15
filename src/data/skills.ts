import type { FocusArea, L, Skill } from "../types.ts";

const same = (x: string): L => ({ en: x, tr: x });

/**
 * Stack. Each entry links to the projects (by slug) that use it, so every
 * claim stays checkable.
 */
export const skills: Skill[] = [
  {
    name: same("Python"),
    detail: {
      en: "Main language. Modular command-line tools, SQLite storage, input validation, concurrent lookups.",
      tr: "Ana dilim. Modüler komut satırı araçları, SQLite ile veri saklama, girdi doğrulama, eşzamanlı sorgular.",
    },
    evidence: ["argus", "m-dos", "hider", "m-info-get"],
  },
  {
    name: { en: "Secure coding", tr: "Güvenli kodlama" },
    detail: {
      en: "Input and URL validation, bounded subprocesses and timeouts, credentials masked in logs, confirmation before system changes.",
      tr: "Girdi ve URL doğrulama, sınırlı alt süreçler ve zaman aşımları, günlüklerde maskelenen kimlik bilgileri, sistem değişikliklerinden önce onay.",
    },
    evidence: ["argus", "m-dos", "hider"],
  },
  {
    name: { en: "Linux & shell", tr: "Linux ve kabuk" },
    detail: {
      en: "The environment my tools run in: the command line, install scripts, services and processes.",
      tr: "Araçlarımın çalıştığı ortam: komut satırı, kurulum betikleri, servisler ve süreçler.",
    },
    evidence: ["hider", "a-process-from-the-outside"],
  },
  {
    name: { en: "Networking", tr: "Ağ temelleri" },
    detail: {
      en: "How a request travels (DNS, TCP, TLS, HTTP), how long it takes and how traffic is routed.",
      tr: "Bir isteğin yolculuğu (DNS, TCP, TLS, HTTP), ne kadar sürdüğü ve trafiğin nasıl yönlendirildiği.",
    },
    evidence: ["before-the-page-loads", "m-dos", "hider"],
  },
  {
    name: { en: "Git, testing & CI", tr: "Git, test ve CI" },
    detail: {
      en: "Version control for every project; unit tests for the safety checks, run by GitHub Actions.",
      tr: "Her projede sürüm kontrolü; güvenlik denetimleri için birim testleri, GitHub Actions’ta çalışıyor.",
    },
    evidence: ["m-dos", "argus", "hider"],
  },
];

/** Cybersecurity focus areas; `evidence` links the projects behind each one. */
export const focusAreas: FocusArea[] = [
  {
    name: { en: "Security tooling", tr: "Güvenlik araçları" },
    note: {
      en: "Command-line tools for reconnaissance and privacy, built with safe defaults and explicit limits.",
      tr: "Keşif ve gizlilik için, güvenli varsayılanlar ve açık sınırlarla geliştirilmiş komut satırı araçları.",
    },
    evidence: ["argus", "hider", "m-info-get"],
  },
  {
    name: { en: "Web security", tr: "Web güvenliği" },
    note: {
      en: "How sites expose information, and how that exposure is assessed.",
      tr: "Sitelerin bilgiyi nasıl açığa verdiği ve bunun nasıl değerlendirildiği.",
    },
    evidence: ["argus", "m-finder"],
  },
  {
    name: { en: "Network security", tr: "Ağ güvenliği" },
    note: {
      en: "How traffic is routed, masked and observed.",
      tr: "Trafiğin nasıl yönlendirildiği, gizlendiği ve gözlemlendiği.",
    },
    evidence: ["hider", "m-dos"],
  },
  {
    name: { en: "Linux", tr: "Linux" },
    note: {
      en: "The environment most security work happens in.",
      tr: "Güvenlik çalışmalarının çoğunun yapıldığı ortam.",
    },
    evidence: [],
  },
  {
    name: { en: "Penetration testing", tr: "Sızma testi" },
    note: {
      en: "Methodical, authorised assessment of systems.",
      tr: "Sistemlerin yöntemli ve yetkili biçimde değerlendirilmesi.",
    },
    evidence: [],
  },
  {
    name: { en: "Offensive security", tr: "Saldırı odaklı güvenlik" },
    note: {
      en: "How attacks work, studied in order to defend against them.",
      tr: "Saldırıların nasıl işlediği; onlara karşı savunma kurabilmek için.",
    },
    evidence: [],
  },
  {
    name: { en: "SIEM", tr: "SIEM" },
    note: {
      en: "Log collection and detection from the defender’s side.",
      tr: "Savunma tarafından log toplama ve tespit.",
    },
    evidence: [],
  },
];
