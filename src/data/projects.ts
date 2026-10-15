import type { L, Project } from "../types.ts";

const gh = (repo: string) => `https://github.com/kaandgnsh/${repo}`;

const LANGUAGE: L = { en: "Language", tr: "Dil" };
const COMMITS: L = { en: "Commits", tr: "Commit" };
const PYTHON: L = { en: "Python", tr: "Python" };
const n = (v: string): L => ({ en: v, tr: v });

/**
 * Selected work. Every statement describes what the project really does,
 * checked against the project files (ARGUS, m-dos and hider re-checked against
 * their GitHub READMEs on 2026-10-15).
 *
 * To add a project, append an object. To remove one, delete it or set
 * `hidden: true`. Keep facts truthful: no invented metrics, demos or screenshots.
 *
 * Optional, filled in by you (rendered only when present):
 *   images:     [{ src: "projects/<slug>/cover.png", alt: { en, tr } }]  (files go in /public/projects/<slug>/)
 *   why:        { en: "…", tr: "…" }            "Why I built it"
 *   challenges: { en: "…", tr: "…" }
 *   learned:    { en: ["…"], tr: ["…"] }
 *   demo:       "https://…"                    only if a real demo exists
 */
export const projects: Project[] = [
  {
    slug: "argus",
    name: "ARGUS",
    repo: gh("Argus"),
    tagline: {
      en: "Modular OSINT and reconnaissance framework with a local evidence database.",
      tr: "Yerel kanıt veritabanına sahip, modüler OSINT ve keşif çatısı.",
    },
    purpose: {
      en: "Collects information from public sources, records entities and the relationships between them in a local SQLite database, and exports the findings as structured reports. Each lookup type is a separate provider, so new sources can be added without touching the core.",
      tr: "Herkese açık kaynaklardan bilgi topluyor, varlıkları ve aralarındaki ilişkileri yerel bir SQLite veritabanına kaydediyor ve bulguları yapılandırılmış raporlar olarak dışa aktarıyor. Her sorgu türü ayrı bir sağlayıcı olduğundan yeni kaynaklar çekirdeğe dokunmadan eklenebiliyor.",
    },
    category: { en: "Security tooling", tr: "Güvenlik araçları" },
    languages: ["Python"],
    tech: ["Python 3.10+", "SQLite", "Provider architecture", "GitHub Actions"],
    capabilities: {
      en: [
        "Target types: usernames, email addresses, phone numbers, domains and DNS, IP addresses, URLs, hashes, GitHub profiles, threat indicators and local files",
        "Provider-based lookups: DNS, RDAP, Certificate Transparency and threat intelligence",
        "Entities, relationships, evidence and cases stored in SQLite",
        "Report export to JSON, HTML, CSV, Markdown and GraphViz DOT",
        "File analysis: hashing, IOC extraction, archive inspection, optional EXIF/PDF metadata",
        "Runs on Linux, macOS, Windows and Termux",
      ],
      tr: [
        "Hedef türleri: kullanıcı adı, e-posta, telefon numarası, alan adı ve DNS, IP adresi, URL, hash, GitHub profili, tehdit göstergesi ve yerel dosya",
        "Sağlayıcı tabanlı sorgular: DNS, RDAP, Certificate Transparency ve tehdit istihbaratı",
        "Varlıklar, ilişkiler, kanıtlar ve vakalar SQLite’ta saklanıyor",
        "Raporları JSON, HTML, CSV, Markdown ve GraphViz DOT olarak dışa aktarma",
        "Dosya analizi: hash hesaplama, IOC çıkarma, arşiv inceleme, isteğe bağlı EXIF/PDF üst verisi",
        "Linux, macOS, Windows ve Termux’ta çalışıyor",
      ],
    },
    usage: {
      en: [
        "Create a virtual environment and install requirements.txt; nothing is installed automatically at start-up.",
        "Run argus.py with no arguments for the interactive menu, or pass a target directly, for example -domain or -ip.",
        "Use --export-all to export what is already in the local database as reports.",
      ],
      tr: [
        "Bir sanal ortam oluşturup requirements.txt’yi kur; başlangıçta hiçbir şey otomatik kurulmuyor.",
        "Etkileşimli menü için argus.py’yi argümansız çalıştır ya da hedefi doğrudan ver, örneğin -domain veya -ip.",
        "Yerel veritabanındakileri rapor olarak dışa aktarmak için --export-all kullan.",
      ],
    },
    responsible: {
      en: [
        "Meant for your own data, a controlled lab, or targets you are explicitly authorised to research.",
        "HTTP requests go through URL and redirect checks; archive handling has member, size and path limits; external tools run with bounded subprocess calls.",
        "The README notes that some identifiers are sent to third-party providers and that public availability is not permission to collect or republish.",
      ],
      tr: [
        "Kendi verin, kontrollü bir laboratuvar ya da araştırmak için açıkça yetkili olduğun hedefler için tasarlandı.",
        "HTTP istekleri URL ve yönlendirme denetiminden geçiyor; arşiv işleme üye, boyut ve yol sınırlarına sahip; harici araçlar sınırlı alt süreçlerle çalışıyor.",
        "README, bazı tanımlayıcıların üçüncü taraf sağlayıcılara gönderildiğini ve herkese açık olmanın toplama ya da yeniden yayımlama izni olmadığını belirtiyor.",
      ],
    },
    structure: ["argus.py", "core/", "modules/", "providers/", "reports/", "config/", "data/", "tests/", ".github/"],
    facts: [
      { label: LANGUAGE, value: PYTHON },
      { label: { en: "Platforms", tr: "Platformlar" }, value: n("Linux · macOS · Windows · Termux") },
      { label: { en: "Tests", tr: "Testler" }, value: { en: "CI on GitHub Actions", tr: "GitHub Actions ile CI" } },
      { label: COMMITS, value: n("30") },
    ],
    caseStudy: true,
  },
  {
    slug: "m-dos",
    name: "m-dos",
    repo: gh("m-dos"),
    tagline: {
      en: "HTTP response-time analyser for local labs, safe by design.",
      tr: "Yerel laboratuvarlar için, tasarımı gereği güvenli HTTP yanıt süresi analizcisi.",
    },
    purpose: {
      en: "A small learning project for measuring HTTP response times and observing how services on your own machine behave. It began as a flood tool; the flood code was removed, and what remains is deliberately limited to loopback targets, one worker and a hard cap on requests.",
      tr: "HTTP yanıt sürelerini ölçmek ve kendi makinendeki servislerin nasıl davrandığını gözlemlemek için küçük bir öğrenme projesi. Bir flood aracı olarak başladı; o kod kaldırıldı ve geriye kalan bilinçli olarak loopback hedeflerle, tek işçiyle ve katı bir istek sınırıyla kısıtlandı.",
    },
    category: { en: "Networking & testing", tr: "Ağ ve test" },
    languages: ["Python"],
    tech: ["Python 3.10+", "Standard library", "unittest", "GitHub Actions"],
    capabilities: {
      en: [
        "Measures each request’s latency in milliseconds and records the HTTP status",
        "Summary with request count, errors and min / max / mean latency, also printed as JSON",
        "Accepts localhost and loopback addresses only; rejects remote hosts, other schemes and credentials in URLs",
        "Bounded run: at most 30 seconds and 60 requests, one worker, environment proxies disabled",
      ],
      tr: [
        "Her isteğin gecikmesini milisaniye olarak ölçüyor ve HTTP durum kodunu kaydediyor",
        "İstek sayısı, hatalar ve en düşük / en yüksek / ortalama gecikmeyle özet; aynısı JSON olarak da yazdırılıyor",
        "Yalnızca localhost ve loopback adreslerini kabul ediyor; uzak hostları, diğer şemaları ve URL içindeki kimlik bilgilerini reddediyor",
        "Sınırlı çalışma: en fazla 30 saniye ve 60 istek, tek işçi, ortam proxy’leri kapalı",
      ],
    },
    usage: {
      en: [
        "Start a local server: python -m http.server 8000 --bind 127.0.0.1",
        "In a second terminal, run m-dos.py with --url pointing at it and an optional --duration.",
        "Run the unit tests with python -m unittest.",
      ],
      tr: [
        "Yerel bir sunucu başlat: python -m http.server 8000 --bind 127.0.0.1",
        "İkinci bir terminalde m-dos.py’yi --url ile ona yönlendirerek ve isteğe bağlı --duration ile çalıştır.",
        "Birim testlerini python -m unittest ile çalıştır.",
      ],
    },
    responsible: {
      en: [
        "Remote targets, flood modes, proxies, port scanning and concurrent workers are intentionally unsupported.",
        "Tests cover the safety checks themselves: loopback validation, rejected remote targets and schemes, and duration limits. CI runs them on Python 3.10, 3.11 and 3.12.",
      ],
      tr: [
        "Uzak hedefler, flood modları, proxy’ler, port tarama ve eşzamanlı işçiler bilinçli olarak desteklenmiyor.",
        "Testler güvenlik denetimlerinin kendisini kapsıyor: loopback doğrulaması, reddedilen uzak hedefler ve şemalar, süre sınırları. CI bunları Python 3.10, 3.11 ve 3.12’de çalıştırıyor.",
      ],
    },
    structure: ["m-dos/m-dos.py", "m-dos/test_m_dos.py", ".github/workflows/tests.yml"],
    facts: [
      { label: LANGUAGE, value: PYTHON },
      { label: { en: "Dependencies", tr: "Bağımlılık" }, value: { en: "None (standard library)", tr: "Yok (standart kütüphane)" } },
      { label: { en: "Tests", tr: "Testler" }, value: { en: "CI on Python 3.10–3.12", tr: "Python 3.10–3.12’de CI" } },
      { label: COMMITS, value: n("22") },
    ],
    caseStudy: true,
  },
  {
    slug: "hider",
    name: "hider",
    repo: gh("hider"),
    tagline: {
      en: "Multi-backend IP routing and proxy rotation for controlled privacy labs.",
      tr: "Kontrollü gizlilik laboratuvarları için çok arka uçlu IP yönlendirme ve proxy rotasyonu.",
    },
    purpose: {
      en: "Rotates an application’s outgoing HTTP traffic through a user-supplied proxy list, or drives an existing Tor or anonsurf setup. It started as a small Anonsurf-style script and grew into a cross-platform tool that detects the operating system and picks a backend.",
      tr: "Bir uygulamanın dışa giden HTTP trafiğini kullanıcının verdiği proxy listesi üzerinden döndürüyor ya da mevcut bir Tor veya anonsurf kurulumunu yönetiyor. Küçük, Anonsurf benzeri bir betik olarak başladı; işletim sistemini algılayıp arka ucu seçen, platformlar arası bir araca dönüştü.",
    },
    category: { en: "Privacy & networking", tr: "Gizlilik ve ağ" },
    languages: ["Python"],
    tech: ["Python 3.8+", "Tor control protocol", "Proxies", "GitHub Actions"],
    capabilities: {
      en: [
        "Tor, anonsurf and proxy-list backends, chosen automatically or by flag",
        "Fixed or randomised rotation intervals, plus a one-shot mode",
        "Tor SAFECOOKIE authentication when the control port supports it",
        "Detects common Linux distributions, macOS and Windows",
        "Masks proxy credentials in the log and uses bounded request timeouts",
      ],
      tr: [
        "Tor, anonsurf ve proxy listesi arka uçları; otomatik ya da parametreyle seçiliyor",
        "Sabit ya da rastgele rotasyon aralıkları, ayrıca tek seferlik mod",
        "Kontrol portu destekliyorsa Tor SAFECOOKIE kimlik doğrulaması",
        "Yaygın Linux dağıtımlarını, macOS’u ve Windows’u algılıyor",
        "Proxy kimlik bilgilerini günlükte maskeliyor ve sınırlı istek zaman aşımları kullanıyor",
      ],
    },
    usage: {
      en: [
        "Install requirements.txt, ideally in a virtual environment.",
        "Proxy backend: run hider.py with --backend proxy, a --proxy-file and an interval in --time.",
        "Tor backend: run with --backend tor; add --no-install to use an existing Tor setup without changes.",
      ],
      tr: [
        "requirements.txt’yi, tercihen bir sanal ortamda kur.",
        "Proxy arka ucu: hider.py’yi --backend proxy, bir --proxy-file ve --time ile aralık vererek çalıştır.",
        "Tor arka ucu: --backend tor ile çalıştır; mevcut Tor kurulumunu değiştirmeden kullanmak için --no-install ekle.",
      ],
    },
    responsible: {
      en: [
        "An IP change is not anonymity. The proxy backend routes only hider’s own requests; anonsurf affects the whole system.",
        "Before installing packages or editing torrc it asks for confirmation, and it stops instead of overriding conflicting Tor settings.",
      ],
      tr: [
        "IP değişimi anonimlik demek değil. Proxy arka ucu yalnızca hider’ın kendi isteklerini yönlendiriyor; anonsurf ise bütün sistemi etkiliyor.",
        "Paket kurmadan ya da torrc’yi düzenlemeden önce onay istiyor ve çakışan Tor ayarlarını ezmek yerine duruyor.",
      ],
    },
    structure: ["hider.py", "test_hider.py", "installer.sh", "hider.service", ".github/"],
    facts: [
      { label: LANGUAGE, value: PYTHON },
      { label: { en: "Platforms", tr: "Platformlar" }, value: n("Linux · macOS · Windows") },
      { label: { en: "Tests", tr: "Testler" }, value: { en: "CI on GitHub Actions", tr: "GitHub Actions ile CI" } },
    ],
    caseStudy: true,
  },
  {
    slug: "m-info-get",
    name: "m-info-get",
    repo: gh("m-info-get"),
    tagline: {
      en: "Multi-threaded OSINT utility, now at version 13.",
      tr: "Çok iş parçacıklı OSINT aracı, şu an 13. sürümde.",
    },
    purpose: {
      en: "A reconnaissance utility written to learn how open-source intelligence work is organised in practice, with parallel lookups so a run finishes quickly.",
      tr: "Açık kaynak istihbaratı çalışmasının pratikte nasıl düzenlendiğini öğrenmek için yazılmış bir keşif aracı. Paralel sorgular sayesinde bir çalıştırma hızlı biter.",
    },
    category: { en: "Security tooling", tr: "Güvenlik araçları" },
    languages: ["Python"],
    tech: ["Python 3.8+", "Threading"],
    capabilities: {
      en: [
        "Phone number analysis (carrier, country, line type, validity)",
        "Username search across many public platforms",
        "Parallel execution with threads",
      ],
      tr: [
        "Telefon numarası analizi (operatör, ülke, hat tipi, geçerlilik)",
        "Birçok herkese açık platformda kullanıcı adı araması",
        "İş parçacıklarıyla paralel çalışma",
      ],
    },
    usage: {
      en: [
        "Open the project folder in a terminal.",
        "Run m-info-get.py with python3. The required libraries install automatically.",
      ],
      tr: [
        "Proje klasörünü terminalde aç.",
        "m-info-get.py dosyasını python3 ile çalıştır. Gerekli kütüphaneler otomatik kurulur.",
      ],
    },
    responsible: {
      en: [
        "The tool is framed as education and security-awareness material.",
        "It states that scanning targets without their permission can be unethical, and that responsibility for use lies with the user.",
      ],
      tr: [
        "Araç, eğitim ve güvenlik farkındalığı malzemesi olarak tanımlanıyor.",
        "İzinsiz tarama yapmanın etik dışı olabileceğini ve kullanımın sorumluluğunun kullanıcıda olduğunu belirtiyor.",
      ],
    },
    structure: ["m-info-get/"],
    facts: [
      { label: LANGUAGE, value: PYTHON },
      { label: { en: "Version", tr: "Sürüm" }, value: { en: "13.0", tr: "13.0" } },
      { label: COMMITS, value: n("14") },
    ],
    caseStudy: false,
  },
  {
    slug: "m-finder",
    name: "m-finder",
    repo: gh("m-finder"),
    tagline: {
      en: "Command-line helper for finding a site’s admin panel, now at v4.",
      tr: "Bir sitenin yönetim panelini bulmaya yardım eden komut satırı aracı, 4. sürümde.",
    },
    purpose: {
      en: "A command-line utility that takes a site address, normalises it (adds the scheme when missing) and prints what it finds, depending on the scan type you choose.",
      tr: "Bir site adresi alan, eksikse şemayı ekleyerek düzenleyen ve seçtiğin tarama türüne göre bulduklarını yazdıran komut satırı aracı.",
    },
    category: { en: "Security tooling", tr: "Güvenlik araçları" },
    languages: ["Python"],
    tech: ["Python"],
    capabilities: {
      en: [
        "Accepts addresses with or without http/https",
        "Selectable scan type",
        "Prints discovered pages to the terminal",
      ],
      tr: [
        "http/https yazılsa da yazılmasa da adresi kabul eder",
        "Seçilebilir tarama türü",
        "Bulunan sayfaları terminale yazdırır",
      ],
    },
    usage: {
      en: [
        "Open the project folder in a terminal.",
        "Run m-finder-v4.py, enter the address, pick a scan type and wait for the results.",
      ],
      tr: [
        "Proje klasörünü terminalde aç.",
        "m-finder-v4.py dosyasını çalıştır, adresi gir, tarama türünü seç ve sonuçları bekle.",
      ],
    },
    responsible: {
      en: ["Web reconnaissance belongs on sites you own or have written permission to test."],
      tr: ["Web keşfi yalnızca sahibi olduğun ya da yazılı izin aldığın sitelerde yapılmalıdır."],
    },
    structure: ["m-finder/"],
    facts: [
      { label: LANGUAGE, value: PYTHON },
      { label: { en: "Release", tr: "Sürüm" }, value: { en: "v4 (file name)", tr: "v4 (dosya adı)" } },
      { label: COMMITS, value: n("4") },
    ],
    caseStudy: false,
  },
  {
    slug: "m-copy",
    name: "m-copy",
    repo: gh("m-copy"),
    tagline: {
      en: "Saves a web page’s source to a file under a name you choose.",
      tr: "Bir web sayfasının kaynağını seçtiğin isimle dosyaya kaydeder.",
    },
    purpose: {
      en: "A small utility for grabbing the HTML source of a page for inspection: give it a link, name the file, optionally choose where to save it.",
      tr: "Bir sayfanın HTML kaynağını incelemek için alan küçük bir araç: bir link ver, dosyayı adlandır, istersen kayıt yerini seç.",
    },
    category: { en: "Utility", tr: "Yardımcı araç" },
    languages: ["Python"],
    tech: ["Python"],
    capabilities: {
      en: ["Fetches the source of a given URL", "Custom output file name", "Optional save location"],
      tr: ["Verilen URL’nin kaynağını alır", "Özel çıktı dosya adı", "İsteğe bağlı kayıt konumu"],
    },
    usage: {
      en: ["Run m-copy.py with python3.", "Enter the page link, then the file name, then a folder path (or 0 to skip)."],
      tr: ["m-copy.py dosyasını python3 ile çalıştır.", "Sayfa linkini, sonra dosya adını, sonra klasör yolunu gir (atlamak için 0)."],
    },
    responsible: { en: [], tr: [] },
    structure: ["M-Copy/"],
    facts: [
      { label: LANGUAGE, value: PYTHON },
      { label: COMMITS, value: n("3") },
    ],
    caseStudy: false,
  },
  {
    slug: "all-pip-installer",
    name: "all-pip-installer",
    repo: gh("all-pip-installer"),
    tagline: {
      en: "Installs a whole set of Python libraries in one run.",
      tr: "Bir dizi Python kütüphanesini tek seferde kurar.",
    },
    purpose: {
      en: "An automation script that installs a bundle of Python libraries in a single pass and prints each one as it is installed.",
      tr: "Bir grup Python kütüphanesini tek geçişte kuran ve kurdukça her birini yazdıran otomasyon betiği.",
    },
    category: { en: "Automation", tr: "Otomasyon" },
    languages: ["Python"],
    tech: ["Python", "pip"],
    capabilities: {
      en: ["Installs libraries in one run", "Prints each library to the terminal as it installs"],
      tr: ["Kütüphaneleri tek çalıştırmada kurar", "Kurulum sırasında her kütüphaneyi terminale yazar"],
    },
    usage: {
      en: ["Run all-pip.py with python3 from the project folder."],
      tr: ["all-pip.py dosyasını proje klasöründen python3 ile çalıştır."],
    },
    responsible: { en: [], tr: [] },
    structure: ["all-pip-installer/"],
    facts: [
      { label: LANGUAGE, value: PYTHON },
      { label: COMMITS, value: n("4") },
    ],
    caseStudy: false,
  },
];
