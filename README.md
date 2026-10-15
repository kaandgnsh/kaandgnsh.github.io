# Kaan Doğan — kişisel site

Sıcak bej ve şişe yeşili üzerine kurulu, açık/koyu temalı, iki dilli (EN/TR) kişisel site. Bağımlılıksız statik yapı: içerik TypeScript dosyalarında, sayfalar derlenince düz HTML olur. Sunucu, veritabanı ve GitHub gerekmez.

## 1. Gereksinim

**Node.js 22.18 veya üstü** (https://nodejs.org adresinden LTS sürümünü kur).
Kontrol: terminalde `node -v` yaz; `v22.18.0` ya da daha yüksek görmelisin.

## 2. VS Code'da çalıştırma

1. VS Code'da **File → Open Folder** ile bu klasörü aç.
2. Bir kez terminal aç (**Terminal → New Terminal**) ve şunu yaz:
   ```bash
   npm install
   ```
   Bu yalnızca geliştirme araçlarını (TypeScript, ESLint) kurar. Site çalışmak için buna ihtiyaç duymaz.
3. Siteyi başlat, üç yoldan biri:
   - **`Ctrl+Shift+B`** (Mac: `Cmd+Shift+B`) → "Siteyi çalıştır (dev)"
   - **`F5`** → siteyi başlatır ve Chrome'da açar
   - Terminalde `npm run dev`
4. Tarayıcıda **http://localhost:4173** adresini aç.

`src/` veya `public/` içinde bir dosyayı kaydettiğinde site kendiliğinden yeniden derlenir. Sayfayı yenilemen yeterli. Durdurmak için terminalde `Ctrl+C`.

## 3. Komutlar

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | Derler, `localhost:4173`'te sunar, değişince yeniden derler |
| `npm run build` | Yayınlanacak dosyaları `dist/` klasörüne üretir |
| `npm run start` | `dist/` klasörünü yerelde sunar |
| `npm run typecheck` | TypeScript hata denetimi |
| `npm run lint` | ESLint |
| `npm run check` | Hepsi: lint + tip denetimi + derleme |
| `npm run import:linkedin -- Certifications.csv` | LinkedIn sertifikalarını içe aktarır (aşağıya bak) |

## 4. Neyi nereden düzenlerim

Bileşenlere dokunmana gerek yok. Kişisel her şey `src/data/` ve `src/i18n/` içinde:

| Dosya | İçerik |
| --- | --- |
| `src/data/site.ts` | Ad, e-posta, bağlantılar, giriş cümlesi, hakkımda metni, `openToInternship` (staja açığım satırı), `photo`, `cv`, `showRepoLinks`, `showGithubSection` |
| `src/data/projects.ts` | Projeler. Her biri iki dilli. `caseStudy: true` ise kendi sayfası olur, `hidden: true` ise gizlenir |
| `src/data/posts.ts` | Eski notlar. Sitede blog bölümü yok; tüm yazılar `draft: true` ile kapalı tutuluyor |
| `src/data/skills.ts` | Kullandıkların ve güvenlik ilgi alanların |
| `src/data/credentials.ts` | Elle yazılan sertifikalar |
| `src/i18n/ui.ts` | Sitedeki bütün arayüz metinleri, EN ve TR |
| `src/styles/main.css` | Renkler ve boyutlar. Bütün renkler en üstteki `:root` bloğunda bir kez tanımlanır (`light-dark(açık, koyu)`); başka yerde hex renk yazma |

Her metin `{ en: "…", tr: "…" }` biçimindedir. İkisini de doldur.

### Fotoğraf (eklendi)
Fotoğraf `public/kaan.jpg` olarak eklendi ve `src/data/site.ts` içindeki `photo` alanına bağlı (Hakkımda bölümünde görünür). Değiştirmek için dosyanın üstüne aynı adla yaz (4:5 dikey oran en iyisidir). Sitede her yerde aynı fotoğraf kullanılır.

### Proje görseli
Dosyaları `public/projects/<proje-adı>/` içine koy, sonra projeye ekle:
```ts
images: [{ src: "projects/m-finder/cover.png", alt: { en: "Terminal output", tr: "Terminal çıktısı" } }],
```
Görsel bölümü yalnızca görsel varsa görünür.

### Proje sayfasına "neden yaptım" bölümü
Projeye `why`, `challenges`, `learned` alanlarını ekle. Dolu olanlar sayfada kendiliğinden görünür.

### Özgeçmiş (CV)
`cv` alanı `null` olduğu için sitede hiç CV bağlantısı yoktur. Gerçek bir PDF hazırlarsan `public/` içine koyup `src/data/site.ts` içindeki yorumdaki örneğe göre doldur.

### LinkedIn sertifikaları
LinkedIn otomatik okumaya izin vermediği için kendi veri dışa aktarımını kullanırız:
1. LinkedIn → **Ayarlar → Veri gizliliği → Verilerinin bir kopyasını al** → **Certifications** seç → indir.
2. Terminalde: `npm run import:linkedin -- Certifications.csv`
3. `src/data/credentials.generated.ts` oluşur. Kategorileri kontrol et.

Sertifika yoksa menüde ve sayfada "Sertifikalar" görünmez.

## 5. Site özellikleri

- **Dil:** İlk ziyarette tarayıcı diline göre otomatik (Türkçe → `/tr/`). Sağ üstteki EN/TR ile değiştirilir, seçim hatırlanır.
- **Tema:** Sistem temasını izler; sağ üstteki düğmeyle sistem → açık → koyu arasında geçilir.
- **Komut paleti:** `Ctrl+K` (Mac: `Cmd+K`).
- **Mobil:** Alt çubuk ve tam ekran menü.

## 6. Yayınlama (GitHub'sız)

1. `npm run build`
2. Oluşan **`dist/`** klasörünü doğrudan yükle:
   - **Cloudflare Pages** → Create → *Upload assets* (Direct Upload)
   - **Netlify** → *Deploy manually* / Netlify Drop (https://app.netlify.com/drop)
   - ya da herhangi bir statik barındırma
3. `dist/` içindeki `_headers` dosyası (Cloudflare Pages ve Netlify) güvenlik başlıklarını otomatik uygular. `vercel.json` Vercel içindir.

### Domain bağlayınca
`SITE_URL` ortam değişkenini ayarlayıp yeniden derle. Böylece canonical bağlantılar, `sitemap.xml`, RSS ve sosyal önizleme adresleri doğru üretilir.
```bash
# macOS / Linux
SITE_URL=https://kaandogan.dev npm run build
# Windows PowerShell
$env:SITE_URL="https://kaandogan.dev"; npm run build
```
Domain önerileri: `kaandogan.dev` (öncelik), `kaandogan.me`, `kaandgn.dev`. Satın alma ve DNS ayarı sende.

## 7. Sorun giderme

| Sorun | Çözüm |
| --- | --- |
| `node: command not found` / sürüm düşük | Node.js 22.18+ kur, VS Code'u kapatıp aç |
| `Port 4173 in use` | Başka bir terminal siteyi çalıştırıyor; onu `Ctrl+C` ile kapat. Ya da `PORT=4180 npm run dev` |
| `ExperimentalWarning: stripTypeScriptTypes` | Zararsız, Node'un bilgi mesajı |
| Değişiklik görünmüyor | Dosyayı kaydet, sayfayı `Ctrl+F5` ile yenile |
| Chrome F5 ile açılmıyor | Önce `Ctrl+Shift+B` ile siteyi başlat, sonra tarayıcıda `localhost:4173`'ü elle aç |

## 8. Klasör yapısı

```
src/
  data/       içerik (site, projeler, notlar, beceriler, sertifikalar)
  i18n/       arayüz metinleri EN/TR
  render/     sayfaları HTML'e çeviren fonksiyonlar
  client/     tarayıcıda çalışan küçük betikler (tema, dil, komut paleti)
  styles/     main.css
public/       fontlar, ikonlar, paylaşım görselleri, _headers
scripts/      build / serve / dev / LinkedIn içe aktarma / og.html (paylaşım görseli şablonu)
dist/         derleme çıktısı (yayınlanan klasör)
.vscode/      VS Code görevleri ve F5 ayarı
```

## Lisans notu
Yazı tipleri SIL Open Font License 1.1 ile dağıtılır ve `public/fonts` içinde Latin + Türkçe karakterlere indirgenmiş değişken WOFF2 olarak bulunur: Newsreader (Production Type), Inter (The Inter Project Authors), JetBrains Mono (JetBrains).
