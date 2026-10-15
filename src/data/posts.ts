import type { Post } from "../types.ts";

/**
 * Notes (blog). Add a post by appending an object; set `draft: true` to hide one.
 * Inline `code` uses backticks. Block types: p, h, code, ul, note.
 *
 * The two starter notes are general technical explainers, written so the blog
 * isn't empty. They make no claims about your own experience. Review them,
 * edit them, or replace them with your own.
 */
export const posts: Post[] = [
  {
    slug: "before-the-page-loads",
    // Blog section removed from the site; set to false (or delete) to publish again.
    draft: true,
    date: "2026-10-06",
    title: {
      en: "What happens before a page loads",
      tr: "Bir sayfa yüklenmeden önce ne olur",
    },
    summary: {
      en: "DNS, TCP, TLS and HTTP in the order they happen, with a command to watch each one.",
      tr: "DNS, TCP, TLS ve HTTP; gerçekleştikleri sırayla ve her birini izlemek için bir komutla.",
    },
    tags: ["Networking", "Linux"],
    body: {
      en: [
        { t: "h", x: "1. A name becomes an address" },
        { t: "p", x: "The browser has a name, not an address. It asks a DNS resolver (usually your router or your ISP) for the IP address behind it. You can ask the same question yourself:" },
        { t: "code", x: "dig +short example.com" },
        { t: "h", x: "2. A connection opens" },
        { t: "p", x: "With an address in hand, the browser opens a TCP connection. TCP starts with a three-step handshake: the client sends SYN, the server answers SYN-ACK, the client replies ACK. Only then can data flow, which is why distance shows up as delay before a single byte of the page has been sent." },
        { t: "h", x: "3. Both sides agree on encryption" },
        { t: "p", x: "For HTTPS, TLS runs on top of that connection. The two sides agree on a protocol version and a cipher, and the server proves who it is with a certificate that chains up to a root the browser already trusts. You can inspect the result:" },
        { t: "code", x: "openssl s_client -connect example.com:443 -servername example.com" },
        { t: "h", x: "4. The request itself" },
        { t: "p", x: "Only now does the browser send the HTTP request. The server answers with a status line, headers and a body. `curl` shows the whole exchange:" },
        { t: "code", x: "curl -v https://example.com/ -o /dev/null" },
        { t: "note", x: "Every one of these stages is a place where something can be misconfigured, intercepted or measured. That makes the sequence a useful map for both debugging and security work." },
      ],
      tr: [
        { t: "h", x: "1. Bir isim adrese dönüşür" },
        { t: "p", x: "Tarayıcının elinde bir isim var, adres yok. İsmin arkasındaki IP adresini bir DNS çözümleyicisine (genellikle router’ın ya da internet sağlayıcın) sorar. Aynı soruyu sen de sorabilirsin:" },
        { t: "code", x: "dig +short example.com" },
        { t: "h", x: "2. Bir bağlantı açılır" },
        { t: "p", x: "Adresi alan tarayıcı bir TCP bağlantısı açar. TCP üç adımlı bir el sıkışmayla başlar: istemci SYN gönderir, sunucu SYN-ACK ile cevap verir, istemci ACK ile yanıtlar. Veri ancak bundan sonra akabilir. Mesafenin, sayfanın tek bir baytı gönderilmeden önce gecikme olarak görünmesinin sebebi budur." },
        { t: "h", x: "3. İki taraf şifrelemede anlaşır" },
        { t: "p", x: "HTTPS’te TLS, bu bağlantının üzerinde çalışır. İki taraf bir protokol sürümü ve bir şifre takımı üzerinde anlaşır; sunucu da kim olduğunu, tarayıcının zaten güvendiği bir köke zincirlenen bir sertifikayla kanıtlar. Sonucu şöyle inceleyebilirsin:" },
        { t: "code", x: "openssl s_client -connect example.com:443 -servername example.com" },
        { t: "h", x: "4. İsteğin kendisi" },
        { t: "p", x: "HTTP isteği ancak şimdi gönderilir. Sunucu bir durum satırı, başlıklar ve bir gövdeyle cevap verir. `curl` tüm alışverişi gösterir:" },
        { t: "code", x: "curl -v https://example.com/ -o /dev/null" },
        { t: "note", x: "Bu aşamaların her biri, bir şeyin yanlış yapılandırılabileceği, araya girilebileceği ya da ölçülebileceği bir yer. Bu yüzden bu sıra, hem hata ayıklama hem de güvenlik çalışması için işe yarar bir harita." },
      ],
    },
  },
  {
    slug: "a-process-from-the-outside",
    // Blog section removed from the site; set to false (or delete) to publish again.
    draft: true,
    date: "2026-10-06",
    title: {
      en: "Looking at a Linux process from the outside",
      tr: "Bir Linux sürecine dışarıdan bakmak",
    },
    summary: {
      en: "ps and the /proc filesystem: what the kernel will tell you about a running program.",
      tr: "ps ve /proc dosya sistemi: çalışan bir program hakkında çekirdeğin anlattıkları.",
    },
    tags: ["Linux", "Systems"],
    body: {
      en: [
        { t: "p", x: "On Linux, a running program is a process, and the kernel exposes a lot about it as plain files under `/proc`. No special tools are needed. The shell is enough." },
        { t: "h", x: "Find it" },
        { t: "code", x: "ps -o pid,ppid,user,stat,cmd -p $$" },
        { t: "p", x: "`$$` is the PID of your current shell. The output shows its process ID, its parent, the user it runs as, its state and its command line." },
        { t: "h", x: "Read what the kernel knows" },
        { t: "code", x: "head -n 8 /proc/$$/status\nls -l /proc/$$/fd\nreadlink /proc/$$/exe" },
        { t: "ul", x: [
          "`status` summarises the process: name, state, PID and parent PID near the top, memory figures further down.",
          "`fd/` lists every open file descriptor. 0, 1 and 2 are standard input, output and error.",
          "`exe` points at the binary that is running.",
        ] },
        { t: "note", x: "Reading `/proc` for your own processes is harmless. Looking at other users’ processes is limited by permissions, and that boundary is itself a useful thing to understand." },
      ],
      tr: [
        { t: "p", x: "Linux’ta çalışan bir program bir süreçtir ve çekirdek onunla ilgili pek çok şeyi `/proc` altında düz dosyalar olarak sunar. Özel araç gerekmez. Kabuk yeterli." },
        { t: "h", x: "Bul" },
        { t: "code", x: "ps -o pid,ppid,user,stat,cmd -p $$" },
        { t: "p", x: "`$$` o anki kabuğunun PID’sidir. Çıktı süreç kimliğini, üst sürecini, hangi kullanıcıyla çalıştığını, durumunu ve komut satırını gösterir." },
        { t: "h", x: "Çekirdeğin bildiğini oku" },
        { t: "code", x: "head -n 8 /proc/$$/status\nls -l /proc/$$/fd\nreadlink /proc/$$/exe" },
        { t: "ul", x: [
          "`status` süreci özetler: üstte ad, durum, PID ve üst PID, daha aşağıda bellek bilgileri.",
          "`fd/` açık her dosya tanımlayıcısını listeler. 0, 1 ve 2 standart girdi, çıktı ve hatadır.",
          "`exe` çalışan ikili dosyayı gösterir.",
        ] },
        { t: "note", x: "Kendi süreçlerin için `/proc` okumak zararsızdır. Başka kullanıcıların süreçlerine bakmak izinlerle sınırlıdır ve bu sınır da anlaşılması gereken yararlı bir şeydir." },
      ],
    },
  },
];

export const publishedPosts = (): Post[] =>
  posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/** Rough reading time in whole minutes, at 200 words per minute. */
export const readingMinutes = (post: Post, lang: "en" | "tr"): number => {
  const words = post.body[lang]
    .map((b) => (b.t === "ul" ? b.x.join(" ") : b.x))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
