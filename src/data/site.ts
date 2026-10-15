import type { SiteConfig, SocialLink } from "../types.ts";

/**
 * Central configuration. Everything personal lives here (and in the sibling
 * data files) so components never need to be edited to change content.
 * Text exists in English (`en`) and Turkish (`tr`).
 */
export const siteConfig: SiteConfig = {
  name: "Kaan Doğan",
  brand: "Kaan Doğan",
  initials: "K.D.",
  title: {
    en: "Kaan Doğan — Software Engineering & Cybersecurity",
    tr: "Kaan Doğan — Yazılım Mühendisliği ve Siber Güvenlik",
  },
  description: {
    en: "Software engineering student working where code meets security. Selected projects, focus areas and notes by Kaan Doğan.",
    tr: "Kod ile güvenliğin kesiştiği yerde çalışan yazılım mühendisliği öğrencisi. Kaan Doğan’ın seçilmiş projeleri, odak alanları ve notları.",
  },
  headline: {
    en: "First-year Software Engineering student at OSTİM Technical University. I write small security tools and study how systems and networks fail.",
    tr: "OSTİM Teknik Üniversitesi’nde birinci sınıf Yazılım Mühendisliği öğrencisiyim. Küçük güvenlik araçları yazıyor, sistemlerin ve ağların nasıl bozulduğunu inceliyorum.",
  },
  statement: {
    en: "How software is built, how it breaks, and how to secure it.",
    tr: "Yazılımın nasıl yapıldığı, nasıl bozulduğu ve nasıl korunacağı.",
  },
  email: "dogankaan217@gmail.com",
  location: "Ankara, Türkiye",
  // The location appears once (About facts). Set to false to remove it.
  showLocation: true,
  education: {
    university: { en: "OSTİM Technical University", tr: "OSTİM Teknik Üniversitesi" },
    program: { en: "Software Engineering", tr: "Yazılım Mühendisliği" },
    year: { en: "1st Year", tr: "1. Sınıf" },
  },
  // No CV exists yet. Keep null: nothing CV-related is rendered while it is.
  // Later: cv: { label: { en: "Résumé", tr: "Özgeçmiş" }, url: "kaan-dogan-cv.pdf" }  (PDF goes in /public)
  cv: null,
  // Optional portrait for About (file goes in /public).
  // Later: photo: { src: "kaan.jpg", alt: { en: "Portrait of Kaan Doğan", tr: "Kaan Doğan’ın portresi" } }
  photo: { src: "kaan.jpg", avatar: "kaan-avatar.jpg", alt: { en: "Portrait of Kaan Doğan", tr: "Kaan Doğan’ın portresi" } },
  // Projects are described on this site only: no repository buttons or links.
  showRepoLinks: false,
  showGithubSection: false,
  openToInternship: true,
  github: { username: "kaandgnsh", url: "https://github.com/kaandgnsh" },
  linkedin: { url: "https://www.linkedin.com/in/kaan-doğan-911663280/" },
  instagram: { url: "https://www.instagram.com/kaandgn.sh/" },
  focus: {
    en: ["Software Engineering", "Cybersecurity"],
    tr: ["Yazılım Mühendisliği", "Siber Güvenlik"],
  },
  // From the "Currently learning" list on the GitHub profile README.
  currentlyLearning: {
    en: [
      "Python & software architecture",
      "Linux & system administration",
      "Networking",
      "Cybersecurity",
      "Algorithms & data structures",
      "Automation",
    ],
    tr: [
      "Python ve yazılım mimarisi",
      "Linux ve sistem yönetimi",
      "Bilgisayar ağları",
      "Siber güvenlik",
      "Algoritmalar ve veri yapıları",
      "Otomasyon",
    ],
  },
  about: {
    en: [
      "I’m a first-year Software Engineering student at OSTİM Technical University. I don’t like treating systems as black boxes. I want to know what a program does while it runs, what a network does with a packet, and where the assumptions in either one stop holding.",
      "That’s what pulled me towards security. Most of what I build is small tooling written in Python while learning how things behave: utilities that poke at a system and report back. They’re early, and I present them that way. The next few years are about turning that curiosity into craft: solid software engineering first, with security as the lens I apply to it.",
    ],
    tr: [
      "OSTİM Teknik Üniversitesi’nde Yazılım Mühendisliği okuyan birinci sınıf öğrencisiyim. Sistemlere kara kutu gibi bakmayı sevmiyorum. Bir program çalışırken ne yapıyor, bir ağ paketle ne yapıyor, ikisinde de varsayımlar nerede çöküyor; bunları bilmek istiyorum.",
      "Beni güvenliğe çeken de bu oldu. Yaptığım işlerin çoğu, bir şeylerin nasıl davrandığını öğrenirken Python ile yazdığım küçük araçlar: bir sisteme dokunup sonucu raporlayan yardımcılar. Henüz erken aşamadalar ve öyle sunuyorum. Önümüzdeki yılların işi bu merakı zanaata çevirmek: önce sağlam yazılım mühendisliği, güvenliği de onu görmek için kullandığım mercek olarak.",
    ],
  },
};

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", handle: siteConfig.github.username, href: siteConfig.github.url },
  { id: "linkedin", label: "LinkedIn", handle: "kaan-doğan", href: siteConfig.linkedin.url },
  { id: "instagram", label: "Instagram", handle: "@kaandgn.sh", href: siteConfig.instagram.url },
  { id: "email", label: "Email", handle: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

/**
 * Public GitHub numbers captured on 2026-10-05. Shown only when the live
 * GitHub request fails or is rate limited.
 */
export const githubSnapshot = {
  capturedOn: "2026-10-05",
  publicRepos: 17,
  followers: 3,
};
