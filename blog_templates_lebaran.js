const fs = require('fs');
const path = require('path');

function getHeader(title, canonicalUrl) {
  return `  <!-- Header -->
  <header class="cg-header" id="header">
    <div class="cg-container">
      <div class="cg-nav-inner">
        <!-- Brand Logo -->
        <a href="/" class="cg-brand" aria-label="HampersKu Beranda">
          <img src="/assets/images/logo-hampersku.webp?v=20261109_v3" alt="HampersKu" class="cg-brand-logo-img" width="165" height="38" style="height: 38px; width: auto; max-width: 175px; object-fit: contain; display: block;" loading="eager">
        </a>

        <!-- Navigation Menu -->
        <div class="cg-nav-menu-wrap" id="navMenu">
          <nav aria-label="Navigasi Utama">
            <ul class="cg-nav-menu">
              <li class="cg-nav-item">
                <a href="/" class="cg-nav-link">Beranda</a>
              </li>
              <li class="cg-nav-item dropdown has-megamenu">
                <a href="/tentang" class="cg-nav-link cg-nav-link-dropdown" aria-haspopup="true" aria-expanded="false">
                  Tentang
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
                <div class="cg-megamenu-panel" aria-label="Submenu Tentang HampersKu" style="display: none;">
                  <div class="cg-megamenu-container">
                    <div class="cg-megamenu-col cg-megamenu-callout">
                      <span class="cg-megamenu-eyebrow">DEDIKASI, MUTU &amp; LEGALITAS</span>
                      <h3 class="cg-megamenu-title">Mengenal Lebih Dekat<br>HampersKu.</h3>
                      <a href="/tentang-kami" class="cg-megamenu-cta">
                        <span>Pelajari Profil Lengkap</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </a>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Profil &amp; Fasilitas</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/tentang-kami">Tentang Kami</a></li>
                        <li><a href="/tentang-kami#workshop">Workshop Produksi</a></li>
                        <li><a href="/penulis">Profil Tim Kurator</a></li>
                        <li><a href="/tentang-kami#legalitas">Legalitas Resmi</a></li>
                      </ul>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Panduan Pengadaan</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/cara-pesan">Cara Pemesanan B2B</a></li>
                        <li><a href="/cara-pesan#garansi">Garansi Pengiriman</a></li>
                        <li><a href="/cara-pesan">Syarat Term of Payment</a></li>
                        <li><a href="/faq">FAQ Corporate Hampers</a></li>
                      </ul>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Wilayah &amp; Bantuan</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/hampers-corporate-malang/">Hampers Malang Hub</a></li>
                        <li><a href="/kontak">Pengiriman Seluruh Indonesia</a></li>
                        <li><a href="/kontak">Konsultasi Resmi Kantor</a></li>
                        <li><a href="/kebijakan-privasi">Kebijakan Privasi</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="cg-nav-item dropdown has-megamenu">
                <a href="/custom-hampers/" class="cg-nav-link cg-nav-link-dropdown" aria-haspopup="true" aria-expanded="false">
                  Layanan
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
                <div class="cg-megamenu-panel" aria-label="Submenu Layanan Corporate" style="display: none;">
                  <div class="cg-megamenu-container">
                    <div class="cg-megamenu-col cg-megamenu-callout">
                      <span class="cg-megamenu-eyebrow">B2B CORPORATE SOLUTION</span>
                      <h3 class="cg-megamenu-title">Solusi Apresiasi<br>Korporasi Anda.</h3>
                      <a href="/custom-hampers/" class="cg-megamenu-cta">
                        <span>Konsultasi Kebutuhan Kantor</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </a>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Layanan Utama</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/custom-hampers/">Custom Hampers Corporate</a></li>
                        <li><a href="/hampers-premium">Executive VIP Gift Set</a></li>
                        <li><a href="/paket/seminar-kit">Event &amp; Seminar Kit</a></li>
                        <li><a href="/paket/hampers-gathering">Hampers Gathering</a></li>
                        <li><a href="/paket/corporate-gift">Corporate Gift Eksklusif</a></li>
                      </ul>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Personalisasi &amp; Branding</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/custom-hampers/">Laser Engraving Logo</a></li>
                        <li><a href="/custom-hampers/">Hotprint &amp; Emboss Gold</a></li>
                        <li><a href="/custom-hampers/">Custom Hardbox Premium</a></li>
                        <li><a href="/custom-hampers/">Kartu Ucapan &amp; Sleeve</a></li>
                        <li><a href="/custom-hampers/">Pita &amp; Wax Seal Custom</a></li>
                      </ul>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Solusi Korporasi</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/hampers-sehat/">Paket Karyawan &amp; Wellness</a></li>
                        <li><a href="/custom-hampers/">Pengadaan BUMN &amp; Bank</a></li>
                        <li><a href="/hampers-premium">Hadiah Direksi &amp; Stakeholder</a></li>
                        <li><a href="/cara-pesan">Pesanan Skala Besar (Volume)</a></li>
                        <li><a href="/kontak">Multi-Drop Kirim Seluruh Kota</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="cg-nav-item dropdown has-megamenu">
                <a href="/paket" class="cg-nav-link cg-nav-link-dropdown" aria-haspopup="true" aria-expanded="false">
                  Paket Hampers
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </a>
                <div class="cg-megamenu-panel" aria-label="Submenu Paket Hampers &amp; Souvenir" style="display: none;">
                  <div class="cg-megamenu-container">
                    <div class="cg-megamenu-col cg-megamenu-callout">
                      <span class="cg-megamenu-eyebrow">A LITTLE SOMETHING, A LOT OF MEANING.</span>
                      <h3 class="cg-megamenu-title">Untuk setiap<br>cerita berharga.</h3>
                      <a href="/paket" class="cg-megamenu-cta">
                        <span>Jelajahi semua gift</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </a>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Hampers</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/paket/hampers-lebaran">Hampers Lebaran</a></li>
                        <li><a href="/hampers-kue-kering/">Hampers Kue Kering</a></li>
                        <li><a href="/hampers-kopi-teh/">Hampers Kopi dan Teh</a></li>
                        <li><a href="/hampers-sehat/">Hampers Sehat Karyawan</a></li>
                        <li><a href="/hampers-premium">Hampers Premium VIP</a></li>
                        <li><a href="/hampers-corporate-malang/">Hampers UMKM Malang</a></li>
                      </ul>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Souvenir</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/custom-hampers/">Souvenir Kantor</a></li>
                        <li><a href="/custom-hampers/">Souvenir Perusahaan</a></li>
                        <li><a href="/custom-hampers/">Souvenir BUMN</a></li>
                        <li><a href="/paket/seminar-kit">Souvenir Seminar Workshop</a></li>
                        <li><a href="/paket/custom">Souvenir Onboarding Kit</a></li>
                        <li><a href="/hampers-premium">Souvenir Premium VIP</a></li>
                      </ul>
                    </div>
                    <div class="cg-megamenu-col">
                      <h4 class="cg-megamenu-heading">Untuk acara &amp; perusahaan</h4>
                      <ul class="cg-megamenu-list">
                        <li><a href="/custom-hampers/">Hampers Kantor</a></li>
                        <li><a href="/custom-hampers/">Hampers Perusahaan</a></li>
                        <li><a href="/paket/hampers-gathering">Hampers Gathering</a></li>
                        <li><a href="/hampers-100-ribuan/">Paket Rp100 Ribuan</a></li>
                        <li><a href="/hampers-250-ribuan/">Paket Rp250 Ribuan</a></li>
                        <li><a href="/hampers-500-ribuan/">Paket Rp500 Ribuan</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="cg-nav-item"><a href="/portofolio" class="cg-nav-link">Portofolio</a></li>
              <li class="cg-nav-item"><a href="/blog" class="cg-nav-link active" aria-current="page">Blog</a></li>
              <li class="cg-nav-item"><a href="/kontak" class="cg-nav-link">Kontak</a></li>
            </ul>
          </nav>
          <div class="cg-mobile-nav-cta d-lg-none">
            <a href="https://wa.me/6282131087971?text=Halo%20Hampersku,%20saya%20ingin%20konsultasi%20Hampers%20Lebaran%20Corporate."
              class="cg-btn cg-btn-primary w-100" target="_blank" rel="noopener noreferrer">Konsultasi WhatsApp</a>
          </div>
        </div>

        <button class="cg-nav-toggle d-lg-none" aria-label="Buka Menu Navigasi" aria-controls="navMenu" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>`;
}

function getFooter() {
  return `  <!-- Footer -->
  <footer class="cg-footer" aria-label="Footer Hampersku">
    <div class="cg-container">
      <div class="row g-4 justify-content-between">
        <div class="col-lg-4 col-md-6">
          <a href="/" class="d-inline-block mb-3" aria-label="Hampersku Beranda">
            <img src="/assets/images/logo-hampersku.webp" alt="HampersKu Logo" class="cg-footer-logo-img" width="180" height="42" style="height: 42px; width: auto; object-fit: contain;">
          </a>
          <p style="color: #EDE6DF; font-size: 0.95rem; max-width: 340px;">
            Partner terpercaya pengadaan corporate hampers custom, hampers Lebaran Hari Raya, luxury gift box, seminar kit, dan bingkisan apresiasi eksklusif perusahaan di Indonesia.
          </p>
          <div class="mt-4">
            <div class="small text-uppercase tracking-wider" style="color: #F0D9C0; font-weight: 600;">Layanan Konsultasi WhatsApp</div>
            <a href="https://wa.me/6282131087971" class="text-white fw-bold fs-5 text-decoration-none mt-1 d-inline-block" target="_blank" rel="noopener noreferrer">
              0821-3108-7971
            </a>
          </div>
          <div class="mt-3">
            <div class="small text-uppercase tracking-wider" style="color: #F0D9C0; font-weight: 600;">Lokasi Perusahaan</div>
            <p style="color: #EDE6DF; font-size: 0.9rem; line-height: 1.5; margin-top: 0.25rem; margin-bottom: 0;">
              Jl. Band. Palmerah No. D3-35B, Cemorokandang, Kec. Kedungkandang, Kota Malang, Jawa Timur 65138
            </p>
            <a href="https://maps.app.goo.gl/WRQ4crzgWhWx9cge8" target="_blank" rel="noopener noreferrer"
              class="d-inline-flex align-items-center gap-1 mt-1 small" style="color: #F0D9C0; text-decoration: underline;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Buka di Google Maps &rarr;</span>
            </a>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-6">
          <h3 class="cg-footer-title">Navigasi</h3>
          <ul class="cg-footer-links">
            <li><a href="/">Beranda</a></li>
            <li><a href="/tentang">Tentang Kami</a></li>
            <li><a href="/paket">Katalog Hampers</a></li>
            <li><a href="/portofolio">Portofolio Proyek</a></li>
            <li><a href="/blog">Blog &amp; Panduan</a></li>
            <li><a href="/hampers-corporate-malang/">Hampers Corporate Malang</a></li>
            <li><a href="/kontak">Kontak Kami</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-6">
          <h3 class="cg-footer-title">Kategori Hampers</h3>
          <ul class="cg-footer-links">
            <li><a href="/hampers-lebaran">Hampers Lebaran Corporate</a></li>
            <li><a href="/hampers-kue-kering/">Hampers Kue Kering</a></li>
            <li><a href="/hampers-kopi-teh/">Hampers Kopi dan Teh</a></li>
            <li><a href="/hampers-sehat/">Hampers Sehat Karyawan</a></li>
            <li><a href="/hampers-premium/">Hampers Corporate Premium</a></li>
            <li><a href="/paket/hampers-gathering">Hampers Gathering</a></li>
            <li><a href="/paket/seminar-kit">Seminar &amp; Event Hamper</a></li>
            <li><a href="/paket/corporate-gift">Executive Hampers Box</a></li>
            <li><a href="/paket/custom">Onboarding Welcome Hamper</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6">
          <h3 class="cg-footer-title">Area Layanan</h3>
          <p style="color: #EDE6DF; font-size: 0.92rem; line-height: 1.6;">
            Melayani pengadaan dan distribusi hampers Lebaran Hari Raya ke seluruh kota di Indonesia (Jabodetabek, Surabaya, Bandung, Medan, Bali, Semarang, Makassar, dan lainnya).
          </p>
          <ul class="cg-footer-links mt-2">
            <li><a href="/hampers-corporate-malang/" style="color: #F0D9C0; font-weight: 600;">➔ Layanan Kota: Hampers Corporate Malang</a></li>
          </ul>
        </div>
      </div>
      <div class="cg-footer-bottom">
        <div>&copy; 2026 Hampersku. Seluruh hak cipta dilindungi.</div>
        <div class="d-flex gap-3">
          <a href="/kebijakan-privasi" style="color: #EDE6DF; text-decoration: none;">Kebijakan Privasi</a>
          <span style="color: rgba(255,255,255,0.2);">•</span>
          <a href="/kontak" style="color: #EDE6DF; text-decoration: none;">Bantuan &amp; Konsultasi</a>
        </div>
      </div>
    </div>
  </footer>

  <a href="https://wa.me/6282131087971?text=Halo%20Hampersku,%20saya%20ingin%20konsultasi%20Hampers%20Lebaran%20Corporate."
    class="cg-float-wa" target="_blank" rel="noopener noreferrer" aria-label="Konsultasi WhatsApp">
    <div class="cg-float-wa-icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 20.16C10.56 20.16 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16ZM16.56 14.43C16.31 14.31 15.09 13.71 14.86 13.62C14.63 13.54 14.47 13.5 14.3 13.75C14.14 14 13.67 14.55 13.53 14.71C13.38 14.88 13.24 14.9 12.99 14.77C12.74 14.65 11.94 14.39 10.99 13.54C10.25 12.88 9.75 12.06 9.6 11.81C9.46 11.56 9.59 11.43 9.71 11.31C9.82 11.2 9.96 11.02 10.08 10.88C10.21 10.73 10.25 10.63 10.33 10.46C10.41 10.3 10.37 10.15 10.31 10.03C10.25 9.9 9.76 8.7 9.56 8.2C9.36 7.72 9.16 7.78 9 7.78C8.86 7.77 8.69 7.77 8.52 7.77C8.36 7.77 8.09 7.83 7.86 8.08C7.64 8.33 7 8.92 7 10.14C7 11.36 7.89 12.53 8.01 12.7C8.13 12.86 9.75 15.36 12.23 16.43C12.82 16.69 13.28 16.84 13.64 16.95C14.23 17.14 14.77 17.11 15.2 17.05C15.68 16.98 16.68 16.45 16.89 15.86C17.1 15.27 17.1 14.77 17.04 14.67C16.98 14.56 16.81 14.5 16.56 14.43Z" />
      </svg>
    </div>
    <span>Konsultasi WhatsApp</span>
  </a>

  <button class="cg-back-to-top" aria-label="Kembali ke atas">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  </button>

  <script src="/assets/js/main.js?v=20261110_v11_flush_nav"></script>
</body>

</html>`;
}

function getAuthorBio() {
  return `          <!-- AUTHOR BIO CARD -->
          <div class="border rounded-4 p-4 mb-5"
            style="background: var(--cg-bg-soft); border-color: var(--cg-border) !important;">
            <div class="d-flex gap-4 align-items-start flex-column flex-sm-row">
              <div class="flex-shrink-0">
                <a href="/penulis" aria-label="Profil Mochammad Evan Pratama">
                  <img src="/assets/images/mochammad-evan-pratama.webp" alt="Mochammad Evan Pratama"
                    class="rounded-circle object-fit-cover shadow-sm border" width="80" height="80"
                    style="border-color: #FFFFFF !important; border-width: 3px !important; display: block;">
                </a>
              </div>
              <div class="flex-grow-1">
                <div class="small text-muted mb-1"
                  style="letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600;">Tentang Penulis</div>
                <div class="fw-bold fs-6 mb-1">
                  <a href="/penulis" class="text-decoration-none" style="color: var(--cg-primary-dark);">Mochammad Evan Pratama</a>
                </div>
                <div class="small mb-2" style="color: var(--cg-primary); font-weight: 600;">Reviewed by Mochammad Evan Pratama &middot; Hampersku</div>
                <p class="small text-muted mb-3" style="line-height: 1.65;">
                  Evan memiliki pengalaman lebih dari 6 tahun dalam dunia kurasi corporate gift, hampers Hari Raya Idulfitri, dan luxury packaging di Indonesia. Ia memimpin tim strategic sourcing Hampersku dalam mengelola pengadaan bingkisan korporat untuk ratusan klien BUMN, perbankan, dan multinasional di seluruh Indonesia.
                </p>
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                  <div class="d-flex flex-wrap gap-2">
                    <span class="cg-badge">Hampers Lebaran</span>
                    <span class="cg-badge">Corporate Gifting</span>
                    <span class="cg-badge">Procurement B2B</span>
                  </div>
                  <a href="/penulis" class="small fw-bold text-decoration-none" style="color: var(--cg-primary);">
                    Lihat Profil Lengkap &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>`;
}

function getPillarCta() {
  return `          <!-- CTA BANNER PROMOTION -->
          <div class="cg-cta-banner p-4 p-md-5 my-5" style="border-radius: 20px;">
            <div class="row align-items-center g-4">
              <div class="col-md-8 text-center text-md-start">
                <div class="small text-white mb-2"
                  style="opacity: 0.75; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;">PENGADAAN RESMI IDULFITRI 2026</div>
                <h3 class="h4 text-white mb-2" style="line-height: 1.35;">Siapkan Hampers Lebaran Eksklusif Perusahaan Anda Sekarang</h3>
                <p class="small text-white mb-0" style="opacity: 0.88;">
                  Jelajahi pilihan lengkap kue kering bersertifikat halal, sajadah travel premium, dan luxury hardbox custom di halaman resmi <a href="/hampers-lebaran" style="color: #F0D9C0; text-decoration: underline; font-weight: 700;">Hampers Lebaran Corporate</a> kami. Free mockup 3D dan pengiriman multi-drop seluruh Indonesia.
                </p>
              </div>
              <div class="col-md-4 text-center">
                <a href="https://wa.me/6282131087971?text=Halo%20Hampersku,%20saya%20ingin%20konsultasi%20pengadaan%20Hampers%20Lebaran%20perusahaan."
                  class="cg-btn cg-btn-wa d-inline-flex align-items-center gap-2 w-100 justify-content-center"
                  target="_blank" rel="noopener noreferrer" data-wa-source="blog_lebaran_cta">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  Konsultasi via WhatsApp
                </a>
                <div class="small mt-2" style="color: rgba(255,255,255,0.7);">0821-3108-7971 &middot; Respon &lt; 1 Jam</div>
              </div>
            </div>
          </div>`;
}

module.exports = { getHeader, getFooter, getAuthorBio, getPillarCta };
console.log('Template helpers exported.');
