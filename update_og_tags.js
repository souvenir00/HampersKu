const fs = require('fs');
const path = require('path');

// Mapping of file paths (or relative patterns) to their dedicated OG image & alt
const FILE_OG_MAP = {
  // Main Pages
  'index.html': {
    og: 'og-beranda.jpg',
    alt: 'Koleksi Hampers Corporate Premium dan Hadiah Bisnis Eksklusif Hampersku'
  },
  'tentang-kami.html': {
    og: 'og-tentang-kami.jpg',
    alt: 'Profil Resmi Vendor dan Workshop Hampers Corporate Hampersku'
  },
  'tentang.html': {
    og: 'og-tentang-kami.jpg',
    alt: 'Profil Resmi Vendor dan Workshop Hampers Corporate Hampersku'
  },
  'tentang-kami/tentang-kami.html': {
    og: 'og-tentang-kami.jpg',
    alt: 'Profil Resmi Vendor dan Workshop Hampers Corporate Hampersku'
  },
  'tentang/tentang.html': {
    og: 'og-tentang-kami.jpg',
    alt: 'Profil Resmi Vendor dan Workshop Hampers Corporate Hampersku'
  },
  'portofolio.html': {
    og: 'og-portofolio.jpg',
    alt: 'Portofolio Pengadaan Hampers Corporate ASTON dan Perusahaan Nasional'
  },
  'portofolio/portofolio.html': {
    og: 'og-portofolio.jpg',
    alt: 'Portofolio Pengadaan Hampers Corporate ASTON dan Perusahaan Nasional'
  },
  'portofolio/index.html': {
    og: 'og-portofolio.jpg',
    alt: 'Portofolio Pengadaan Hampers Corporate ASTON dan Perusahaan Nasional'
  },
  'paket.html': {
    og: 'og-paket.jpg',
    alt: 'Katalog Pilihan Paket Hampers Corporate dan Corporate Gift Hampersku'
  },
  'paket/paket.html': {
    og: 'og-paket.jpg',
    alt: 'Katalog Pilihan Paket Hampers Corporate dan Corporate Gift Hampersku'
  },
  'paket/corporate-gift.html': {
    og: 'og-portofolio.jpg',
    alt: 'Paket Corporate Gift Eksklusif Perusahaan'
  },
  'paket/custom.html': {
    og: 'og-custom.jpg',
    alt: 'Paket Custom Hampers Perusahaan'
  },
  'paket/seminar-kit.html': {
    og: 'og-art-souvenir-unik.jpg',
    alt: 'Paket Seminar Kit dan Merchandise Kantor'
  },
  'kontak.html': {
    og: 'og-kontak.jpg',
    alt: 'Konsultasi dan Pemesanan Hampers Corporate Resmi CV Saudagar Kaya Abadi'
  },
  'custom-hampers.html': {
    og: 'og-custom.jpg',
    alt: 'Layanan Custom Hampers Corporate dan Branding Logo Perusahaan'
  },
  'custom-hampers/index.html': {
    og: 'og-custom.jpg',
    alt: 'Layanan Custom Hampers Corporate dan Branding Logo Perusahaan'
  },
  'cara-pesan.html': {
    og: 'og-cara-pesan.jpg',
    alt: 'Prosedur dan Alur Pemesanan Hampers Perusahaan Hampersku'
  },
  'cara-pesan/cara-pesan.html': {
    og: 'og-cara-pesan.jpg',
    alt: 'Prosedur dan Alur Pemesanan Hampers Perusahaan Hampersku'
  },
  'cara-pesan/index.html': {
    og: 'og-cara-pesan.jpg',
    alt: 'Prosedur dan Alur Pemesanan Hampers Perusahaan Hampersku'
  },
  'faq.html': {
    og: 'og-faq.jpg',
    alt: 'FAQ Seputar Pengadaan dan Pemesanan Hampers Corporate'
  },
  'faq/faq.html': {
    og: 'og-faq.jpg',
    alt: 'FAQ Seputar Pengadaan dan Pemesanan Hampers Corporate'
  },
  'hampers-100-ribuan.html': {
    og: 'og-hampers-100-ribuan.jpg',
    alt: 'Paket Hampers Corporate Budget 100 Ribuan Elegan Hampersku'
  },
  'hampers-100-ribuan/hampers-100-ribuan.html': {
    og: 'og-hampers-100-ribuan.jpg',
    alt: 'Paket Hampers Corporate Budget 100 Ribuan Elegan Hampersku'
  },
  'paket/hampers-100-ribuan.html': {
    og: 'og-hampers-100-ribuan.jpg',
    alt: 'Paket Hampers Corporate Budget 100 Ribuan Elegan Hampersku'
  },
  'paket/hampers-100-ribuan/hampers-100-ribuan.html': {
    og: 'og-hampers-100-ribuan.jpg',
    alt: 'Paket Hampers Corporate Budget 100 Ribuan Elegan Hampersku'
  },
  'hampers-250-ribuan.html': {
    og: 'og-hampers-250-ribuan.jpg',
    alt: 'Koleksi Hampers Corporate 250 Ribuan Pilihan Favorit Klien'
  },
  'hampers-250-ribuan/index.html': {
    og: 'og-hampers-250-ribuan.jpg',
    alt: 'Koleksi Hampers Corporate 250 Ribuan Pilihan Favorit Klien'
  },
  'paket/hampers-250-ribuan.html': {
    og: 'og-hampers-250-ribuan.jpg',
    alt: 'Koleksi Hampers Corporate 250 Ribuan Pilihan Favorit Klien'
  },
  'hampers-500-ribuan.html': {
    og: 'og-hampers-500-ribuan.jpg',
    alt: 'Paket Hampers Corporate Eksklusif 500 Ribuan untuk Rekanan VIP'
  },
  'hampers-500-ribuan/index.html': {
    og: 'og-hampers-500-ribuan.jpg',
    alt: 'Paket Hampers Corporate Eksklusif 500 Ribuan untuk Rekanan VIP'
  },
  'paket/hampers-500-ribuan.html': {
    og: 'og-hampers-500-ribuan.jpg',
    alt: 'Paket Hampers Corporate Eksklusif 500 Ribuan untuk Rekanan VIP'
  },
  'hampers-premium.html': {
    og: 'og-hampers-premium.jpg',
    alt: 'Koleksi Hampers Corporate Premium dan Mewah Hampersku'
  },
  'hampers-premium/index.html': {
    og: 'og-hampers-premium.jpg',
    alt: 'Koleksi Hampers Corporate Premium dan Mewah Hampersku'
  },
  'paket/hampers-premium.html': {
    og: 'og-hampers-premium.jpg',
    alt: 'Koleksi Hampers Corporate Premium dan Mewah Hampersku'
  },
  'hampers-lebaran.html': {
    og: 'og-hampers-lebaran.jpg',
    alt: 'Paket Hampers Lebaran Perusahaan dan Idul Fitri Hampersku'
  },
  'hampers-lebaran/index.html': {
    og: 'og-hampers-lebaran.jpg',
    alt: 'Paket Hampers Lebaran Perusahaan dan Idul Fitri Hampersku'
  },
  'hampers-kue-kering.html': {
    og: 'og-hampers-kue-kering.jpg',
    alt: 'Hampers Kue Kering Premium dan Artisanal Hampersku'
  },
  'hampers-kue-kering/index.html': {
    og: 'og-hampers-kue-kering.jpg',
    alt: 'Hampers Kue Kering Premium dan Artisanal Hampersku'
  },
  'hampers-kopi-teh.html': {
    og: 'og-hampers-kopi-teh.jpg',
    alt: 'Koleksi Hampers Kopi dan Teh Nusantara Pilihan Hampersku'
  },
  'hampers-kopi-teh/index.html': {
    og: 'og-hampers-kopi-teh.jpg',
    alt: 'Koleksi Hampers Kopi dan Teh Nusantara Pilihan Hampersku'
  },
  'hampers-sehat.html': {
    og: 'og-hampers-sehat.jpg',
    alt: 'Paket Hampers Sehat dan Wellness Gift Set Perusahaan'
  },
  'hampers-sehat/index.html': {
    og: 'og-hampers-sehat.jpg',
    alt: 'Paket Hampers Sehat dan Wellness Gift Set Perusahaan'
  },
  'hampers-tahun-baru.html': {
    og: 'og-hampers-tahun-baru.jpg',
    alt: 'Paket Hampers Tahun Baru dan Hadiah Akhir Tahun Perusahaan'
  },
  'paket/hampers-tahun-baru.html': {
    og: 'og-hampers-tahun-baru.jpg',
    alt: 'Paket Hampers Tahun Baru dan Hadiah Akhir Tahun Perusahaan'
  },
  'hampers-corporate-malang.html': {
    og: 'og-hampers-corporate-malang.jpg',
    alt: 'Vendor Hampers Corporate dan Hadiah Perusahaan di Malang'
  },
  'hampers-corporate-malang/index.html': {
    og: 'og-hampers-corporate-malang.jpg',
    alt: 'Vendor Hampers Corporate dan Hadiah Perusahaan di Malang'
  },
  'penulis.html': {
    og: 'og-penulis.jpg',
    alt: 'Mochammad Evan Pratama Pakar Hampers Corporate Indonesia'
  },
  'kebijakan-privasi.html': {
    og: 'og-kebijakan-privasi.jpg',
    alt: 'Kebijakan Privasi Layanan Hampersku'
  },
  'blog.html': {
    og: 'og-blog.jpg',
    alt: 'Blog Wawasan dan Tren Pengadaan Hampers Perusahaan'
  },
  'blog/blog.html': {
    og: 'og-blog.jpg',
    alt: 'Blog Wawasan dan Tren Pengadaan Hampers Perusahaan'
  },
  '404.html': {
    og: 'og-beranda.jpg',
    alt: 'Halaman Tidak Ditemukan Hampersku'
  },

  // Blog articles
  'blog/hampers-corporate-100-ribuan.html': {
    og: 'og-art-100-ribuan.jpg',
    alt: 'Ide Hampers Corporate 100 Ribuan Elegan dan Fungsional'
  },
  'blog/hampers-corporate-100-ribuan/hampers-corporate-100-ribuan.html': {
    og: 'og-art-100-ribuan.jpg',
    alt: 'Ide Hampers Corporate 100 Ribuan Elegan dan Fungsional'
  },
  'blog/hitung-budget-hampers-100-karyawan.html': {
    og: 'og-art-hitung-budget.jpg',
    alt: 'Kalkulasi Budget Hampers 100 Karyawan Perusahaan'
  },
  'blog/hitung-budget-hampers-100-karyawan/index.html': {
    og: 'og-art-hitung-budget.jpg',
    alt: 'Kalkulasi Budget Hampers 100 Karyawan Perusahaan'
  },
  'blog/kapan-pesan-hampers-perusahaan.html': {
    og: 'og-art-kapan-pesan.jpg',
    alt: 'Timeline Pengadaan Hampers Perusahaan Tepat Waktu'
  },
  'blog/kapan-pesan-hampers-perusahaan/index.html': {
    og: 'og-art-kapan-pesan.jpg',
    alt: 'Timeline Pengadaan Hampers Perusahaan Tepat Waktu'
  },
  'blog/cara-memilih-vendor-hampers.html': {
    og: 'og-art-cara-memilih.jpg',
    alt: 'Kriteria Memilih Vendor Hampers Corporate Terbaik'
  },
  'blog/cara-memilih-vendor-hampers/index.html': {
    og: 'og-art-cara-memilih.jpg',
    alt: 'Kriteria Memilih Vendor Hampers Corporate Terbaik'
  },
  'blog/mengapa-corporate-gift-penting-untuk-loyalitas-klien.html': {
    og: 'og-art-loyalitas-klien.jpg',
    alt: 'Pentingnya Corporate Gift untuk Menjaga Loyalitas Klien'
  },
  'blog/mengapa-corporate-gift-penting-untuk-loyalitas-klien/index.html': {
    og: 'og-art-loyalitas-klien.jpg',
    alt: 'Pentingnya Corporate Gift untuk Menjaga Loyalitas Klien'
  },
  'blog/ide-hampers-corporate-gift-eksklusif.html': {
    og: 'og-art-ide-eksklusif.jpg',
    alt: 'Inspirasi Ide Hampers Corporate Gift Eksklusif VIP'
  },
  'blog/ide-hampers-corporate-gift-eksklusif/index.html': {
    og: 'og-art-ide-eksklusif.jpg',
    alt: 'Inspirasi Ide Hampers Corporate Gift Eksklusif VIP'
  },
  'blog/panduan-memilih-hampers-corporate-karyawan.html': {
    og: 'og-art-panduan-karyawan.jpg',
    alt: 'Panduan Praktis Memilih Hampers Karyawan Perusahaan'
  },
  'blog/panduan-memilih-hampers-corporate-karyawan/index.html': {
    og: 'og-art-panduan-karyawan.jpg',
    alt: 'Panduan Praktis Memilih Hampers Karyawan Perusahaan'
  },
  'blog/tren-hampers-perusahaan-2025.html': {
    og: 'og-art-tren-2025.jpg',
    alt: 'Tren Hampers Perusahaan dan Corporate Gift 2025'
  },
  'blog/rekomendasi-hampers-ramadhan-perusahaan.html': {
    og: 'og-art-ramadhan.jpg',
    alt: 'Rekomendasi Hampers Ramadhan dan Idul Fitri Kantor'
  },
  'blog/souvenir-kantor-unik-dan-bermanfaat.html': {
    og: 'og-art-souvenir-unik.jpg',
    alt: 'Ide Souvenir Kantor Unik dan Fungsional Perusahaan'
  },
  'blog/perbedaan-hampers-dan-parcel.html': {
    og: 'og-art-perbedaan.jpg',
    alt: 'Perbedaan Mendasar Antara Hampers dan Parcel'
  },
  'blog/tips-memilih-hampers-lebaran-kantor.html': {
    og: 'og-art-tips-lebaran.jpg',
    alt: 'Tips Memilih Hampers Lebaran untuk Rekanan Kantor'
  },
  'blog/hampers-ramah-lingkungan-eco-friendly.html': {
    og: 'og-art-eco-friendly.jpg',
    alt: 'Konsep Hampers Ramah Lingkungan Eco-Friendly'
  },
  'blog/rekomendasi-hampers-akhir-tahun.html': {
    og: 'og-art-akhir-tahun.jpg',
    alt: 'Rekomendasi Hampers Corporate Akhir Tahun'
  },
  'blog/kesalahan-memilih-vendor-hampers-corporate.html': {
    og: 'og-art-kesalahan-vendor.jpg',
    alt: 'Kesalahan Umum Saat Memilih Vendor Hampers Corporate'
  },
  'blog/hampers-corporate-jakarta.html': {
    og: 'og-art-jakarta.jpg',
    alt: 'Vendor Hampers Corporate Jakarta Layanan Cepat dan Elegan'
  },
  'blog/5-item-wajib-seminar-kit.html': {
    og: 'og-art-souvenir-unik.jpg',
    alt: '5 Item Wajib untuk Seminar Kit Perusahaan'
  },
  'blog/corporate-gift-custom-branding-perusahaan.html': {
    og: 'og-custom.jpg',
    alt: 'Corporate Gift dengan Custom Branding Logo Perusahaan'
  },
  'blog/custom-corporate-gift-branding-perusahaan.html': {
    og: 'og-custom.jpg',
    alt: 'Kustomisasi Hadiah Perusahaan dengan Identitas Brand'
  },
  'blog/corporate-gift-custom-branding-perusahaan/index.html': {
    og: 'og-custom.jpg',
    alt: 'Corporate Gift dengan Custom Branding Logo Perusahaan'
  },
  'blog/laser-engraving-vs-hotprint-gold-foil.html': {
    og: 'og-custom.jpg',
    alt: 'Perbandingan Laser Engraving vs Hotprint Gold Foil'
  },
  'blog/manfaat-corporate-gift-loyalitas-klien.html': {
    og: 'og-art-loyalitas-klien.jpg',
    alt: 'Manfaat Corporate Gift untuk Meningkatkan Loyalitas Klien'
  },
  'blog/onboarding-hampers-karyawan-baru.html': {
    og: 'og-hampers-250-ribuan.jpg',
    alt: 'Onboarding Kit dan Hampers Sambutan Karyawan Baru'
  },
  'blog/panduan-memilih-corporate-gift.html': {
    og: 'og-portofolio.jpg',
    alt: 'Panduan Lengkap Memilih Hadiah Korporat yang Tepat'
  },
  'blog/vendor-hampers-corporate-jakarta.html': {
    og: 'og-art-jakarta.jpg',
    alt: 'Penyedia Vendor Hampers Corporate Area Jakarta'
  }
};

const BASE_URL = 'https://www.hamperscorporate.web.id';

function updateFile(relPath, config) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File does not exist: ${relPath}`);
    return;
  }

  let html = fs.readFileSync(fullPath, 'utf8');
  const ogImgUrl = `${BASE_URL}/assets/images/og/${config.og}`;
  const ogAlt = config.alt;

  // 1. Replace og:image
  const ogImgRegex = /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (ogImgRegex.test(html)) {
    html = html.replace(ogImgRegex, `<meta property="og:image" content="${ogImgUrl}">`);
  } else {
    // Insert before </head>
    html = html.replace('</head>', `  <meta property="og:image" content="${ogImgUrl}">\n</head>`);
  }

  // 2. Ensure og:image:secure_url
  const ogSecureRegex = /<meta\s+property=["']og:image:secure_url["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (ogSecureRegex.test(html)) {
    html = html.replace(ogSecureRegex, `<meta property="og:image:secure_url" content="${ogImgUrl}">`);
  } else {
    html = html.replace(
      `<meta property="og:image" content="${ogImgUrl}">`,
      `<meta property="og:image" content="${ogImgUrl}">\n  <meta property="og:image:secure_url" content="${ogImgUrl}">`
    );
  }

  // 3. Ensure og:image:width
  const ogWidthRegex = /<meta\s+property=["']og:image:width["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (ogWidthRegex.test(html)) {
    html = html.replace(ogWidthRegex, `<meta property="og:image:width" content="1200">`);
  } else {
    html = html.replace(
      `<meta property="og:image:secure_url" content="${ogImgUrl}">`,
      `<meta property="og:image:secure_url" content="${ogImgUrl}">\n  <meta property="og:image:width" content="1200">`
    );
  }

  // 4. Ensure og:image:height
  const ogHeightRegex = /<meta\s+property=["']og:image:height["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (ogHeightRegex.test(html)) {
    html = html.replace(ogHeightRegex, `<meta property="og:image:height" content="630">`);
  } else {
    html = html.replace(
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">`
    );
  }

  // 5. Ensure og:image:type
  const ogTypeRegex = /<meta\s+property=["']og:image:type["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (ogTypeRegex.test(html)) {
    html = html.replace(ogTypeRegex, `<meta property="og:image:type" content="image/jpeg">`);
  } else {
    html = html.replace(
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:height" content="630">\n  <meta property="og:image:type" content="image/jpeg">`
    );
  }

  // 6. Ensure og:image:alt
  const ogAltRegex = /<meta\s+property=["']og:image:alt["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (ogAltRegex.test(html)) {
    html = html.replace(ogAltRegex, `<meta property="og:image:alt" content="${ogAlt}">`);
  } else {
    html = html.replace(
      `<meta property="og:image:type" content="image/jpeg">`,
      `<meta property="og:image:type" content="image/jpeg">\n  <meta property="og:image:alt" content="${ogAlt}">`
    );
  }

  // 7. Replace twitter:image
  const twImgRegex = /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (twImgRegex.test(html)) {
    html = html.replace(twImgRegex, `<meta name="twitter:image" content="${ogImgUrl}">`);
  } else {
    html = html.replace('</head>', `  <meta name="twitter:image" content="${ogImgUrl}">\n</head>`);
  }

  // 8. Ensure twitter:card is summary_large_image
  const twCardRegex = /<meta\s+name=["']twitter:card["']\s+content=["'][^"']*["']\s*\/?>/gi;
  if (twCardRegex.test(html)) {
    html = html.replace(twCardRegex, `<meta name="twitter:card" content="summary_large_image">`);
  }

  // 9. Update JSON-LD primary image (leave author mochammad-evan avatar intact)
  html = html.replace(
    /"image":\s*"https:\/\/www\.hamperscorporate\.web\.id\/assets\/images\/(?!author-|mochammad-evan)[^"]+"/g,
    `"image": "${ogImgUrl}"`
  );

  fs.writeFileSync(fullPath, html, 'utf8');
  console.log(`Updated: ${relPath} -> ${config.og}`);
}

// Execute updates
let count = 0;
for (const [relPath, config] of Object.entries(FILE_OG_MAP)) {
  updateFile(relPath, config);
  count++;
}
console.log(`Total files updated: ${count}`);

// Also create/sync index.html inside directories if missing
const DIR_SYNCS = [
  { dir: 'tentang-kami', src: 'tentang-kami.html' },
  { dir: 'tentang', src: 'tentang-kami.html' },
  { dir: 'portofolio', src: 'portofolio.html' },
  { dir: 'cara-pesan', src: 'cara-pesan.html' },
  { dir: 'faq', src: 'faq.html' }
];

for (const sync of DIR_SYNCS) {
  const targetIndex = path.join(__dirname, sync.dir, 'index.html');
  const sourceFile = path.join(__dirname, sync.src);
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetIndex);
    console.log(`Synced: ${sync.dir}/index.html from ${sync.src}`);
  }
}

