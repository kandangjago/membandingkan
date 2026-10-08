# Membandingkan Tata Tulis Aksara Jawa

Aplikasi web sederhana untuk membandingkan hasil transliterasi Latin → Aksara Jawa dari berbagai paugeran tata tulis secara real-time. Dibuat untuk membantu pembelajar, pengajar, dan pegiat Aksara Jawa memahami perbedaan antar sistem penulisan.

> **Live Demo:** `https://username.github.io/nama-repo/` *(ganti dengan URL GitHub Pages kamu)*

[License](https://img.shields.io/badge/license-MIT-blue)
[HTML5](https://img.shields.io/badge/built%20with-HTML%2FCSS%2FJS-orange)
[Aksara Jawa](https://img.shields.io/badge/Aksara-Jawa-red)

---

## ✨ Fitur Utama

- **Input Latin Sekali, Hasil 5 Paugeran Sekaligus:** Ketik latin, langsung keluar aksara untuk semua sistem.
- **Transliterasi Lengkap:** Setiap paugeran menampilkan 3 output:
  - `Aksara Jawa` - dengan font Ngayogyan / Ngayogyann
  - `JGST` (Javanese General System of Transliteration) - warna merah
  - `IPA` (International Phonetic Alphabet) - warna hijau
- **Interaktif:** 
  - Tombol clear (X) di dalam textarea
  - Slider **Ukuran Aksara** (1rem - 4rem)
  - Slider **Jarak Spasi Vertikal** (1 - 3)
- **Deteksi Cerdas Aksara Rekan:**
  - Otomatis mendeteksi penggunaan aksara rekan khusus seperti `f, v, z, kh, sy` dll
  - Memberikan peringatan `⚠️ Katrangan: aksara rekan (꦳...) ora dikenal ing Paugeran...` untuk paugeran yang tidak mengenalnya (KBJ, Sriwedari, Cara Kawi)
  - Highlight merah untuk karakter tersebut
- **Dukungan Sastra Lampah:** Penanganan khusus untuk Tradisional & Cara Kawi (Mardi Kawi) - menghilangkan `h` di awal jika sesuai kaidah sastra lampah
- **100% Client-Side:** Tidak butuh backend, berjalan sepenuhnya di browser. Cocok untuk GitHub Pages.

## 📜 5 Paugeran yang Dibandingkan

Aplikasi ini memuat 5 modul transliterasi terpisah:

| # | Paugeran | File | Font | Karakteristik |
|---|----------|------|------|---------------|
| 1 | **KBJ** | `kbj.js` | Ngayogyann | Kongres Bahasa Jawa. Paugeran paling umum diajarkan saat ini |
| 2 | **Sriwedari** | `sriwedari.js` | Ngayogyann | Hasil Kongres Sriwedari, mempertahankan banyak tradisi |
| 3 | **Simplified** | `simplified.js` | Ngayogyan | Penyederhanaan untuk kemudahan belajar |
| 4 | **Tradisional** | `tradisional.js` | Ngayogyan | Gaya tradisional / Kawi, mendukung Sastra Lampah |
| 5 | **Cara Kawi (Mardi Kawi)** | `carakawi.js` | Ngayogyan | Untuk penulisan Jawa Kuno / Kawi |

> Modul `kbj.js`, `sriwedari.js`, `simplified.js` menggunakan fungsi `transliterasiKalimat()`  
> Modul `tradisional.js`, `carakawi.js` menggunakan fungsi `transliterateKawi()`

## 🔤 JGST & IPA

- **JGST:** Sistem transliterasi latin baku untuk Aksara Jawa, dirender dengan font **Gentium Plus**
- **IPA:** Pelafalan fonetik akurat dari hasil JGST, juga dengan Gentium Plus
- Proses: `Latin → Aksara Jawa → JGST → IPA` (via `jgst.js` dan `ipa.js`)

## 📁 Struktur Project

Pastikan semua file ini ada di root repo untuk GitHub Pages:

```
/ (root)
├── index.html          # File utama aplikasi ini
├── kbj.js              # Modul transliterasi KBJ
├── sriwedari.js        # Modul transliterasi Sriwedari
├── simplified.js       # Modul transliterasi Simplified
├── tradisional.js      # Modul transliterasi Tradisional
├── carakawi.js         # Modul transliterasi Cara Kawi
├── jgst.js             # Converter Aksara -> JGST
├── ipa.js              # Converter JGST -> IPA
├── ngayogyann.ttf      # Font Ngayogyann (untuk KBJ, Sriwedari)
├── ngayogyan.ttf       # Font Ngayogyan (untuk Simplified, Tradisional, Kawi)
└── README.md           # Dokumentasi ini
```

> Font `Gentium Plus` diload otomatis dari Google Fonts.

## 🚀 Cara Menjalankan Lokal

Tidak perlu build step.

```bash
# 1. Clone repo
git clone https://github.com/username/nama-repo.git
cd nama-repo

# 2. Jalankan dengan live server (pilih salah satu)
# Python:
python -m http.server 8000
# atau pakai VS Code Live Server extension

# 3. Buka http://localhost:8000
```

## 🌐 Deploy ke GitHub Pages

1. Buat repo baru di GitHub, misal `aksara-jawa-compare`
2. Push semua file (index.html, *.js, *.ttf, README.md) ke branch `main`
3. Di GitHub: **Settings > Pages**
4. Source: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`
5. Save. Tunggu 1-2 menit, situs akan live di `https://username.github.io/aksara-jawa-compare/`

## 💡 Cara Pakai

1. Ketik teks latin di kolom **Huruf Latin** (contoh: `aku mangan sega`)
2. Hasil 5 paugeran akan muncul otomatis di kartu di bawah
3. Atur kenyamanan baca lewat slider ukuran dan spasi
4. Perhatikan badge peringatan merah jika kamu mengetik huruf asing (f, v, z, dll)

Contoh input untuk uji rekan:
```
televisi, foto, dzikir, khusnul
```

## 🛠️ Teknologi

- HTML5, CSS3 (Grid, CSS Variables), Vanilla JavaScript
- Font: `Ngayogyan`, `Ngayogyann`, `Gentium Plus`
- Arsitektur modular: `loadScriptAsModule()` dengan sandboxing aman untuk load 5 sistem transliterasi yang berbeda

## 🗺️ Roadmap / Ide Pengembangan

- [ ] Tombol copy untuk setiap output aksara
- [ ] Mode gelap / terang
- [ ] Export hasil sebagai PNG / PDF
- [ ] Perbandingan side-by-side dengan tabel
- [ ] Penjelasan kaidah tiap paugeran (tooltip)

## 🤝 Kontribusi

Kontribusi sangat terbuka! 

1. Fork repo ini
2. Buat branch baru `fitur-baru`
3. Commit & push
4. Buat Pull Request

Jika menemukan bug transliterasi, sertakan: input latin, output yang salah, dan output yang diharapkan menurut paugeran tersebut.

## 📄 Lisensi

MIT License - bebas dipakai untuk pendidikan, pengembangan, dan pelestarian Aksara Jawa.

## 🙏 Kredit

- Pembuat font Ngayogyan & Ngayogyann
- Tim pengembang modul transliterasi KBJ, Sriwedari, dll
- Komunitas pelestari Aksara Jawa di Yogyakarta

---

> **Monggo uri-uri Aksara Jawa!** Jika project ini membantu, jangan lupa kasih ⭐ di GitHub.
