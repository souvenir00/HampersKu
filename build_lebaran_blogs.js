const fs = require('fs');
const path = require('path');
const { getHeader, getFooter, getAuthorBio, getPillarCta } = require('./blog_templates_lebaran.js');

const articles = [
  {
    key: 'pilar',
    slug: 'panduan-memilih-hampers-lebaran-untuk-perusahaan',
    category: 'Panduan Corporate Hampers',
    title: 'Panduan Memilih Hampers Lebaran untuk Perusahaan agar Berkesan dan Profesional',
    seoTitle: 'Panduan Memilih Hampers Lebaran untuk Perusahaan agar Berkesan | Hampersku',
    metaDesc: 'Pelajari cara memilih hampers Lebaran untuk perusahaan, mulai dari isi, kemasan, anggaran, hingga pengiriman agar hadiah terasa profesional dan berkesan.',
    focusKeyphrase: 'hampers Lebaran untuk perusahaan',
    image: '/ft%20produk/panduan-memilih-hampers-lebaran-untuk-perusahaan.webp',
    imageAlt: 'Panduan memilih hampers Lebaran untuk perusahaan agar berkesan dan profesional',
    datePublished: '2026-11-12T09:00:00+07:00',
    dateModified: '2026-11-12T09:00:00+07:00',
    wordCount: '2150',
    readTime: '9 menit baca',
    sourceFile: 'pilar.txt'
  },
  {
    key: 'c1',
    slug: 'rekomendasi-hampers-lebaran-untuk-relasi-bisnis-dan-klien-perusahaan',
    category: 'Relasi Bisnis & Klien',
    title: 'Rekomendasi Hampers Lebaran untuk Relasi Bisnis dan Klien Perusahaan',
    seoTitle: 'Rekomendasi Hampers Lebaran untuk Relasi Bisnis dan Klien | Hampersku',
    metaDesc: 'Temukan rekomendasi hampers Lebaran untuk relasi bisnis dan klien perusahaan, dari paket makanan hingga bingkisan premium yang profesional.',
    focusKeyphrase: 'hampers Lebaran untuk relasi bisnis',
    image: '/ft%20produk/rekomendasi-hampers-lebaran-untuk-relasi-bisnis-dan-klien-perusahaan.webp',
    imageAlt: 'Rekomendasi hampers Lebaran eksklusif untuk relasi bisnis dan klien perusahaan',
    datePublished: '2026-11-12T10:00:00+07:00',
    dateModified: '2026-11-12T10:00:00+07:00',
    wordCount: '1980',
    readTime: '8 menit baca',
    sourceFile: 'c1.txt'
  },
  {
    key: 'c2',
    slug: 'cara-memilih-hampers-lebaran-untuk-karyawan-perusahaan',
    category: 'Employee Appreciation',
    title: 'Cara Memilih Hampers Lebaran yang Berkesan untuk Karyawan Perusahaan',
    seoTitle: 'Cara Memilih Hampers Lebaran untuk Karyawan Perusahaan | Hampersku',
    metaDesc: 'Simak cara memilih hampers Lebaran untuk karyawan, mulai dari ide isi, anggaran, kemasan, hingga pembagian agar apresiasi perusahaan lebih bermakna.',
    focusKeyphrase: 'hampers Lebaran untuk karyawan',
    image: '/ft%20produk/cara-memilih-hampers-lebaran-untuk-karyawan-perusahaan.webp',
    imageAlt: 'Cara memilih hampers Lebaran yang berkesan untuk karyawan perusahaan',
    datePublished: '2026-11-12T11:00:00+07:00',
    dateModified: '2026-11-12T11:00:00+07:00',
    wordCount: '1920',
    readTime: '8 menit baca',
    sourceFile: 'c2.txt'
  },
  {
    key: 'c3',
    slug: 'panduan-memesan-hampers-lebaran-custom-corporate-gifting',
    category: 'Custom Corporate Gifting',
    title: 'Panduan Memesan Hampers Lebaran Custom untuk Kebutuhan Corporate Gifting',
    seoTitle: 'Panduan Memesan Hampers Lebaran Custom untuk Corporate Gifting | Hampersku',
    metaDesc: 'Ketahui cara memesan hampers Lebaran custom untuk perusahaan, mulai dari menentukan konsep, isi, desain, anggaran, hingga memilih vendor.',
    focusKeyphrase: 'hampers Lebaran custom',
    image: '/ft%20produk/panduan-memesan-hampers-lebaran-custom-corporate-gifting.webp',
    imageAlt: 'Panduan memesan hampers Lebaran custom untuk kebutuhan corporate gifting perusahaan',
    datePublished: '2026-11-12T12:00:00+07:00',
    dateModified: '2026-11-12T12:00:00+07:00',
    wordCount: '2050',
    readTime: '8 menit baca',
    sourceFile: 'c3.txt'
  }
];

function formatInline(str) {
  return str
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="cg-article-link">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function processBodyText(rawText, articleKey) {
  // Split into lines
  const lines = rawText.split('\n');
  
  // Skip frontmatter until first heading or Jawaban Singkat
  let startIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith('### Jawaban Singkat') || l.startsWith('## Mengapa') || l.startsWith('## Apa')) {
      startIndex = i;
      break;
    }
  }

  // Remove trailer like 'Peta Internal Linking' or 'Schema yang disarankan'
  let usefulLines = lines.slice(startIndex);
  let stopIndex = usefulLines.length;
  for (let i = 0; i < usefulLines.length; i++) {
    const l = usefulLines[i].trim();
    if (l.startsWith('## Peta Internal Linking') || l.startsWith('Schema yang disarankan:')) {
      stopIndex = i;
      break;
    }
  }
  usefulLines = usefulLines.slice(0, stopIndex);

  let htmlParts = [];
  let inUl = false;
  let inOl = false;
  let inQuickAnswer = false;
  let inFaq = false;
  let faqList = [];
  let currentFaqQ = '';
  let currentFaqA = [];

  for (let i = 0; i < usefulLines.length; i++) {
    let line = usefulLines[i].trim();

    if (!line) {
      if (inUl) { htmlParts.push('</ul>'); inUl = false; }
      if (inOl) { htmlParts.push('</ol>'); inOl = false; }
      continue;
    }

    // Check Quick Answer section
    if (line.startsWith('### Jawaban Singkat')) {
      if (inUl) { htmlParts.push('</ul>'); inUl = false; }
      if (inOl) { htmlParts.push('</ol>'); inOl = false; }
      htmlParts.push(`          <!-- Quick Answer Box (AI Overview & Featured Snippet Target) -->
          <div class="cg-quick-summary p-4 mb-5" style="background: #FDFBF7; border: 1px solid #E6D7C3; border-left: 4px solid var(--cg-primary); border-radius: 12px;">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge" style="background: var(--cg-primary); color: #fff; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Ringkasan Cepat</span>
              <span class="small text-muted" style="font-size: 0.82rem;">Key Takeaway</span>
            </div>
            <h3 class="h6 fw-bold mb-2" style="color: var(--cg-primary-dark);">Jawaban Singkat:</h3>`);
      inQuickAnswer = true;
      continue;
    }

    if (inQuickAnswer) {
      if (line.startsWith('## ') || line.startsWith('### ')) {
        htmlParts.push(`          </div>`);
        inQuickAnswer = false;
      } else {
        htmlParts.push(`            <p class="mb-0 text-muted" style="line-height: 1.7; font-size: 0.95rem;">${formatInline(line)}</p>`);
        continue;
      }
    }

    // Check FAQ Section
    if (line.startsWith('## FAQ') || line.startsWith('## Pertanyaan yang Sering Diajukan')) {
      if (inUl) { htmlParts.push('</ul>'); inUl = false; }
      if (inOl) { htmlParts.push('</ol>'); inOl = false; }
      inFaq = true;
      htmlParts.push(`          <h2 class="h3 fw-bold mt-5 mb-4" id="faq-section">${line.replace('## ', '')}</h2>`);
      continue;
    }

    if (inFaq) {
      if (line.startsWith('### ')) {
        if (currentFaqQ) {
          faqList.push({ q: currentFaqQ, a: currentFaqA.join(' ') });
        }
        currentFaqQ = line.replace('### ', '').trim();
        currentFaqA = [];
        continue;
      } else if (line.startsWith('## ')) {
        if (currentFaqQ) {
          faqList.push({ q: currentFaqQ, a: currentFaqA.join(' ') });
          currentFaqQ = '';
          currentFaqA = [];
        }
        inFaq = false;
      } else {
        currentFaqA.push(line);
        continue;
      }
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (inOl) { htmlParts.push('</ol>'); inOl = false; }
      if (!inUl) { htmlParts.push('<ul class="cg-article-list mb-4">'); inUl = true; }
      htmlParts.push(`  <li>${formatInline(line.slice(2).trim())}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (inUl) { htmlParts.push('</ul>'); inUl = false; }
      if (!inOl) { htmlParts.push('<ol class="cg-article-list mb-4">'); inOl = true; }
      htmlParts.push(`  <li>${formatInline(olMatch[2].trim())}</li>`);
      continue;
    }

    if (inUl) { htmlParts.push('</ul>'); inUl = false; }
    if (inOl) { htmlParts.push('</ol>'); inOl = false; }

    // Headings
    if (line.startsWith('### ')) {
      const heading = line.replace('### ', '').trim();
      const hId = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      htmlParts.push(`<h3 class="h4 fw-bold mt-4 mb-3" id="${hId}">${formatInline(heading)}</h3>`);
    } else if (line.startsWith('## ')) {
      const heading = line.replace('## ', '').trim();
      const hId = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      htmlParts.push(`<h2 class="h3 fw-bold mt-5 mb-3" id="${hId}">${formatInline(heading)}</h2>`);
    } else {
      htmlParts.push(`<p>${formatInline(line)}</p>`);
    }
  }

  if (inUl) htmlParts.push('</ul>');
  if (inOl) htmlParts.push('</ol>');
  if (inQuickAnswer) htmlParts.push('</div>');
  if (currentFaqQ) {
    faqList.push({ q: currentFaqQ, a: currentFaqA.join(' ') });
  }

  // Render FAQ accordion
  if (faqList.length > 0) {
    htmlParts.push(`          <div class="accordion cg-accordion mt-4 mb-5" id="faqAccordion">`);
    faqList.forEach((item, idx) => {
      const collapseId = `faqCollapse${idx + 1}`;
      const headingId = `faqHeading${idx + 1}`;
      const isFirst = idx === 0 ? 'show' : '';
      const isCollapsed = idx === 0 ? '' : 'collapsed';
      htmlParts.push(`            <div class="accordion-item mb-3" style="border: 1px solid #EBE3D5; border-radius: 12px; overflow: hidden;">
              <h3 class="accordion-header" id="${headingId}">
                <button class="accordion-button ${isCollapsed}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${idx === 0}" aria-controls="${collapseId}" style="background-color: #FAF8F5; font-weight: 600; color: var(--cg-primary-dark);">
                  ${item.q}
                </button>
              </h3>
              <div id="${collapseId}" class="accordion-collapse collapse ${isFirst}" aria-labelledby="${headingId}" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="background-color: #FFFFFF; line-height: 1.7; color: var(--cg-text);">
                  ${formatInline(item.a)}
                </div>
              </div>
            </div>`);
    });
    htmlParts.push(`          </div>`);
  }

  let finalBody = htmlParts.join('\n');

  // Insert targeted contextual internal links
  // 1. Link to Homepage
  // Find first occurrence of 'Hampersku' or 'perusahaan' in appropriate context
  finalBody = finalBody.replace(
    /(Hampersku)(?![^<]*>)/,
    '<a href="/" class="cg-article-link" title="Beranda Vendor Hampers Corporate Hampersku">Hampersku</a>'
  );

  // 2. Link to Landing page https://www.hamperscorporate.web.id/hampers-lebaran
  finalBody = finalBody.replace(
    /(hampers Lebaran untuk perusahaan|hampers Lebaran)(?![^<]*>)/i,
    '<a href="/hampers-lebaran" class="cg-article-link" title="Koleksi Lengkap Hampers Lebaran Perusahaan">$1</a>'
  );

  // 3. Cluster & Pilar cross linking
  if (articleKey === 'pilar') {
    // Add cluster references if not linked
    finalBody = finalBody.replace(
      /(klien dan relasi bisnis)(?![^<]*>)/i,
      '<a href="/blog/rekomendasi-hampers-lebaran-untuk-relasi-bisnis-dan-klien-perusahaan" class="cg-article-link">$1</a>'
    );
    finalBody = finalBody.replace(
      /(Hampers untuk Karyawan)(?![^<]*>)/i,
      '<a href="/blog/cara-memilih-hampers-lebaran-untuk-karyawan-perusahaan" class="cg-article-link">$1</a>'
    );
    finalBody = finalBody.replace(
      /(memesan hampers custom|hampers custom)(?![^<]*>)/i,
      '<a href="/blog/panduan-memesan-hampers-lebaran-custom-corporate-gifting" class="cg-article-link">$1</a>'
    );
  } else if (articleKey === 'c1') {
    finalBody = finalBody.replace(
      /(panduan memilih hampers Lebaran|memilih hampers Lebaran dengan cermat)(?![^<]*>)/i,
      '<a href="/blog/panduan-memilih-hampers-lebaran-untuk-perusahaan" class="cg-article-link">$1</a>'
    );
  } else if (articleKey === 'c2') {
    finalBody = finalBody.replace(
      /(panduan memilih hampers Lebaran untuk perusahaan|panduan umum hampers perusahaan)(?![^<]*>)/i,
      '<a href="/blog/panduan-memilih-hampers-lebaran-untuk-perusahaan" class="cg-article-link">$1</a>'
    );
  } else if (articleKey === 'c3') {
    finalBody = finalBody.replace(
      /(panduan memilih hampers Lebaran untuk perusahaan|panduan dasar corporate gifting)(?![^<]*>)/i,
      '<a href="/blog/panduan-memilih-hampers-lebaran-untuk-perusahaan" class="cg-article-link">$1</a>'
    );
    finalBody = finalBody.replace(
      /(relasi bisnis dan klien|klien prioritas)(?![^<]*>)/i,
      '<a href="/blog/rekomendasi-hampers-lebaran-untuk-relasi-bisnis-dan-klien-perusahaan" class="cg-article-link">$1</a>'
    );
  }

  return { htmlBody: finalBody, faqList };
}

function buildArticleHtml(article) {
  const rawText = fs.readFileSync(article.sourceFile, 'utf8');
  const { htmlBody, faqList } = processBodyText(rawText, article.key);

  const canonicalUrl = `https://www.hamperscorporate.web.id/blog/${article.slug}/`;
  const cleanUrl = `https://www.hamperscorporate.web.id/blog/${article.slug}`;

  // Build FAQ JSON-LD if present
  let faqJsonLd = '';
  if (faqList.length > 0) {
    const faqEntities = faqList.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }));
    faqJsonLd = `,
    {
      "@type": "FAQPage",
      "@id": "${canonicalUrl}#faq",
      "mainEntity": ${JSON.stringify(faqEntities, null, 8)}
    }`;
  }

  // Related posts box
  const otherArticles = articles.filter(a => a.key !== article.key);
  const relatedCards = otherArticles.map(rel => `
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm" style="border-radius: 12px; overflow: hidden; background: #fff;">
                  <img src="${rel.image}" class="card-img-top" alt="${rel.imageAlt}" style="height: 160px; object-fit: cover;" loading="lazy">
                  <div class="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <span class="badge mb-2" style="background: rgba(184, 134, 11, 0.12); color: var(--cg-primary-dark); font-size: 0.72rem;">${rel.category}</span>
                      <h4 class="card-title h6 fw-bold mb-2">
                        <a href="/blog/${rel.slug}" class="text-decoration-none text-dark stretched-link" style="font-size: 0.95rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                          ${rel.title}
                        </a>
                      </h4>
                    </div>
                    <div class="small text-muted mt-2" style="font-size: 0.78rem;">12 November 2026 &middot; ${rel.readTime}</div>
                  </div>
                </div>
              </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.seoTitle}</title>
  <meta name="description" content="${article.metaDesc}">
  <meta name="keywords" content="${article.focusKeyphrase}, hampers Lebaran perusahaan, hampers corporate Lebaran, hampers Idulfitri kantor, paket hampers Lebaran, vendor hampers Lebaran B2B">
  <meta name="author" content="Mochammad Evan Pratama">
  <meta name="publisher" content="Hampersku">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- GEO Meta Tags -->
  <meta name="geo.region" content="ID">
  <meta name="geo.placename" content="Malang">
  <meta name="geo.position" content="-7.983908;112.621391">
  <meta name="ICBM" content="-7.983908, 112.621391">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.metaDesc}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Hampers Corporate">
  <meta property="og:locale" content="id_ID">
  <meta property="og:image" content="https://www.hamperscorporate.web.id${article.image}">
  <meta property="og:image:secure_url" content="https://www.hamperscorporate.web.id${article.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta property="og:image:alt" content="${article.imageAlt}">
  <meta property="article:published_time" content="${article.datePublished}">
  <meta property="article:modified_time" content="${article.dateModified}">
  <meta property="article:author" content="Mochammad Evan Pratama">
  <meta property="article:section" content="${article.category}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.metaDesc}">
  <meta name="twitter:image" content="https://www.hamperscorporate.web.id${article.image}">
  <meta name="twitter:image:alt" content="${article.imageAlt}">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg?v=20261109_v3">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">

  <!-- Preconnect Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="/assets/css/style.css?v=20261111_v13_pill_flush">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "${canonicalUrl}#article",
        "headline": "${article.title.replace(/"/g, '\\"')}",
        "description": "${article.metaDesc.replace(/"/g, '\\"')}",
        "image": [
          "https://www.hamperscorporate.web.id${article.image}"
        ],
        "datePublished": "${article.datePublished}",
        "dateModified": "${article.dateModified}",
        "wordCount": "${article.wordCount}",
        "inLanguage": "id-ID",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${canonicalUrl}"
        },
        "isPartOf": {
          "@type": "Blog",
          "@id": "https://www.hamperscorporate.web.id/blog/#blog",
          "name": "Blog & Panduan Corporate Hampers — Hampersku",
          "url": "https://www.hamperscorporate.web.id/blog/"
        },
        "author": {
          "@type": "Person",
          "@id": "https://www.hamperscorporate.web.id/penulis#author",
          "name": "Mochammad Evan Pratama",
          "url": "https://www.hamperscorporate.web.id/penulis",
          "jobTitle": "Head of Corporate Curation & Gifting Strategy",
          "worksFor": {
            "@type": "Organization",
            "name": "Hampersku",
            "url": "https://www.hamperscorporate.web.id"
          }
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://www.hamperscorporate.web.id/#organization",
          "name": "Hampersku",
          "url": "https://www.hamperscorporate.web.id",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.hamperscorporate.web.id/assets/images/logo-hampersku.webp",
            "width": 165,
            "height": 38
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "${canonicalUrl}#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://www.hamperscorporate.web.id/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.hamperscorporate.web.id/blog/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${article.title.replace(/"/g, '\\"')}",
            "item": "${canonicalUrl}"
          }
        ]
      }${faqJsonLd}
    ]
  }
  </script>
</head>

<body class="cg-page-body">
  <a href="#main-content" class="skip-link">Loncat ke konten utama</a>

${getHeader(article.title, canonicalUrl)}

  <!-- Main Content -->
  <main id="main-content" class="cg-article-page py-5">
    <div class="cg-container">
      <div class="row justify-content-center">
        <div class="col-lg-9 col-xl-8">

          <!-- Breadcrumb -->
          <nav aria-label="Breadcrumb" class="cg-breadcrumb-nav mb-4">
            <ol class="cg-breadcrumb d-flex flex-wrap gap-2 list-unstyled small text-muted">
              <li><a href="/" class="text-decoration-none text-muted">Beranda</a> &rsaquo;</li>
              <li><a href="/blog" class="text-decoration-none text-muted">Blog</a> &rsaquo;</li>
              <li class="active text-dark fw-semibold" aria-current="page">${article.category}</li>
            </ol>
          </nav>

          <!-- Article Header -->
          <header class="cg-article-header mb-4">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="cg-badge" style="background: rgba(184, 134, 11, 0.12); color: var(--cg-primary-dark); font-weight: 700;">${article.category}</span>
              <span class="small text-muted">&bull;</span>
              <span class="small text-muted">${article.readTime}</span>
            </div>
            <h1 class="h2 fw-bold text-dark mb-3" style="line-height: 1.35; letter-spacing: -0.01em;">${article.title}</h1>
            
            <!-- Meta Bar -->
            <div class="d-flex align-items-center gap-3 py-3 border-top border-bottom">
              <a href="/penulis">
                <img src="/assets/images/mochammad-evan-pratama.webp" alt="Mochammad Evan Pratama" class="rounded-circle object-fit-cover shadow-sm" width="46" height="46">
              </a>
              <div>
                <div class="small fw-bold">
                  <a href="/penulis" class="text-decoration-none text-dark">Mochammad Evan Pratama</a>
                </div>
                <div class="text-muted" style="font-size: 0.8rem;">
                  Published 12 November 2026 &middot; Diperiksa oleh Tim Kurasi Hampersku
                </div>
              </div>
            </div>
          </header>

          <!-- Featured Image -->
          <figure class="cg-article-featured mb-5" style="border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
            <img src="${article.image}" alt="${article.imageAlt}" class="img-fluid w-100" style="object-fit: cover; max-height: 480px; display: block;" width="1200" height="675">
            <figcaption class="p-3 bg-light text-muted small text-center" style="font-size: 0.82rem; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
              ${article.imageAlt} &mdash; Koleksi Hampers Idulfitri Resmi Hampersku.
            </figcaption>
          </figure>

          <!-- Article Content -->
          <article class="cg-article-content" style="font-size: 1.05rem; line-height: 1.85; color: #374151;">
${htmlBody}
          </article>

${getPillarCta()}

${getAuthorBio()}

          <!-- Related Articles -->
          <div class="cg-related-articles mt-5 pt-4 border-top">
            <h3 class="h4 fw-bold mb-4" style="color: var(--cg-primary-dark);">Artikel Terkait Hampers Lebaran</h3>
            <div class="row g-4">
${relatedCards}
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>

${getFooter()}

  <!-- Bootstrap Bundle JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
</body>

</html>`;
}

// Generate all files
articles.forEach(art => {
  const htmlContent = buildArticleHtml(art);
  
  // 1. File blog/<slug>.html
  const filePath1 = path.join(__dirname, 'blog', `${art.slug}.html`);
  fs.writeFileSync(filePath1, htmlContent, 'utf8');
  console.log(`Wrote: ${filePath1}`);

  // 2. Directory blog/<slug>/index.html
  const dirPath = path.join(__dirname, 'blog', art.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath2 = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath2, htmlContent, 'utf8');
  console.log(`Wrote: ${filePath2}`);
});

console.log('All 4 blog articles generated successfully (8 HTML files total).');
