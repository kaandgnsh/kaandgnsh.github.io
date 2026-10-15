import type { FocusArea, L, Skill } from "../types.ts";

const same = (x: string): L => ({ en: x, tr: x });

/**
 * Stack, split by evidence rather than graded. "work" entries link to the
 * projects or notes (by slug) that use them; "familiar" entries are listed
 * on the GitHub profile but not yet in public work. Keep every claim checkable.
 */
export const skills: Skill[] = [
  {
    name: same("Python"),
    tier: "work",
    detail: {
      en: "Main language. Modular command-line tools, SQLite storage, input validation, concurrent lookups.",
      tr: "Ana dilim. Modüler komut satırı araçları, SQLite ile veri saklama, girdi doğrulama, eşzamanlı sorgular.",
    },
    evidence: ["argus", "m-dos", "hider", "m-info-get"],
  },
  {
    name: { en: "Linux & shell", tr: "Linux ve kabuk" },
    tier: "work",
    detail: {
      en: "The environment my tools run in: the command line, install scripts, services, processes and /proc.",
      tr: "Araçlarımın çalıştığı ortam: komut satırı, kurulum betikleri, servisler, süreçler ve /proc.",
    },
    evidence: ["hider", "a-process-from-the-outside"],
  },
  {
    name: { en: "Networking", tr: "Ağ temelleri" },
    tier: "work",
    detail: {
      en: "How a request travels (DNS, TCP, TLS, HTTP), how long it takes and how traffic is routed.",
      tr: "Bir isteğin yolculuğu (DNS, TCP, TLS, HTTP), ne kadar sürdüğü ve trafiğin nasıl yönlendirildiği.",
    },
    evidence: ["before-the-page-loads", "m-dos", "hider"],
  },
  {
    name: { en: "Git, testing & CI", tr: "Git, test ve CI" },
    tier: "work",
    detail: {
      en: "Version control for every project; unit tests for the safety checks, run by GitHub Actions.",
      tr: "Her projede sürüm kontrolü; güvenlik denetimleri için birim testleri, GitHub Actions’ta çalışıyor.",
    },
    evidence: ["m-dos", "argus", "hider"],
  },
  { name: same("Java"), tier: "familiar" },
  { name: same("C"), tier: "familiar" },
  { name: same("JavaScript"), tier: "familiar" },
  { name: same("Docker"), tier: "familiar" },
];

/**
 * Cybersecurity focus. "work" = public work exists in a repository;
 * "studying" = an area of interest with nothing public yet.
 */
export const focusAreas: FocusArea[] = [
  {
    name: { en: "Security tooling", tr: "Güvenlik araçları" },
    note: {
      en: "Command-line tools for reconnaissance and privacy, written to learn how such tools are built and how to make them safe to run.",
      tr: "Keşif ve gizlilik için komut satırı araçları; bu araçların nasıl kurulduğunu ve nasıl güvenle çalıştırılacağını öğrenmek için yazdım.",
    },
    status: "work",
    evidence: ["argus", "hider", "m-info-get"],
  },
  {
    name: { en: "Web security", tr: "Web güvenliği" },
    note: {
      en: "Understanding how sites expose themselves and how that is assessed.",
      tr: "Sitelerin kendini nasıl açığa verdiğini ve bunun nasıl değerlendirildiğini anlamak.",
    },
    status: "work",
    evidence: ["argus", "m-finder"],
  },
  {
    name: { en: "Network security", tr: "Ağ güvenliği" },
    note: {
      en: "How traffic is routed, masked and observed.",
      tr: "Trafiğin nasıl yönlendirildiğini, gizlendiğini ve gözlemlendiğini anlamak.",
    },
    status: "work",
    evidence: ["hider", "m-dos"],
  },
  {
    name: { en: "Linux", tr: "Linux" },
    note: {
      en: "The environment most security work happens in.",
      tr: "Güvenlik çalışmalarının çoğunun yapıldığı ortam.",
    },
    status: "studying",
    evidence: [],
  },
  {
    name: { en: "Penetration testing", tr: "Sızma testi" },
    note: {
      en: "Methodical, authorised assessment of systems.",
      tr: "Sistemlerin yöntemli ve yetkili biçimde değerlendirilmesi.",
    },
    status: "studying",
    evidence: [],
  },
  {
    name: { en: "Offensive security", tr: "Saldırı odaklı güvenlik" },
    note: {
      en: "Learning how attacks work in order to defend against them.",
      tr: "Savunabilmek için saldırıların nasıl işlediğini öğrenmek.",
    },
    status: "studying",
    evidence: [],
  },
  {
    name: { en: "SIEM", tr: "SIEM" },
    note: {
      en: "Log collection and detection from the defender’s side.",
      tr: "Savunma tarafından log toplama ve tespit.",
    },
    status: "studying",
    evidence: [],
  },
];
