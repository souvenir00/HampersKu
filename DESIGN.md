# DESIGN.md --- Corporate Gift Website

**Versi:** 1.0\
**Tanggal:** 20 Oktober 2026\
**Arah visual:** premium, minimal, hangat, profesional B2B\
**Palet:** putih + cokelat

## 1. Prinsip Desain

1.  Produk dan foto proyek menjadi fokus utama.
2.  Tampilan elegan melalui ruang kosong, tipografi, grid, dan foto yang
    konsisten---bukan ornamen berlebihan.
3.  CTA WhatsApp selalu mudah ditemukan, tetapi tidak mengganggu isi.
4.  Semua komponen harus responsif dan nyaman digunakan dengan keyboard
    maupun sentuhan.
5.  Gunakan Bootstrap CSS sebagai fondasi layout; seluruh identitas
    visual diatur melalui CSS kustom.
6.  Jangan mengarang foto, logo klien, testimoni, angka pengalaman, atau
    klaim layanan. Gunakan placeholder yang jelas selama pengembangan.

## 2. Design Tokens

``` css
:root {
  --cg-white: #FFFFFF;
  --cg-bg-soft: #F7F4F0;
  --cg-brown: #5A3825;
  --cg-brown-dark: #352319;
  --cg-brown-light: #8B684E;
  --cg-tan: #C9A987;
  --cg-border: #E8E0D8;
  --cg-text: #211A16;
  --cg-text-muted: #6F655E;
  --cg-success: #246B45;

  --cg-font-sans: Inter, "Segoe UI", system-ui, -apple-system,
                  BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
  --cg-container-max: 1200px;
  --cg-radius-sm: 8px;
  --cg-radius-md: 14px;
  --cg-radius-lg: 22px;
  --cg-shadow-card: 0 8px 28px rgba(53, 35, 25, 0.07);
  --cg-shadow-nav: 0 4px 18px rgba(53, 35, 25, 0.06);
  --cg-section-space: clamp(64px, 8vw, 112px);
}
```

### Aturan warna

-   Putih untuk background utama.
-   `--cg-bg-soft` untuk selang-seling section, area testimonial, atau
    blok CTA.
-   Cokelat gelap untuk teks/heading dan footer.
-   Cokelat utama untuk tombol utama, link penting, dan elemen brand.
-   Tan dipakai sebagai aksen kecil, garis, atau detail---jangan untuk
    teks kecil di atas putih jika kontrasnya rendah.
-   Tombol cokelat harus memakai teks putih dengan kontras tinggi.
-   Hindari terlalu banyak gradasi, efek glossy, border emas, dan shadow
    tebal.

## 3. Tipografi

-   Font utama: Inter bila tersedia; fallback system sans-serif.
-   Body: 16--18 px, line-height 1.6--1.75.
-   H1 desktop: clamp(2.5rem, 5vw, 4.5rem), line-height 1.05--1.15.
-   H1 mobile: clamp(2.1rem, 9vw, 3rem).
-   H2: clamp(1.8rem, 3vw, 2.75rem).
-   H3: 1.2--1.5rem.
-   Eyebrow/label: 0.75--0.875rem, uppercase opsional, letter spacing
    moderat.
-   Hindari seluruh teks menggunakan uppercase.
-   Paragraf panjang dibatasi sekitar 65--75 karakter per baris untuk
    keterbacaan.

## 4. Grid dan Spacing

-   Gunakan `.container` Bootstrap dengan gutter yang konsisten.
-   Lebar konten maksimum visual sekitar 1200 px.
-   Spacing mengikuti skala 4/8 px.
-   Section desktop: 80--112 px vertikal.
-   Section tablet: 64--80 px.
-   Section mobile: 52--68 px.
-   Gunakan grid Bootstrap (`row`, `col-lg-*`, `col-md-*`) dan
    breakpoint bawaan.
-   Hindari layout yang bergantung pada tinggi viewport tetap; hero
    boleh memakai `min-height`, bukan hard-coded height yang memotong
    konten.

## 5. Navbar

### Desktop

-   Tinggi visual sekitar 76--88 px.
-   Logo di kiri, navigasi di tengah/kanan, CTA di ujung kanan.
-   Background putih dengan border bawah halus.
-   Item: **Beranda**, **Tentang**, **Paket ▾**, **Portofolio**,
    **Blog**.
-   CTA: "Konsultasi" atau "Hubungi Kami".
-   Dropdown Paket berupa panel putih, radius 12--16 px, shadow ringan,
    link memiliki hover/focus state jelas.

### Mobile

-   Tinggi sekitar 68--76 px.
-   Logo/nama brand dan tombol hamburger tidak bertabrakan.
-   Navigasi menjadi panel vertikal yang mudah ditap.
-   Dropdown paket terbuka melalui tap, bukan hover saja.
-   Setelah pengguna memilih link, panel ditutup.
-   Jangan menonaktifkan outline keyboard tanpa pengganti yang terlihat.

### Perilaku

-   Navbar boleh sticky jika tidak menutupi anchor target.
-   Jika navbar fixed/sticky, gunakan `scroll-margin-top` untuk heading
    target.
-   State hover, focus-visible, active, dan expanded harus terlihat.
-   `aria-expanded` dan `aria-controls` disinkronkan untuk menu yang
    dibuat dengan JS.

## 6. Hero Beranda

### Layout

-   Desktop: dua kolom 55/45 atau 52/48; teks di kiri dan foto
    produk/paket asli di kanan.
-   Mobile: teks dahulu, visual setelah CTA; jangan memaksa foto menjadi
    terlalu kecil.
-   Background putih; elemen dekoratif maksimal berupa bidang cokelat
    muda atau garis tipis.
-   Foto harus memiliki grounding/shadow alami, perspektif benar, dan
    produk tetap akurat.

### Konten

-   Eyebrow: "CORPORATE GIFT & SOUVENIR PERUSAHAAN"
-   H1 contoh: "Corporate Gift Custom untuk Momen yang Berarti"
-   Deskripsi: jelaskan layanan, personalisasi, dan target bisnis dalam
    1--2 kalimat faktual.
-   CTA primer: "Konsultasi via WhatsApp"
-   CTA sekunder: "Lihat Portofolio"
-   Microcopy opsional: "Ceritakan kebutuhan, jumlah, dan tanggal acara
    Anda."
-   Hanya tampilkan klaim seperti "free design", MOQ tertentu, atau
    jumlah klien jika telah diverifikasi.

## 7. Tombol

### Primary

-   Background `--cg-brown`, teks putih.
-   Padding sekitar 14--16 px vertikal dan 20--24 px horizontal.
-   Radius 8--10 px.
-   Hover: cokelat gelap, tidak memakai animasi besar.

### Secondary

-   Background putih, border 1 px `--cg-border` atau `--cg-brown`.
-   Teks cokelat gelap.
-   Hover: background `--cg-bg-soft`.

### WhatsApp

-   CTA WhatsApp utama boleh memakai cokelat brand; ikon WhatsApp hanya
    jika menggunakan ikon resmi/ikon yang lisensinya sesuai.
-   Floating WhatsApp button opsional di mobile/desktop. Pastikan tidak
    menutupi tombol form, cookie banner, atau konten.
-   Link: `https://wa.me/6282131087971`.
-   Gunakan `aria-label` yang menjelaskan tujuan, misalnya "Konsultasi
    corporate gift melalui WhatsApp".

## 8. Paket / Kartu Produk

-   Grid 3 kolom desktop, 2 kolom tablet, 1--2 kolom mobile sesuai lebar
    dan kepadatan konten.
-   Rasio foto konsisten, misalnya 4:3 atau 1:1 sesuai katalog.
-   Background putih, border tipis, radius 14--18 px.
-   Hindari zoom berlebihan, tilt, atau hover yang mengubah ukuran grid.
-   Isi kartu:
    1.  Foto produk/paket.
    2.  Nama kategori.
    3.  Ringkasan kebutuhan yang cocok.
    4.  Detail custom utama jika benar.
    5.  Link "Lihat detail" atau CTA kontekstual.
-   Tinggi kartu dibuat konsisten sebisa mungkin, tetapi teks tidak
    boleh dipotong.

## 9. Portofolio

-   Grid editorial dengan foto besar dan variasi layout yang terkontrol.
-   Jangan gunakan masonry kompleks jika menambah beban atau mengacaukan
    urutan baca.
-   Setiap item mempunyai judul, kategori, dan konteks proyek singkat.
-   Jika klien tidak mengizinkan nama/logo, gunakan deskripsi kategori
    tanpa mengidentifikasi klien.
-   Detail proyek memakai pola: kebutuhan → solusi → pilihan produk →
    personalisasi → hasil terverifikasi.
-   Filter kategori opsional; semua proyek penting tetap memiliki tautan
    yang dapat dirayapi.

## 10. Bagian Tentang

-   Layout dua kolom: cerita bisnis dan foto proses/produk.
-   Tampilkan prinsip layanan atau proses kerja sebagai daftar ringkas.
-   Hindari angka statistik dekoratif yang tidak punya sumber.
-   Timeline perusahaan hanya bila tanggalnya valid.
-   CTA diarahkan ke halaman paket atau WhatsApp.

## 11. Blog

-   Arsip: satu artikel unggulan dan grid artikel berikutnya, atau grid
    konsisten.
-   Thumbnail dengan rasio konsisten 16:9.
-   Metadata ringkas: kategori, tanggal yang benar, waktu baca jika
    dihitung secara konsisten.
-   Halaman artikel: lebar teks 680--780 px, daftar isi bila panjang,
    heading mudah dipindai, gambar dengan caption jika membantu.
-   CTA kontekstual setelah bagian yang relevan dan di akhir artikel.
-   Sidebar tidak wajib; pada mobile, konten utama lebih dulu.

## 12. CTA Penutup dan Footer

### CTA penutup

-   Background `--cg-bg-soft` atau cokelat gelap.
-   Headline singkat, satu kalimat pendukung, satu CTA utama.
-   Berikan prompt yang jelas: kirim jenis produk, jumlah, tanggal
    acara, dan kota tujuan.

### Footer

-   Background `--cg-brown-dark`, teks putih/putih redup.
-   Kolom: ringkasan brand, navigasi, kategori paket, kontak.
-   Link kebijakan privasi.
-   Social links hanya untuk akun resmi.
-   Copyright tahun dapat dihasilkan dinamis jika sesuai platform.
-   Jangan menampilkan alamat atau jam operasional sebelum diverifikasi.

## 13. Formulir Konsultasi

Field minimal: - Nama (wajib jika memang diperlukan). - Nama perusahaan
(opsional). - Email/nomor kontak alternatif (opsional). - Jenis
kebutuhan (select). - Perkiraan jumlah. - Tanggal dibutuhkan. - Kota
pengiriman. - Detail brief. - Checkbox persetujuan privasi bila relevan.

Form harus memiliki label eksplisit, pesan error teks, status
sukses/gagal, dan proteksi spam jika ada backend. Jangan mengklaim form
terkirim sebelum server mengonfirmasi.

## 14. Responsive Behavior

-   Mobile: 320--575 px.
-   Tablet: 576--991 px.
-   Desktop: 992 px ke atas.
-   Layar lebar: jaga lebar konten dan panjang baris.
-   Tidak ada overflow horizontal.
-   CTA tidak keluar layar.
-   Dropdown dapat diakses dengan sentuhan.
-   Foto memakai `width: 100%; height: auto;` atau container rasio yang
    sesuai.
-   Uji setidaknya pada 360 px, 390 px, 768 px, 1024 px, dan 1440 px.

## 15. Motion dan Interaction

-   Transisi warna/border 150--220 ms.
-   Animasi masuk tidak diperlukan untuk konten utama; bila dipakai,
    jangan menyembunyikan konten sampai JS berjalan.
-   Hormati `prefers-reduced-motion: reduce`.
-   Hindari parallax, autoplay carousel, cursor custom, dan efek yang
    mengganggu fokus.
-   Jangan menggunakan `-webkit-tap-highlight-color: transparent`
    kecuali state fokus/aktif tetap jelas dan aksesibel.

## 16. Accessibility

-   Struktur landmark: `header`, `nav`, `main`, `section`, `footer`.
-   Tambahkan skip link ke konten utama.
-   Hanya satu H1 utama per halaman.
-   Alt gambar informatif; gambar dekoratif menggunakan `alt=""`.
-   Kontras teks normal minimal 4.5:1 dan teks besar minimal 3:1 sebagai
    target WCAG AA.
-   Fokus keyboard terlihat.
-   Menu/dropdown berfungsi tanpa mouse.
-   Ikon dekoratif disembunyikan dari pembaca layar; ikon fungsional
    punya nama aksesibel.
-   Jangan menyampaikan status hanya melalui warna.
-   Uji zoom 200%, keyboard-only, dan form error.

## 17. Gambar dan Art Direction

-   Utamakan foto asli produk dan proyek.
-   Warna dan material produk harus akurat; jangan mengganti logo atau
    teks.
-   Gunakan cahaya lembut, bayangan kontak realistis, dan latar yang
    tidak lebih dominan daripada produk.
-   Siapkan gambar responsif WebP/AVIF bila pipeline mendukung, dengan
    fallback yang sesuai.
-   Berikan ukuran gambar eksplisit agar layout tidak bergeser.
-   Jangan lazy-load hero/LCP image; lazy-load gambar di bawah fold.
-   Nama file deskriptif, misalnya `paket-seminar-kit-custom.webp`.
-   Alt menjelaskan objek dan konteks, bukan menumpuk keyword.

## 18. Front-end Structure

``` text
/
├── index.html
├── tentang.html
├── paket/
│   ├── index.html
│   ├── corporate-gift.html
│   ├── seminar-kit.html
│   └── custom.html
├── portofolio/
│   └── index.html
├── blog/
│   ├── index.html
│   └── artikel-contoh.html
├── kontak.html
├── kebijakan-privasi.html
├── 404.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    ├── images/
    └── icons/
```

Struktur ini ilustratif. Jika menggunakan CMS, ikuti struktur URL CMS
dan pastikan canonical, sitemap, metadata, dan schema bisa dikendalikan.

## 19. CSS dan Bootstrap Rules

-   Import Bootstrap CSS versi stabil yang telah dipin; load `style.css`
    setelah Bootstrap.
-   Gunakan utility Bootstrap untuk grid/spacing bila membantu, tetapi
    simpan token brand dan komponen khusus di CSS sendiri.
-   Hindari menimpa semua kelas Bootstrap secara global.
-   Gunakan class prefix seperti `.cg-` untuk komponen khusus:
    `.cg-navbar`, `.cg-hero`, `.cg-package-card`, `.cg-portfolio-card`,
    `.cg-cta`.
-   Jangan memuat seluruh Bootstrap JS jika hanya satu interaksi
    sederhana yang diperlukan.
-   Jangan menggunakan inline style berulang untuk desain utama.
-   Hindari `!important` kecuali untuk kasus terukur dan terdokumentasi.

## 20. SEO UI Requirements

-   Metadata unik per URL berada di `<head>`.
-   Open Graph dan Twitter Card memakai URL gambar absolut.
-   Canonical memakai URL final HTTPS.
-   Schema JSON-LD harus cocok dengan teks dan gambar yang terlihat.
-   Breadcrumb tampil secara visual pada halaman dalam jika membantu
    navigasi.
-   Link internal memakai anchor deskriptif.
-   Jangan menambahkan FAQ schema hanya demi mengejar FAQ rich result.
-   Konten penting tidak boleh hanya hadir di gambar, canvas, atau
    interaksi JS.
-   Jangan mengisi alt text dengan keyword berulang.
-   Tambahkan halaman kebijakan privasi dan informasi kontak yang benar.

## 21. QA Checklist

-   [ ] Navbar desktop dan mobile diuji.
-   [ ] Dropdown paket bekerja dengan klik/tap/keyboard.
-   [ ] Seluruh link WhatsApp menuju nomor yang benar.
-   [ ] Tidak ada placeholder, domain `.example`, atau teks demo yang
    terbit.
-   [ ] Semua foto berizin dan tidak merusak identitas produk.
-   [ ] Layout diuji di ponsel, tablet, dan desktop.
-   [ ] Kontras, fokus, alt, label form, dan skip link diperiksa.
-   [ ] Tidak ada layout shift besar saat gambar/font dimuat.
-   [ ] Metadata, canonical, Open Graph, sitemap, robots, dan JSON-LD
    divalidasi.
-   [ ] Tombol, form, link eksternal, dan halaman 404 diuji.
-   [ ] Kecepatan diuji dengan Lighthouse dan PageSpeed Insights.
