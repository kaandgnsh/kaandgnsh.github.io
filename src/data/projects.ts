import type { L, Project } from "../types.ts";

const gh = (repo: string) => `https://github.com/kaandgnsh/${repo}`;

const LANGUAGE: L = { en: "Language", tr: "Dil" };
const COMMITS: L = { en: "Commits", tr: "Commit" };
const PYTHON: L = { en: "Python", tr: "Python" };
const LICENSE: L = { en: "License", tr: "Lisans" };
const TESTS: L = { en: "Tests", tr: "Testler" };
const PLATFORMS: L = { en: "Platforms", tr: "Platformlar" };
const CI_MATRIX: L = { en: "GitHub Actions · 3.10–3.12", tr: "GitHub Actions · 3.10–3.12" };
const n = (v: string): L => ({ en: v, tr: v });
const b = (en: string, tr: string): L => ({ en, tr });

/**
 * Selected work. Every statement comes from the project's own GitHub README
 * (all five re-read in full on 2026-10-16) and is kept as detailed as the
 * README: features, setup, CLI reference, safety limits, tests and layout.
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
    tagline: b(
      "Modular OSINT and reconnaissance framework for public-source research, entity correlation and local reporting.",
      "Herkese açık kaynak araştırması, varlık ilişkilendirme ve yerel raporlama için modüler OSINT ve keşif çatısı.",
    ),
    purpose: b(
      "ARGUS collects information from public sources, records entities and relationships in a local SQLite database, and exports findings to structured reports. Its provider-based architecture supports domain, IP, URL, username, email, phone-number, GitHub, threat-indicator and local-file workflows.",
      "ARGUS herkese açık kaynaklardan bilgi topluyor, varlıkları ve aralarındaki ilişkileri yerel bir SQLite veritabanına kaydediyor ve bulguları yapılandırılmış raporlar olarak dışa aktarıyor. Sağlayıcı tabanlı mimarisi alan adı, IP, URL, kullanıcı adı, e-posta, telefon numarası, GitHub, tehdit göstergesi ve yerel dosya iş akışlarını destekliyor.",
    ),
    overview: {
      en: ["A result from ARGUS is not a guarantee that it is correct, complete, current or legally appropriate to collect; material findings are verified against the original source."],
      tr: ["ARGUS’un bir sonucu doğru, eksiksiz, güncel ya da toplanması hukuken uygun olduğu anlamına gelmiyor; önemli bulgular her zaman özgün kaynağından doğrulanmalı."],
    },
    notices: [
      {
        title: b("Use responsibly", "Sorumlu kullanım"),
        text: b(
          "Run ARGUS only on your own data, in a controlled lab, or against targets for which you have explicit authorisation. Phone numbers, email addresses, usernames, IP addresses and related identifiers may be sent to third-party providers. Public availability does not grant unlimited permission to collect, correlate or republish information. Do not use ARGUS for stalking, harassment, unauthorised access or evasion of security controls.",
          "ARGUS’u yalnızca kendi verinde, kontrollü bir laboratuvarda ya da açıkça yetki aldığın hedeflerde çalıştır. Telefon numaraları, e-posta adresleri, kullanıcı adları, IP adresleri ve ilgili tanımlayıcılar üçüncü taraf sağlayıcılara gönderilebilir. Bir bilginin herkese açık olması onu toplama, ilişkilendirme ya da yeniden yayımlama için sınırsız izin vermez. ARGUS takip, taciz, yetkisiz erişim ya da güvenlik kontrollerini atlatmak için kullanılmamalıdır.",
        ),
      },
    ],
    category: b("Security tooling", "Güvenlik araçları"),
    languages: ["Python"],
    tech: ["Python 3.10+", "SQLite", "Provider architecture", "pytest", "GitHub Actions", "MIT"],
    license: "MIT",
    cmd: "python3 argus.py -domain example.com",
    capabilities: {
      en: [
        "Multiple target types: usernames, email addresses, phone numbers, domains/DNS, IP addresses, URLs, hashes, GitHub profiles, threat indicators and local files.",
        "Provider-based architecture: modular DNS, RDAP, Certificate Transparency and threat-intelligence lookups.",
        "Local database: entities, relationships, evidence and cases are stored in SQLite.",
        "Report exports: JSON, HTML, CSV, Markdown and GraphViz DOT.",
        "File analysis: hash calculation, IOC extraction, archive inspection, and optional EXIF/PDF/media metadata support.",
        "Security controls: URL and redirect checks for HTTP requests, archive member/size/path limits, and bounded subprocess operations for supported external tools.",
        "Optional external tools: list the supported tools and request installation explicitly.",
        "No automatic dependency installation at start-up: Python dependencies are installed deliberately, optional components only when needed.",
      ],
      tr: [
        "Çok sayıda hedef türü: kullanıcı adları, e-posta adresleri, telefon numaraları, alan adları/DNS, IP adresleri, URL’ler, hash’ler, GitHub profilleri, tehdit göstergeleri ve yerel dosyalar.",
        "Sağlayıcı tabanlı mimari: modüler DNS, RDAP, Certificate Transparency ve tehdit istihbaratı sorguları.",
        "Yerel veritabanı: varlıklar, ilişkiler, kanıtlar ve vakalar SQLite’ta saklanıyor.",
        "Rapor dışa aktarma: JSON, HTML, CSV, Markdown ve GraphViz DOT.",
        "Dosya analizi: hash hesaplama, IOC çıkarma, arşiv inceleme ve isteğe bağlı EXIF/PDF/medya üst verisi desteği.",
        "Güvenlik kontrolleri: HTTP istekleri için URL ve yönlendirme denetimleri, arşivlerde üye/boyut/yol sınırları, desteklenen harici araçlar için sınırlı alt süreç işlemleri.",
        "İsteğe bağlı harici araçlar: desteklenen araçları listeleme ve kurulumu açıkça talep etme.",
        "Başlangıçta otomatik bağımlılık kurulumu yok: Python bağımlılıkları bilinçli olarak, isteğe bağlı bileşenler yalnızca gerektiğinde kuruluyor.",
      ],
    },
    requirements: {
      en: ["Python 3.10 or newer", "Git", "The Python packages listed in `requirements.txt`"],
      tr: ["Python 3.10 veya üzeri", "Git", "`requirements.txt` içinde listelenen Python paketleri"],
    },
    quickstart: [
      {
        label: b("Clone and set up (Linux, macOS, Termux)", "Klonla ve kur (Linux, macOS, Termux)"),
        code: "git clone https://github.com/kaandgnsh/Argus.git\ncd Argus\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install --upgrade pip\npython -m pip install -r requirements.txt\npython argus.py --version",
        note: b(
          "If the distribution lacks the `venv` module, install the matching OS package (often `python3-venv`). On Termux, run `pkg update` and `pkg install python git` first.",
          "Dağıtımda `venv` modülü yoksa ilgili işletim sistemi paketini (çoğunlukla `python3-venv`) kur. Termux’ta önce `pkg update` ve `pkg install python git` çalıştır.",
        ),
      },
      {
        label: b("Windows (PowerShell)", "Windows (PowerShell)"),
        shell: "powershell",
        code: "git clone https://github.com/kaandgnsh/Argus.git\ncd Argus\npy -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip\npython -m pip install -r requirements.txt\npython argus.py --version",
      },
      {
        label: b("Installation helper (POSIX)", "Kurulum yardımcısı (POSIX)"),
        code: "sh install.sh",
        note: b(
          "Creates a local `.venv`, installs the required packages there and asks before installing the optional set. It does not install OS-level external tools.",
          "Yerel bir `.venv` oluşturuyor, gerekli paketleri oraya kuruyor ve isteğe bağlı seti kurmadan önce soruyor. İşletim sistemi düzeyindeki harici araçları kurmuyor.",
        ),
      },
      {
        label: b("Optional and development dependencies", "İsteğe bağlı ve geliştirme bağımlılıkları"),
        code: "python -m pip install -r requirements-optional.txt\npython -m pip install -r requirements-dev.txt",
        note: b(
          "Install only what your workflow needs. Some packages need OS libraries (`python-magic` may need `libmagic`); optional phone-number integrations can send identifiers to third-party providers.",
          "Yalnızca iş akışının gerektirdiğini kur. Bazı paketler işletim sistemi kütüphanesi istiyor (`python-magic` için `libmagic` gerekebilir); isteğe bağlı telefon numarası entegrasyonları tanımlayıcıları üçüncü taraf sağlayıcılara gönderebilir.",
        ),
      },
      {
        label: b("Supported workflows", "Desteklenen iş akışları"),
        code: "# Interactive menu\npython3 argus.py\n\n# Domain, DNS and IP information\npython3 argus.py -domain example.com\npython3 argus.py -dns example.com\npython3 argus.py -ip 8.8.8.8 --no-map\n\n# Username, email and public GitHub profile lookups\npython3 argus.py -username kaandgnsh\npython3 argus.py -email user@example.com\npython3 argus.py -github torvalds\n\n# URL, hash and threat-indicator lookups\npython3 argus.py -url https://example.com\npython3 argus.py -hash 5d41402abc4b2a76b9719d911017c592\npython3 argus.py -threat 8.8.8.8\n\n# Local file metadata and search\npython3 argus.py -file ./document.pdf\npython3 argus.py -exif ./photo.jpg\npython3 argus.py -search \"site:example.com security.txt\"\n\n# Export records already stored in the local database\npython3 argus.py --export-all",
        note: b(
          "`--export-all` does not start a new scan; it exports records already in the SQLite database. Search, phone-number, IP and provider-based commands may send requests to third-party services.",
          "`--export-all` yeni bir tarama başlatmıyor; SQLite veritabanında zaten bulunan kayıtları dışa aktarıyor. Arama, telefon numarası, IP ve sağlayıcı tabanlı komutlar üçüncü taraf servislere istek gönderebilir.",
        ),
      },
    ],
    options: [
      { flag: "-phone NUMBER", desc: b("Phone-number analysis; may use configured third-party providers.", "Telefon numarası analizi; yapılandırılmış üçüncü taraf sağlayıcıları kullanabilir.") },
      { flag: "-username USER, -u USER", desc: b("Username research across supported platforms.", "Desteklenen platformlarda kullanıcı adı araştırması.") },
      { flag: "-email EMAIL", desc: b("Email-related intelligence.", "E-postaya ilişkin istihbarat.") },
      { flag: "-domain DOMAIN", desc: b("Domain intelligence and subdomain information.", "Alan adı istihbaratı ve alt alan adı bilgisi.") },
      { flag: "-dns DOMAIN", desc: b("DNS-focused domain lookup.", "DNS odaklı alan adı sorgusu.") },
      { flag: "-ip IP", desc: b("IP intelligence; use `--no-map` to hide the ASCII map.", "IP istihbaratı; ASCII haritayı gizlemek için `--no-map`.") },
      { flag: "-url URL", desc: b("URL, HTTP-header and redirect analysis.", "URL, HTTP başlığı ve yönlendirme analizi.") },
      { flag: "-hash HASH", desc: b("Hash identification and related lookup.", "Hash tanımlama ve ilgili sorgu.") },
      { flag: "-github USER", desc: b("Public GitHub profile and repository information.", "Herkese açık GitHub profili ve depo bilgisi.") },
      { flag: "-threat IOC", desc: b("Look up a supported IP, domain, URL, hash or CVE indicator.", "Desteklenen bir IP, alan adı, URL, hash ya da CVE göstergesini sorgular.") },
      { flag: "-file PATH", desc: b("Analyse a local file and extract supported indicators.", "Yerel bir dosyayı analiz eder ve desteklenen göstergeleri çıkarır.") },
      { flag: "-exif IMAGE", desc: b("Extract image metadata; `--save-thumb` saves an embedded thumbnail under `reports/`.", "Görsel üst verisini çıkarır; `--save-thumb` gömülü küçük resmi `reports/` altına kaydeder.") },
      { flag: "-dork QUERY", desc: b("Submit a search-engine query.", "Arama motoruna sorgu gönderir.") },
      { flag: "-search QUERY", desc: b("Perform a general web search.", "Genel web araması yapar.") },
      { flag: "-correlate QUERY", desc: b("Explore relationships recorded in the local database.", "Yerel veritabanına kaydedilmiş ilişkileri inceler.") },
      { flag: "--export-json", desc: b("Export a JSON report.", "JSON raporu dışa aktarır.") },
      { flag: "--export-html", desc: b("Export an HTML report.", "HTML raporu dışa aktarır.") },
      { flag: "--export-csv", desc: b("Export entity and relationship CSV files.", "Varlık ve ilişki CSV dosyalarını dışa aktarır.") },
      { flag: "--export-md", desc: b("Export a Markdown report.", "Markdown raporu dışa aktarır.") },
      { flag: "--export-dot", desc: b("Export a GraphViz DOT relationship graph.", "GraphViz DOT ilişki grafiği dışa aktarır.") },
      { flag: "--export-all", desc: b("Generate all supported report formats.", "Desteklenen bütün rapor biçimlerini üretir.") },
      { flag: "--list-tools", desc: b("Show supported external tools and their status.", "Desteklenen harici araçları ve durumlarını gösterir.") },
      { flag: "--install-tools TOOL", desc: b("Request installation of a selected external tool; `all` lists the tools.", "Seçilen harici aracın kurulumunu talep eder; `all` araçları listeler.") },
      { flag: "--no-color", desc: b("Disable coloured terminal output.", "Renkli terminal çıktısını kapatır.") },
      { flag: "--debug", desc: b("Enable debug logging.", "Hata ayıklama günlüğünü açar.") },
      { flag: "--clear-cache", desc: b("Clear the local cache.", "Yerel önbelleği temizler.") },
      { flag: "--json", desc: b("JSON stdout output for supported `-search` and `-exif` workflows.", "Desteklenen `-search` ve `-exif` iş akışları için JSON çıktı.") },
      { flag: "--subdomain-log PATH", desc: b("Write the complete subdomain list to a file.", "Alt alan adı listesinin tamamını dosyaya yazar.") },
      { flag: "--no-map", desc: b("Hide the ASCII map in IP lookups.", "IP sorgularında ASCII haritayı gizler.") },
      { flag: "--save-thumb", desc: b("Save an embedded image thumbnail under `reports/`.", "Gömülü küçük resmi `reports/` altına kaydeder.") },
      { flag: "--version", desc: b("Print the installed ARGUS version.", "Kurulu ARGUS sürümünü yazdırır.") },
    ],
    responsible: {
      en: [
        "Third-party lookups: the enabled provider configuration decides which external services receive a query; their retention policies and terms are checked before personal identifiers are submitted.",
        "Provider configuration: `config/providers.json` is reviewed and unneeded providers disabled. API keys and private provider configuration never go into Git; each provider reads its own environment variables.",
        "Local artefacts: entities and relationships may be stored in `data/argus.sqlite`; reports, logs and caches can hold sensitive findings, so data directories stay private and reports are inspected before sharing.",
        "HTTP safeguards: URLs and redirect targets are checked, treated as defence in depth rather than proof that every endpoint or DNS configuration is safe.",
        "File analysis: only files you are authorised to inspect; reports containing personal information, tokens, private paths or internal network details are not shared.",
        "Result quality: automated matches can be false positives or stale, so material findings are verified at the source.",
        "Vulnerabilities are reported through the repository’s `SECURITY.md` policy.",
      ],
      tr: [
        "Üçüncü taraf sorgular: hangi harici servislerin sorgu alacağını etkin sağlayıcı yapılandırması belirliyor; kişisel tanımlayıcılar gönderilmeden önce bu servislerin saklama politikaları ve koşulları kontrol ediliyor.",
        "Sağlayıcı yapılandırması: `config/providers.json` gözden geçiriliyor, gereksiz sağlayıcılar kapatılıyor. API anahtarları ve özel sağlayıcı yapılandırması asla Git’e girmiyor; her sağlayıcı kendi ortam değişkenlerini okuyor.",
        "Yerel çıktılar: varlıklar ve ilişkiler `data/argus.sqlite` içinde saklanabiliyor; raporlar, günlükler ve önbellekler hassas bulgular içerebileceği için veri klasörleri gizli tutuluyor, raporlar paylaşılmadan önce inceleniyor.",
        "HTTP önlemleri: URL’ler ve yönlendirme hedefleri denetleniyor; bu denetimler her uç noktanın ya da DNS yapılandırmasının güvenli olduğunun kanıtı değil, katmanlı savunmanın bir parçası olarak görülüyor.",
        "Dosya analizi: yalnızca incelemeye yetkili olduğun dosyalar; kişisel bilgi, token, özel dosya yolu ya da iç ağ ayrıntısı içeren raporlar paylaşılmıyor.",
        "Sonuç kalitesi: otomatik eşleşmeler yanlış pozitif ya da eskimiş olabilir; önemli bulgular kaynağında doğrulanıyor.",
        "Güvenlik açıkları deponun `SECURITY.md` politikası üzerinden bildiriliyor.",
      ],
    },
    testing: {
      cmd: "python -m pip install -r requirements-dev.txt\npython -m pytest -q",
      text: {
        en: ["GitHub Actions runs the suite on Python 3.10, 3.11 and 3.12. It covers HTTP and URL safeguards, security helpers, phone-number normalisation, CLI behaviour and report exports."],
        tr: ["GitHub Actions test paketini Python 3.10, 3.11 ve 3.12’de çalıştırıyor. Kapsam: HTTP ve URL önlemleri, güvenlik yardımcıları, telefon numarası normalleştirme, CLI davranışı ve rapor dışa aktarma."],
      },
    },
    tree: "Argus/\n├── argus.py\n├── install.sh\n├── requirements.txt\n├── requirements-optional.txt\n├── requirements-dev.txt\n├── config/\n├── core/\n├── data/\n├── cache/\n├── logs/\n├── modules/\n├── providers/\n├── reports/\n└── tests/",
    safeDefault: b("No dependencies installed at start-up; external tools only on explicit request", "Başlangıçta bağımlılık kurulmuyor; harici araçlar yalnızca açık talep üzerine"),
    ci: true,
    facts: [
      { label: LANGUAGE, value: n("Python 3.10+") },
      { label: PLATFORMS, value: n("Linux · macOS · Windows · Termux") },
      { label: TESTS, value: CI_MATRIX },
      { label: LICENSE, value: n("MIT") },
    ],
    caseStudy: true,
  },
  {
    slug: "m-dos",
    name: "m-dos",
    repo: gh("m-dos"),
    tagline: b(
      "Minimal HTTP response-time analyser for local development environments, loopback-only by design.",
      "Yerel geliştirme ortamları için yalın HTTP yanıt süresi analizcisi; tasarımı gereği yalnızca loopback.",
    ),
    purpose: b(
      "m-dos (Local Lab) measures HTTP response times and observes the basic behaviour of services running on your own machine. It focuses on practical fundamentals: HTTP, input validation, timing, error handling, testable code and safe-by-default tooling.",
      "m-dos (Local Lab) HTTP yanıt sürelerini ölçüyor ve kendi makinende çalışan servislerin temel davranışını gözlemliyor. Odağında pratik temeller var: HTTP, girdi doğrulama, zamanlama, hata yönetimi, test edilebilir kod ve varsayılan olarak güvenli araç tasarımı.",
    ),
    notices: [
      {
        title: b("Safety by design", "Tasarımdan gelen güvenlik"),
        text: b(
          "m-dos accepts loopback targets only. Remote hosts, traffic flooding, proxies, port scanning and concurrent workers are intentionally unsupported. Run it only against services on your own machine or targets you are explicitly authorised to test.",
          "m-dos yalnızca loopback hedefleri kabul ediyor. Uzak hostlar, trafik seli, proxy’ler, port tarama ve eşzamanlı işçiler bilinçli olarak desteklenmiyor. Yalnızca kendi makinendeki servislere ya da test etmeye açıkça yetkili olduğun hedeflere karşı çalıştır.",
        ),
      },
    ],
    category: b("Networking & testing", "Ağ ve test"),
    languages: ["Python"],
    tech: ["Python 3.10+", "Standard library", "unittest", "GitHub Actions"],
    cmd: "python m-dos/m-dos.py --url http://127.0.0.1:8000/ --duration 10",
    capabilities: {
      en: [
        "Response-time sampling: measures each request’s elapsed time in milliseconds.",
        "HTTP status tracking: records response status codes, including HTTP errors.",
        "Summary output: request count, errors and min / max / mean latency.",
        "JSON summary: prints machine-readable summary data to the terminal.",
        "Bounded execution: at most 30 seconds and 60 requests.",
        "Loopback validation: accepts `localhost` and loopback IP addresses only.",
        "Zero dependencies: Python’s standard library only.",
        "Unit tests: cover target and duration validation.",
      ],
      tr: [
        "Yanıt süresi örnekleme: her isteğin geçen süresini milisaniye olarak ölçüyor.",
        "HTTP durum takibi: HTTP hataları dahil yanıt durum kodlarını kaydediyor.",
        "Özet çıktı: istek sayısı, hatalar ve en düşük / en yüksek / ortalama gecikme.",
        "JSON özeti: makinenin okuyabileceği özet veriyi terminale yazdırıyor.",
        "Sınırlı çalışma: en fazla 30 saniye ve 60 istek.",
        "Loopback doğrulaması: yalnızca `localhost` ve loopback IP adreslerini kabul ediyor.",
        "Sıfır bağımlılık: yalnızca Python standart kütüphanesi.",
        "Birim testleri: hedef ve süre doğrulamasını kapsıyor.",
      ],
    },
    requirements: {
      en: ["Python 3.10 or newer", "Git", "No third-party Python packages"],
      tr: ["Python 3.10 veya üzeri", "Git", "Üçüncü taraf Python paketi gerekmiyor"],
    },
    quickstart: [
      { label: b("1 · Clone the repository", "1 · Depoyu klonla"), code: "git clone https://github.com/kaandgnsh/m-dos.git\ncd m-dos" },
      {
        label: b("2 · Start a local test server (first terminal)", "2 · Yerel test sunucusunu başlat (birinci terminal)"),
        code: "python -m http.server 8000 --bind 127.0.0.1",
        note: b("The server binds to the loopback interface and is meant for local testing.", "Sunucu loopback arayüzüne bağlanıyor ve yerel test için tasarlandı."),
      },
      { label: b("3 · Run m-dos (second terminal, repository root)", "3 · m-dos’u çalıştır (ikinci terminal, depo kökü)"), code: "python m-dos/m-dos.py --url http://127.0.0.1:8000/ --duration 10" },
      { label: b("4 · Run the tests", "4 · Testleri çalıştır"), code: "python -m unittest discover -s m-dos -p 'test_*.py' -v" },
    ],
    options: [
      { flag: "--url", required: true, desc: b("Local HTTP or HTTPS URL to sample.", "Örneklenecek yerel HTTP ya da HTTPS URL’si.") },
      { flag: "--duration", desc: b("Sampling duration in seconds; range 1–30, default 10.", "Saniye cinsinden örnekleme süresi; aralık 1–30, varsayılan 10.") },
      { flag: "-h, --help", desc: b("Display help and exit.", "Yardımı gösterir ve çıkar.") },
    ],
    output: {
      code: "Local lab target: http://127.0.0.1:8000/\nSafety limits: <= 30s, <= 60 requests, one worker.\n01 status=200 latency=3.42ms error=-\n02 status=200 latency=2.81ms error=-\n\nSummary:\n{\n  \"target\": \"http://127.0.0.1:8000/\",\n  \"requests\": 2,\n  \"successful_http_responses\": 2,\n  \"errors\": 0,\n  \"latency_ms\": {\n    \"min\": 2.81,\n    \"max\": 3.42,\n    \"mean\": 3.12\n  }\n}",
      note: b("Illustrative output; actual timings depend on the machine and the local service.", "Örnek çıktıdır; gerçek süreler makineye ve yerel servise bağlı."),
    },
    tables: [
      {
        id: "limits",
        title: b("Safety limits", "Güvenlik sınırları"),
        lede: b(
          "A learning utility for local services you control, not a production load-testing benchmark or a security scanner.",
          "Kontrol ettiğin yerel servisler için bir çalışma aracı; üretim yük testi ya da güvenlik tarayıcısı değil.",
        ),
        cols: [b("Control", "Kontrol"), b("Limit", "Sınır")],
        rows: [
          [b("Allowed targets", "İzin verilen hedefler"), b("`localhost` and loopback IP addresses", "`localhost` ve loopback IP adresleri")],
          [b("Runtime", "Çalışma süresi"), b("1–30 seconds", "1–30 saniye")],
          [b("Total requests", "Toplam istek"), b("At most 60", "En fazla 60")],
          [b("Workers", "İşçi"), b("One", "Bir")],
          [b("Request start interval", "İstekler arası süre"), b("At least 0.5 seconds", "En az 0,5 saniye")],
          [b("Proxy handling", "Proxy"), b("Environment proxies are disabled", "Ortam proxy’leri kapalı")],
        ],
      },
    ],
    responsible: {
      en: [
        "Use it only with local services you control.",
        "Remote targets, URL schemes other than HTTP/HTTPS and credentials embedded in URLs are rejected before any request is made.",
        "Security concerns are reported privately to the repository owner, never in a public issue.",
      ],
      tr: [
        "Yalnızca kontrol ettiğin yerel servislerle kullan.",
        "Uzak hedefler, HTTP/HTTPS dışındaki URL şemaları ve URL içine gömülü kimlik bilgileri, hiçbir istek yapılmadan reddediliyor.",
        "Güvenlik sorunları herkese açık bir issue’da değil, depo sahibine özel olarak bildiriliyor.",
      ],
    },
    testing: {
      cmd: "python -m unittest discover -s m-dos -p 'test_*.py' -v",
      text: {
        en: [
          "GitHub Actions compiles the source and runs the unit tests on Python 3.10, 3.11 and 3.12.",
          "Covered: valid loopback hostnames and IP addresses; rejection of remote targets; rejection of unsupported URL schemes; rejection of credentials embedded in URLs; duration boundaries.",
          "A passing suite is useful evidence, not a guarantee that every defect has been found.",
        ],
        tr: [
          "GitHub Actions kaynağı derliyor ve birim testlerini Python 3.10, 3.11 ve 3.12’de çalıştırıyor.",
          "Kapsam: geçerli loopback host adları ve IP adresleri; uzak hedeflerin reddi; desteklenmeyen URL şemalarının reddi; URL’ye gömülü kimlik bilgilerinin reddi; süre sınırları.",
          "Geçen bir test paketi faydalı bir kanıt; her hatanın bulunduğunun garantisi değil.",
        ],
      },
    },
    roadmap: [
      { done: true, text: b("Loopback-only target validation", "Yalnızca loopback hedef doğrulaması") },
      { done: true, text: b("Runtime and request-count limits", "Çalışma süresi ve istek sayısı sınırları") },
      { done: true, text: b("Input-validation unit tests", "Girdi doğrulama birim testleri") },
      { done: true, text: b("GitHub Actions workflow", "GitHub Actions iş akışı") },
      { done: false, text: b("Export reports to CSV", "Raporları CSV olarak dışa aktarma") },
      { done: false, text: b("Median and percentile latency metrics", "Medyan ve yüzdelik gecikme metrikleri") },
      { done: false, text: b("Broader HTTP error-handling tests", "Daha geniş HTTP hata yönetimi testleri") },
    ],
    troubleshooting: [
      { q: b("Connection refused", "Bağlantı reddedildi"), a: b("Make sure the local HTTP server is running and listening on port 8000.", "Yerel HTTP sunucusunun çalıştığından ve 8000 portunu dinlediğinden emin ol."), cmd: "ss -ltn" },
      { q: b("Target rejected", "Hedef reddedildi"), a: b("Only loopback addresses are allowed, for example:", "Yalnızca loopback adreslerine izin veriliyor, örneğin:"), cmd: "python m-dos/m-dos.py --url http://127.0.0.1:8000/ --duration 5" },
      { q: b("Python version", "Python sürümü"), a: b("Use Python 3.10 or newer.", "Python 3.10 veya üzerini kullan."), cmd: "python --version" },
    ],
    tree: "m-dos/\n├── .github/\n│   └── workflows/\n│       └── tests.yml\n├── m-dos/\n│   ├── m-dos.py\n│   └── test_m_dos.py\n└── README.md",
    safeDefault: b("Loopback-only, one worker, hard caps on time and requests", "Yalnızca loopback, tek işçi, süre ve istekte katı sınır"),
    ci: true,
    facts: [
      { label: LANGUAGE, value: n("Python 3.10+") },
      { label: b("Dependencies", "Bağımlılık"), value: b("None (standard library)", "Yok (standart kütüphane)") },
      { label: b("Scope", "Kapsam"), value: b("Loopback only", "Yalnızca loopback") },
      { label: TESTS, value: CI_MATRIX },
    ],
    caseStudy: true,
  },
  {
    slug: "hider",
    name: "hider",
    repo: gh("hider"),
    tagline: b(
      "Multi-backend IP routing and proxy rotation utility for controlled privacy labs.",
      "Kontrollü gizlilik laboratuvarları için çok arka uçlu IP yönlendirme ve proxy rotasyon aracı.",
    ),
    purpose: b(
      "hider rotates an application’s HTTP egress through a user-supplied proxy list, or uses an existing Tor or anonsurf setup. What it can do depends on the selected backend and the operating system.",
      "hider bir uygulamanın dışa giden HTTP trafiğini kullanıcının verdiği proxy listesi üzerinden döndürüyor ya da mevcut bir Tor veya anonsurf kurulumunu kullanıyor. Neler yapabildiği seçilen arka uca ve işletim sistemine bağlı.",
    ),
    notices: [
      {
        title: b("Privacy and safety", "Gizlilik ve güvenlik"),
        text: b(
          "An IP address change is not a guarantee of anonymity or complete traffic protection. The proxy backend routes only hider’s own HTTP requests; it does not change routing for every application on the device. The anonsurf backend can affect system-wide traffic. Use only devices and networks you control or are authorised to administer.",
          "IP adresinin değişmesi anonimlik ya da tam trafik koruması garantisi değil. Proxy arka ucu yalnızca hider’ın kendi HTTP isteklerini yönlendiriyor; cihazdaki her uygulamanın yönlendirmesini değiştirmiyor. anonsurf arka ucu ise sistem genelindeki trafiği etkileyebilir. Yalnızca kontrol ettiğin ya da yönetmeye yetkili olduğun cihaz ve ağlarda kullan.",
        ),
      },
      {
        title: b("System changes", "Sistem değişiklikleri"),
        text: b(
          "When Tor setup is needed, hider may install OS packages, append local Tor settings to `torrc` and restart Tor, after asking for confirmation. It will not disable cookie authentication, use pip’s `--break-system-packages`, or enable the Tor service at boot. Existing conflicting Tor settings are left untouched and cause setup to stop.",
          "Tor kurulumu gerektiğinde hider onay istedikten sonra işletim sistemi paketleri kurabilir, `torrc` dosyasına yerel Tor ayarları ekleyebilir ve Tor’u yeniden başlatabilir. Çerez kimlik doğrulamasını kapatmıyor, pip’in `--break-system-packages` seçeneğini kullanmıyor ve Tor servisini açılışta başlayacak şekilde etkinleştirmiyor. Çakışan mevcut Tor ayarlarına dokunmuyor; bu durumda kurulum duruyor.",
        ),
      },
    ],
    category: b("Privacy & networking", "Gizlilik ve ağ"),
    languages: ["Python"],
    tech: ["Python 3.8+", "Tor control protocol", "SAFECOOKIE", "Proxies", "unittest", "GitHub Actions", "MIT"],
    license: "MIT",
    cmd: "python3 hider.py --no-sudo --backend proxy --proxy-file ./proxies.txt --once",
    capabilities: {
      en: [
        "Platform detection: common Linux distributions, macOS and Windows.",
        "Backends: Tor, anonsurf and a user-provided proxy list.",
        "Rotation: fixed or randomised intervals, plus a one-shot mode.",
        "Tor SAFECOOKIE authentication when the local control port supports it.",
        "Credential masking: proxy credentials are kept out of the start-up log.",
        "Bounded HTTP request timeouts, with backend errors reported.",
        "Troubleshooting log: reviewed before sharing, since it may contain IP and network metadata.",
      ],
      tr: [
        "Platform algılama: yaygın Linux dağıtımları, macOS ve Windows.",
        "Arka uçlar: Tor, anonsurf ve kullanıcının verdiği proxy listesi.",
        "Rotasyon: sabit ya da rastgele aralıklar, ayrıca tek seferlik mod.",
        "Yerel kontrol portu destekliyorsa Tor SAFECOOKIE kimlik doğrulaması.",
        "Kimlik bilgisi maskeleme: proxy kimlik bilgileri başlangıç günlüğüne yazılmıyor.",
        "Sınırlı HTTP istek zaman aşımları; arka uç hataları raporlanıyor.",
        "Sorun giderme günlüğü: IP ve ağ üst verisi içerebileceği için paylaşmadan önce gözden geçiriliyor.",
      ],
    },
    requirements: {
      en: [
        "Python 3.8 or newer, with the dependencies from `requirements.txt`",
        "A compatible Tor utility/service for the Tor backend, an installed anonsurf, or a local proxy list",
        "Administrator privileges only for system-level setup or anonsurf operations",
      ],
      tr: [
        "Python 3.8 veya üzeri ve `requirements.txt` içindeki bağımlılıklar",
        "Tor arka ucu için uyumlu bir Tor aracı/servisi, kurulu bir anonsurf ya da yerel bir proxy listesi",
        "Yönetici yetkisi yalnızca sistem düzeyindeki kurulum ya da anonsurf işlemleri için",
      ],
    },
    quickstart: [
      {
        label: b("Clone and install in a virtual environment", "Klonla ve sanal ortama kur"),
        code: "git clone https://github.com/kaandgnsh/hider.git\ncd hider\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt",
        note: b(
          "On Arch-based systems, refresh with the normal full-upgrade workflow first: hider uses `pacman -S`, never a partial `pacman -Sy` transaction.",
          "Arch tabanlı sistemlerde önce normal tam güncelleme akışını çalıştır: hider kısmi `pacman -Sy` işlemi yerine `pacman -S` kullanıyor.",
        ),
      },
      {
        label: b("Proxy list format (proxies.txt)", "Proxy listesi biçimi (proxies.txt)"),
        shell: "text",
        code: "http://127.0.0.1:8080\nsocks5://127.0.0.1:9050",
        note: b(
          "One proxy URL per non-comment line. List only trusted proxies; embedded credentials are kept out of the log, but the file itself must be protected.",
          "Yorum olmayan her satıra bir proxy URL’si. Yalnızca güvendiğin proxy’leri listele; gömülü kimlik bilgileri günlüğe yazılmıyor ama dosyanın kendisi korunmalı.",
        ),
      },
      {
        label: b("Proxy backend, without automatic sudo", "Proxy arka ucu, otomatik sudo olmadan"),
        code: "python3 hider.py --no-sudo --backend proxy --proxy-file ./proxies.txt --time 60",
      },
      {
        label: b("Use an already configured Tor service", "Hazır yapılandırılmış Tor servisini kullan"),
        code: "sudo python3 hider.py --backend tor --time 60 --no-install",
        note: b(
          "Without `--no-install`, hider asks before installing packages or changing Tor configuration if setup is missing.",
          "`--no-install` olmadan, kurulum eksikse hider paket kurmadan ya da Tor yapılandırmasını değiştirmeden önce soruyor.",
        ),
      },
      { label: b("One-shot check", "Tek seferlik kontrol"), code: "python3 hider.py --no-sudo --backend proxy --proxy-file ./proxies.txt --once" },
    ],
    options: [
      { flag: "-t, --time SECONDS", desc: b("Fixed rotation interval; minimum 5 seconds.", "Sabit rotasyon aralığı; en az 5 saniye.") },
      { flag: "-r, --random", desc: b("Random interval mode.", "Rastgele aralık modu.") },
      { flag: "--min-wait SECONDS", desc: b("Lower bound for random mode.", "Rastgele mod için alt sınır.") },
      { flag: "--max-wait SECONDS", desc: b("Upper bound for random mode; maximum 3,600 seconds.", "Rastgele mod için üst sınır; en fazla 3.600 saniye.") },
      { flag: "-p, --proxy-file PATH", desc: b("Path to a local proxy list.", "Yerel proxy listesinin yolu.") },
      { flag: "-b, --backend NAME", desc: b("`auto`, `anonsurf`, `tor` or `proxy`.", "`auto`, `anonsurf`, `tor` ya da `proxy`.") },
      { flag: "--tor-password PASSWORD", desc: b("Password for a control port using hashed-password authentication. Cookie authentication is preferred; command-line values may be visible to local process inspection.", "Hash’lenmiş parola doğrulaması kullanan kontrol portu için parola. Çerez doğrulaması tercih ediliyor; komut satırındaki değerler yerel süreç incelemesiyle görülebilir.") },
      { flag: "--once", desc: b("Perform one rotation and exit.", "Tek rotasyon yapar ve çıkar.") },
      { flag: "--no-stop", desc: b("Do not run backend clean-up on exit.", "Çıkışta arka uç temizliğini çalıştırmaz.") },
      { flag: "--no-install", desc: b("Do not install packages or configure Tor automatically.", "Paketleri otomatik kurmaz, Tor’u otomatik yapılandırmaz.") },
      { flag: "--no-sudo", desc: b("Do not re-exec through sudo; use with a backend that does not need root.", "sudo ile yeniden çalıştırmaz; root gerektirmeyen bir arka uçla kullanılır.") },
      { flag: "-v, --verbose", desc: b("Enable debug logging.", "Hata ayıklama günlüğünü açar.") },
    ],
    extra: [
      {
        id: "tor",
        title: b("Tor authentication and configuration", "Tor kimlik doğrulaması ve yapılandırması"),
        paras: {
          en: [
            "hider speaks Tor’s control protocol and prefers SAFECOOKIE authentication. It reads the cookie path reported by Tor’s `PROTOCOLINFO` response and verifies the server response before sending the client authentication hash.",
            "It appends `SocksPort 9050`, `ControlPort 9051` and `CookieAuthentication 1` only when those options are missing. If cookie authentication is explicitly disabled, or an existing port conflicts with the expected local ports, configuration stops instead of overriding the setting.",
            "Tor is not enabled at boot, and the daemon keeps running when hider exits, because other applications may share the service.",
          ],
          tr: [
            "hider Tor’un kontrol protokolünü kullanıyor ve SAFECOOKIE kimlik doğrulamasını tercih ediyor. Tor’un `PROTOCOLINFO` yanıtında bildirdiği çerez yolunu okuyor ve istemci doğrulama hash’ini göndermeden önce sunucunun yanıtını doğruluyor.",
            "`SocksPort 9050`, `ControlPort 9051` ve `CookieAuthentication 1` ayarlarını yalnızca eksiklerse ekliyor. Çerez doğrulaması açıkça kapatılmışsa ya da mevcut bir port beklenen yerel portlarla çakışıyorsa, ayarı ezmek yerine yapılandırma duruyor.",
            "Tor açılışta etkinleştirilmiyor ve hider kapandığında Tor süreci çalışmaya devam ediyor; çünkü başka uygulamalar da bu servisi kullanıyor olabilir.",
          ],
        },
      },
      {
        id: "network",
        title: b("Network and data notes", "Ağ ve veri notları"),
        list: {
          en: [
            "The current egress IP is requested from `api.ipify.org`.",
            "Approximate location and ISP information comes from `ipinfo.io`, using the observed IP address.",
            "A configured proxy provider can observe traffic routed through its proxy.",
            "The local log may include network addresses and diagnostic metadata.",
            "Proxy-list credentials are secrets and are stored with restrictive permissions.",
            "Tor and proxies do not protect against application-level leaks, account identifiers, browser fingerprinting, malware or misconfigured applications; hider is not a system-wide anonymity or kill-switch solution.",
          ],
          tr: [
            "Mevcut çıkış IP’si `api.ipify.org` üzerinden sorgulanıyor.",
            "Yaklaşık konum ve İSS bilgisi, gözlenen IP adresiyle `ipinfo.io` üzerinden alınıyor.",
            "Yapılandırılmış bir proxy sağlayıcısı, kendi proxy’si üzerinden geçen trafiği görebilir.",
            "Yerel günlük ağ adresleri ve tanılama üst verisi içerebilir.",
            "Proxy listesindeki kimlik bilgileri gizli bilgi sayılıyor ve kısıtlı izinlerle saklanıyor.",
            "Tor ve proxy’ler uygulama düzeyindeki sızıntılara, hesap tanımlayıcılarına, tarayıcı parmak izine, zararlı yazılıma ya da yanlış yapılandırılmış uygulamalara karşı koruma sağlamıyor; hider sistem genelinde bir anonimlik ya da kill-switch çözümü değil.",
          ],
        },
      },
    ],
    responsible: {
      en: ["For privacy research, authorised network testing and systems you control, following applicable laws and provider terms."],
      tr: ["Gizlilik araştırması, yetkili ağ testleri ve kontrol ettiğin sistemler için; yürürlükteki yasalara ve sağlayıcı koşullarına uygun olarak."],
    },
    testing: {
      cmd: "python -m unittest discover -s tests -v",
      text: {
        en: ["GitHub Actions tests selected Tor control-authentication and configuration behaviour on Python 3.10, 3.11 and 3.12. The tests do not install packages, modify system configuration or contact Tor services."],
        tr: ["GitHub Actions seçili Tor kontrol doğrulaması ve yapılandırma davranışlarını Python 3.10, 3.11 ve 3.12’de test ediyor. Testler paket kurmuyor, sistem yapılandırmasını değiştirmiyor ve Tor servislerine bağlanmıyor."],
      },
    },
    troubleshooting: [
      { q: b("Tor control authentication fails", "Tor kontrol doğrulaması başarısız"), a: b("Check that the running Tor service exposes the expected local ports and that the process running hider can read the cookie file. Never solve it with `CookieAuthentication 0`.", "Çalışan Tor servisinin beklenen yerel portları açtığını ve hider’ı çalıştıran sürecin çerez dosyasını okuyabildiğini kontrol et. Sorunu asla `CookieAuthentication 0` ile çözme.") },
      { q: b("Tor setup is declined or fails", "Tor kurulumu reddedildi ya da başarısız"), a: b("Install and configure Tor manually with the operating system’s official packages, then run with `--no-install`.", "Tor’u işletim sisteminin resmî paketleriyle elle kurup yapılandır, ardından `--no-install` ile çalıştır.") },
      { q: b("Proxy list is rejected", "Proxy listesi reddedildi"), a: b("Confirm the file path, the one-proxy-per-line format, and that the listed endpoints are reachable and trusted.", "Dosya yolunu, satır başına bir proxy biçimini ve listedeki uç noktaların erişilebilir ve güvenilir olduğunu doğrula.") },
    ],
    tree: "hider/\n├── .github/\n│   └── workflows/\n│       └── tests.yml\n├── tests/\n│   └── test_hider.py\n├── hider.py\n├── installer.sh\n├── hider.service\n├── requirements.txt\n└── README.md",
    safeDefault: b("Asks before any package install or torrc change; never overrides conflicting Tor settings", "Paket kurmadan ya da torrc’yi değiştirmeden önce soruyor; çakışan Tor ayarlarını asla ezmiyor"),
    ci: true,
    facts: [
      { label: LANGUAGE, value: n("Python 3.8+") },
      { label: PLATFORMS, value: n("Linux · macOS · Windows") },
      { label: b("Backends", "Arka uçlar"), value: n("Tor · anonsurf · proxy") },
      { label: LICENSE, value: n("MIT") },
    ],
    caseStudy: true,
  },
  {
    slug: "anon-message",
    name: "anon-message",
    repo: gh("anon-message"),
    tagline: b(
      "Consent-first SMS notification CLI built with Python and Textbelt: dry-run by default, fails closed.",
      "Python ve Textbelt ile yazılmış, onay öncelikli SMS bildirim aracı: varsayılan olarak deneme modu, hata durumunda güvenli kapanış.",
    ),
    purpose: b(
      "anon-message sends individual, consent-based SMS notifications from the command line. It is designed to make the sending path explicit and easy to test without contacting the provider by default.",
      "anon-message komut satırından, onaya dayalı tekil SMS bildirimleri gönderiyor. Gönderim yolunu açık hâle getirmek ve varsayılan olarak sağlayıcıya bağlanmadan kolayca test edilebilmek için tasarlandı.",
    ),
    notices: [
      {
        title: b("This tool is not anonymous", "Bu araç anonim değil"),
        text: b(
          "When an SMS is explicitly sent, the recipient’s phone number and the message go to Textbelt. Use it only for recipients who have explicitly opted in, identify yourself accurately, honour opt-outs, and follow applicable laws and the provider’s Terms of Service.",
          "Bir SMS açıkça gönderildiğinde alıcının telefon numarası ve mesaj Textbelt’e iletiliyor. Yalnızca açıkça onay vermiş alıcılar için kullan, kimliğini doğru belirt, aboneliğini iptal edenlere uy ve yürürlükteki yasalarla sağlayıcının Hizmet Koşulları’na uy.",
        ),
      },
      {
        title: b("Guardrails, not proof", "Koruma önlemi, kanıt değil"),
        text: b(
          "Local consent lists and rate limits are guardrails, not proof of consent or a production abuse-prevention system. Limits are not shared across computers and may not be reliable on network filesystems. If the state exists but its key is missing, the tool fails closed.",
          "Yerel onay listeleri ve hız sınırları birer koruma önlemi; onay kanıtı ya da üretim düzeyinde bir kötüye kullanım önleme sistemi değil. Sınırlar bilgisayarlar arasında paylaşılmıyor ve ağ dosya sistemlerinde güvenilir olmayabilir. Durum dosyası varken anahtarı eksikse araç güvenli tarafta kalıp çalışmayı reddediyor.",
        ),
      },
    ],
    category: b("Secure tooling", "Güvenli araçlar"),
    languages: ["Python"],
    tech: ["Python 3.10+", "Textbelt API", "HMAC", "unittest", "GitHub Actions"],
    cmd: "python anon-message/m-anon-message.py --phone +12025550123 --message \"Test notification from Kaan DGN\"",
    capabilities: {
      en: [
        "Dry-run by default: no provider request is made unless `--send` is supplied.",
        "Local consent allowlist: a recipient must be listed in `consented_recipients.txt`.",
        "Conservative local rate limits: one attempt per recipient per rolling 24 hours, at most five attempts per rolling 24 hours, and at least 60 seconds between attempts.",
        "Environment-based API key: reads `TEXTBELT_API_KEY`; no key is stored in source code.",
        "Keyed recipient fingerprints: rate-limit state stores HMAC fingerprints rather than plain phone numbers.",
        "Local concurrency lock: serialises rate-limit reservations between simultaneous runs on the same host.",
        "Bounded HTTP behaviour: connect/read timeouts, redirects disabled, provider responses validated.",
        "Automated tests: provider calls are mocked; the suite never sends an SMS.",
      ],
      tr: [
        "Varsayılan olarak deneme modu: `--send` verilmedikçe sağlayıcıya hiçbir istek yapılmıyor.",
        "Yerel onay listesi: alıcının `consented_recipients.txt` içinde bulunması gerekiyor.",
        "Temkinli yerel hız sınırları: alıcı başına kayan 24 saatte bir deneme, kayan 24 saatte toplam en fazla beş deneme ve denemeler arasında en az 60 saniye.",
        "Ortam değişkeninden API anahtarı: `TEXTBELT_API_KEY` okunuyor; kaynak kodda hiçbir anahtar saklanmıyor.",
        "Anahtarlı alıcı parmak izleri: hız sınırı durumu düz telefon numarası yerine HMAC parmak izi saklıyor.",
        "Yerel eşzamanlılık kilidi: aynı makinedeki eşzamanlı çalıştırmalar arasında hız sınırı rezervasyonlarını sıraya koyuyor.",
        "Sınırlı HTTP davranışı: bağlantı/okuma zaman aşımları, kapalı yönlendirmeler, doğrulanan sağlayıcı yanıtları.",
        "Otomatik testler: sağlayıcı çağrıları taklit ediliyor; test paketi hiçbir zaman SMS göndermiyor.",
      ],
    },
    requirements: {
      en: ["Python 3.10 or newer", "Git", "A Textbelt API key for real sends", "Explicit opt-in from every recipient"],
      tr: ["Python 3.10 veya üzeri", "Git", "Gerçek gönderimler için bir Textbelt API anahtarı", "Her alıcıdan açık onay"],
    },
    quickstart: [
      {
        label: b("Install (Linux / macOS)", "Kurulum (Linux / macOS)"),
        code: "git clone https://github.com/kaandgnsh/anon-message.git\ncd anon-message\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install --upgrade pip\npython -m pip install -r requirements.txt",
      },
      {
        label: b("Install (Windows PowerShell)", "Kurulum (Windows PowerShell)"),
        shell: "powershell",
        code: "git clone https://github.com/kaandgnsh/anon-message.git\ncd anon-message\npy -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip\npython -m pip install -r requirements.txt",
      },
      {
        label: b("Configure recipient consent", "Alıcı onayını yapılandır"),
        code: "cp consented_recipients.example.txt consented_recipients.txt",
        note: b(
          "Add one international-format number per line (for example `+12025550123`) only after that person has explicitly agreed. The registry is an allowlist, not evidence of consent, and the real file is ignored by Git.",
          "Her satıra uluslararası biçimde bir numara ekle (örneğin `+12025550123`), ama yalnızca o kişi açıkça onay verdikten sonra. Bu liste bir izin listesi; onay kanıtı değil. Gerçek dosya Git tarafından yok sayılıyor.",
        ),
      },
      {
        label: b("Preview a message (dry run)", "Mesajı önizle (deneme modu)"),
        code: "python anon-message/m-anon-message.py \\\n  --phone +12025550123 \\\n  --message \"Test notification from Kaan DGN\"",
        note: b(
          "Validates the input and shows a preview. It does not contact Textbelt, send a message or create rate-limit state.",
          "Girdiyi doğruluyor ve önizleme gösteriyor. Textbelt’e bağlanmıyor, mesaj göndermiyor ve hız sınırı durumu oluşturmuyor.",
        ),
      },
      { label: b("Set the API key (Bash / Zsh)", "API anahtarını ayarla (Bash / Zsh)"), code: "export TEXTBELT_API_KEY=\"your_api_key\"" },
      { label: b("Set the API key (Fish)", "API anahtarını ayarla (Fish)"), shell: "fish", code: "set -x TEXTBELT_API_KEY \"your_api_key\"" },
      { label: b("Set the API key (PowerShell)", "API anahtarını ayarla (PowerShell)"), shell: "powershell", code: "$env:TEXTBELT_API_KEY = \"your_api_key\"" },
      {
        label: b("Send an SMS", "SMS gönder"),
        code: "python anon-message/m-anon-message.py \\\n  --phone +12025550123 \\\n  --message \"Test notification from Kaan DGN. Reply STOP to opt out.\" \\\n  --sender \"Kaan DGN\" \\\n  --send",
        note: b(
          "A successful API response means Textbelt accepted the request, not that it was delivered. The attempt is recorded before the network request, so a timeout still counts toward the limits; this prevents accidental duplicate sends from automatic retries.",
          "Başarılı bir API yanıtı, Textbelt’in isteği kabul ettiği anlamına geliyor; teslim edildiği anlamına gelmiyor. Deneme ağ isteğinden önce kaydediliyor, bu yüzden zaman aşımı da sınırlara sayılıyor; böylece otomatik yeniden denemeler yanlışlıkla mükerrer mesaj göndermiyor.",
        ),
      },
    ],
    responsible: {
      en: [
        "Explicit opt-in before sending; no unsolicited, deceptive, harassing, bulk or otherwise prohibited messages.",
        "Accurate sender identity, and clear opt-out wording such as “Reply STOP to opt out” for recurring messages.",
        "Phone numbers and message text leave the device only when a real send is requested.",
        "The HMAC key and rate-limit state are local files; they are protected and never deleted to bypass limits.",
        "The tool does not verify consent with the recipient or carrier, guarantee delivery, or replace legal and compliance review.",
      ],
      tr: [
        "Göndermeden önce açık onay; istenmeyen, aldatıcı, taciz edici, toplu ya da başka şekilde yasak mesaj yok.",
        "Doğru gönderen kimliği ve tekrarlayan mesajlarda “Reply STOP to opt out” gibi açık bir abonelikten çıkma ifadesi.",
        "Telefon numaraları ve mesaj metni cihazdan yalnızca gerçek bir gönderim istendiğinde çıkıyor.",
        "HMAC anahtarı ve hız sınırı durumu yerel dosyalar; korunuyorlar ve sınırları aşmak için asla silinmiyorlar.",
        "Araç onayı alıcı ya da operatörle doğrulamıyor, teslimatı garanti etmiyor ve hukuki ya da uyum incelemesinin yerini tutmuyor.",
      ],
    },
    testing: {
      cmd: "python -m unittest discover -s tests -v",
      text: {
        en: ["Tests use mocks and temporary files; they send no SMS and need no real API key. GitHub Actions runs the suite on Python 3.10, 3.11 and 3.12."],
        tr: ["Testler taklit nesneler ve geçici dosyalar kullanıyor; SMS göndermiyor ve gerçek API anahtarı istemiyor. GitHub Actions test paketini Python 3.10, 3.11 ve 3.12’de çalıştırıyor."],
      },
    },
    tree: "anon-message/\n├── .github/\n│   └── workflows/\n│       └── tests.yml\n├── anon-message/\n│   └── m-anon-message.py\n├── tests/\n│   └── test_anon_message.py\n├── consented_recipients.example.txt\n├── requirements.txt\n└── README.md",
    safeDefault: b("Dry-run unless `--send`; refuses to run if its state key is missing", "`--send` yoksa deneme modu; durum anahtarı eksikse çalışmayı reddediyor"),
    ci: true,
    facts: [
      { label: LANGUAGE, value: n("Python 3.10+") },
      { label: b("Provider", "Sağlayıcı"), value: n("Textbelt") },
      { label: b("Default mode", "Varsayılan mod"), value: b("Dry run", "Deneme modu") },
      { label: TESTS, value: CI_MATRIX },
    ],
    caseStudy: true,
  },
  {
    slug: "all-pip-installer",
    name: "all-pip-installer",
    repo: gh("all-pip-installer"),
    tagline: b(
      "Opt-in CLI for installing a curated set of common Python packages, with a dry run by default.",
      "Seçilmiş yaygın Python paketlerini kuran, varsayılan olarak deneme modunda çalışan onaylı CLI.",
    ),
    purpose: b(
      "all-pip-installer streamlines the setup of a small, predefined collection of third-party Python packages. It uses the active Python interpreter to invoke `pip`, offers a few practical package profiles and lets you add package names when needed.",
      "all-pip-installer önceden belirlenmiş küçük bir üçüncü taraf Python paketi koleksiyonunun kurulumunu kolaylaştırıyor. `pip`’i etkin Python yorumlayıcısıyla çağırıyor, birkaç pratik paket profili sunuyor ve gerektiğinde paket adı eklemene izin veriyor.",
    ),
    notices: [
      {
        title: b("Scope", "Kapsam"),
        text: b(
          "It does not and cannot install every package on PyPI: only the packages in the selected profile and any names you add. The default mode is a dry run; nothing is installed without `--install` and a confirmation.",
          "PyPI’daki her paketi kurmuyor, kuramaz da: yalnızca seçilen profildeki paketleri ve senin eklediğin adları kuruyor. Varsayılan mod deneme modu; `--install` ve onay olmadan hiçbir şey kurulmuyor.",
        ),
      },
    ],
    category: b("Automation", "Otomasyon"),
    languages: ["Python"],
    tech: ["Python 3.10+", "Standard library", "pip", "unittest", "GitHub Actions"],
    cmd: "python3 all-pip-installer/all-pip.py --profile web --install",
    capabilities: {
      en: [
        "Safe by default: previews the selected packages without installing them.",
        "Explicit confirmation: requires `--install` and a confirmation prompt before changing the environment.",
        "Curated profiles: basic, web, scraping, terminal, or all listed packages.",
        "Extra package names: add trusted PyPI names one at a time.",
        "Interpreter-aware: runs `python -m pip` with the current interpreter.",
        "No runtime dependencies: the installer itself uses the standard library.",
        "Tested CLI: unit tests run in GitHub Actions on Python 3.10, 3.11 and 3.12.",
      ],
      tr: [
        "Varsayılan olarak güvenli: seçilen paketleri kurmadan önizliyor.",
        "Açık onay: ortamı değiştirmeden önce `--install` ve bir onay istemi gerekiyor.",
        "Seçilmiş profiller: basic, web, scraping, terminal ya da listelenen bütün paketler.",
        "Ek paket adları: güvenilir PyPI adlarını tek tek ekleme.",
        "Yorumlayıcıya duyarlı: `python -m pip`’i mevcut yorumlayıcıyla çalıştırıyor.",
        "Çalışma zamanı bağımlılığı yok: kurucunun kendisi yalnızca standart kütüphaneyi kullanıyor.",
        "Test edilen CLI: birim testleri GitHub Actions’ta Python 3.10, 3.11 ve 3.12’de çalışıyor.",
      ],
    },
    requirements: {
      en: ["Python 3.10 or newer", "`pip` for the selected interpreter", "Internet access to download packages", "A virtual environment is recommended over a system-managed Python"],
      tr: ["Python 3.10 veya üzeri", "Seçilen yorumlayıcı için `pip`", "Paketleri indirmek için internet erişimi", "Sistem tarafından yönetilen Python yerine sanal ortam önerilir"],
    },
    quickstart: [
      { label: b("Check the environment", "Ortamı kontrol et"), code: "python3 --version\npython3 -m pip --version" },
      { label: b("Clone", "Klonla"), code: "git clone https://github.com/kaandgnsh/all-pip-installer.git\ncd all-pip-installer" },
      { label: b("List the profiles", "Profilleri listele"), code: "python3 all-pip-installer/all-pip.py --list" },
      { label: b("Preview the default profile (no changes)", "Varsayılan profili önizle (değişiklik yok)"), code: "python3 all-pip-installer/all-pip.py" },
      {
        label: b("Install a profile after review", "İnceledikten sonra bir profili kur"),
        code: "python3 all-pip-installer/all-pip.py --profile web --install\n\n# Skip the prompt explicitly\npython3 all-pip-installer/all-pip.py --profile terminal --install --yes",
      },
      {
        label: b("Add extra package names", "Ek paket adları ekle"),
        code: "python3 all-pip-installer/all-pip.py --profile basic --package pytest --package packaging",
        note: b(
          "Still a dry run until `--install` is added. Names are treated as plain PyPI names; URLs, shell commands and version specifiers are rejected.",
          "`--install` eklenene kadar hâlâ deneme modu. Adlar düz PyPI adı olarak işleniyor; URL’ler, kabuk komutları ve sürüm belirteçleri reddediliyor.",
        ),
      },
    ],
    tables: [
      {
        id: "profiles",
        title: b("Package profiles", "Paket profilleri"),
        cols: [b("Profile", "Profil"), b("Packages", "Paketler")],
        rows: [
          [n("`basic`"), n("`requests`, `colorama`, `rich`")],
          [n("`web`"), n("`requests`, `beautifulsoup4`")],
          [n("`scraping`"), n("`requests`, `beautifulsoup4`, `mechanize`")],
          [n("`terminal`"), n("`colorama`, `pyfiglet`, `rich`")],
          [n("`all`"), b("Every package in the profiles above", "Yukarıdaki profillerdeki bütün paketler")],
        ],
      },
    ],
    options: [
      { flag: "--profile NAME", desc: b("Select `basic`, `web`, `scraping`, `terminal` or `all`. Default: `basic`.", "`basic`, `web`, `scraping`, `terminal` ya da `all` seçer. Varsayılan: `basic`.") },
      { flag: "--package NAME", desc: b("Add a package name. May be repeated.", "Paket adı ekler. Tekrarlanabilir.") },
      { flag: "--list", desc: b("Print all profiles and their package lists.", "Bütün profilleri ve paket listelerini yazdırır.") },
      { flag: "--install", desc: b("Proceed to the installation confirmation; without it the command only previews the plan.", "Kurulum onayına geçer; olmadan komut yalnızca planı önizler.") },
      { flag: "--yes", desc: b("Skip confirmation; valid only with `--install`.", "Onayı atlar; yalnızca `--install` ile geçerli.") },
      { flag: "-h, --help", desc: b("Show help.", "Yardımı gösterir.") },
    ],
    responsible: {
      en: [
        "Read the package list before approving an installation.",
        "Install packages only from projects and maintainers you trust: third-party packages execute code in your Python environment.",
        "Prefer a virtual environment for project-specific dependencies.",
        "The script runs `sys.executable -m pip`; it does not create a virtual environment or elevate privileges.",
        "A successful pip exit code confirms the command completed, not that every installed package is safe or suitable.",
      ],
      tr: [
        "Bir kurulumu onaylamadan önce paket listesini oku.",
        "Yalnızca güvendiğin projelerden ve geliştiricilerden paket kur: üçüncü taraf paketler Python ortamında kod çalıştırır.",
        "Projeye özel bağımlılıklar için sanal ortam tercih et.",
        "Betik `sys.executable -m pip` çalıştırıyor; sanal ortam oluşturmuyor ve yetki yükseltmiyor.",
        "pip’in başarılı çıkış kodu komutun tamamlandığını gösteriyor; kurulan her paketin güvenli ya da uygun olduğunu değil.",
      ],
    },
    testing: {
      cmd: "python3 -m unittest discover -s tests -v",
      text: {
        en: ["The suite checks profile selection, de-duplication, dry-run behaviour, confirmation, invalid package names and pip error handling."],
        tr: ["Test paketi profil seçimini, yinelenenlerin ayıklanmasını, deneme modu davranışını, onayı, geçersiz paket adlarını ve pip hata yönetimini kontrol ediyor."],
      },
    },
    tree: "all-pip-installer/\n├── .github/\n│   └── workflows/\n│       └── tests.yml\n├── all-pip-installer/\n│   └── all-pip.py\n├── tests/\n│   └── test_installer.py\n├── .gitignore\n└── README.md",
    safeDefault: b("Dry-run by default; `--install` plus a confirmation to change anything", "Varsayılan olarak deneme modu; bir şeyi değiştirmek için `--install` ve onay"),
    ci: true,
    facts: [
      { label: LANGUAGE, value: n("Python 3.10+") },
      { label: b("Dependencies", "Bağımlılık"), value: b("None (standard library)", "Yok (standart kütüphane)") },
      { label: b("Default mode", "Varsayılan mod"), value: b("Dry run", "Deneme modu") },
      { label: TESTS, value: CI_MATRIX },
    ],
    caseStudy: true,
  },
  {
    slug: "m-info-get",
    // No public repository on GitHub (checked 2026-10-16), so it stays off the site.
    hidden: true,
    name: "m-info-get",
    repo: gh("m-info-get"),
    tagline: {
      en: "Multi-threaded OSINT utility for phone number and username lookups.",
      tr: "Telefon numarası ve kullanıcı adı sorguları için çok iş parçacıklı OSINT aracı.",
    },
    purpose: {
      en: "A reconnaissance utility that runs open-source intelligence lookups in parallel, so a full run finishes quickly.",
      tr: "Açık kaynak istihbaratı sorgularını paralel çalıştıran bir keşif aracı; tam bir tarama bu sayede hızlı tamamlanıyor.",
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
    // No public repository on GitHub (checked 2026-10-16), so it stays off the site.
    hidden: true,
    name: "m-finder",
    repo: gh("m-finder"),
    tagline: {
      en: "Command-line tool for discovering a site’s administration pages.",
      tr: "Bir sitenin yönetim sayfalarını tespit eden komut satırı aracı.",
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
    // No public repository on GitHub (checked 2026-10-16), so it stays off the site.
    hidden: true,
    name: "m-copy",
    repo: gh("m-copy"),
    tagline: {
      en: "Saves a web page’s source to a file under a name you choose.",
      tr: "Bir web sayfasının kaynağını seçtiğin isimle dosyaya kaydeder.",
    },
    purpose: {
      en: "Saves the HTML source of a page for inspection: give it a link, name the file and optionally choose where to save it.",
      tr: "Bir sayfanın HTML kaynağını incelemek için kaydeder: bir link ver, dosyayı adlandır, istersen kayıt yerini seç.",
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
];
