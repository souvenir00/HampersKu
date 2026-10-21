/**
 * HAMPERSKU - Vanilla JavaScript
 * Lightweight, accessible, no heavy frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
  // Critical for initial UI & layout
  initNavbar();
  initScrollHeader();
  initHeroAnimations();

  // Defer non-critical handlers in ultra-light microtasks
  const queueTasks = [
    () => { initFaqAccordion(); initPortfolioFilter(); },
    () => { initConsultationForm(); initBackToTop(); },
    () => { initWhatsAppTracking(); initScrollProgress(); },
    () => { initCounterAnimations(); initInteractiveMicroEffects(); }
  ];

  const runQueue = () => {
    if (!queueTasks.length) return;
    const fn = queueTasks.shift();
    try { fn(); } catch(e) { console.warn(e); }
    if (queueTasks.length) {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(runQueue);
      } else {
        setTimeout(runQueue, 16);
      }
    }
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(runQueue, { timeout: 1500 });
  } else {
    setTimeout(runQueue, 40);
  }

  // Defer scroll animations to first scroll or 2.5s idle to eliminate main-thread long tasks
  let scrollAnimInit = false;
  const triggerScrollAnim = () => {
    if (scrollAnimInit) return;
    scrollAnimInit = true;
    window.removeEventListener('scroll', triggerScrollAnim);
    initScrollAnimations();
  };
  window.addEventListener('scroll', triggerScrollAnim, { passive: true });
  setTimeout(triggerScrollAnim, 2800);
});
  } else {
    setTimeout(runQueue, 30);
  }
});

/**
 * Mobile Navbar & Accessible Dropdown
 */
function initNavbar() {
  const toggleBtn = document.querySelector('.cg-nav-toggle');
  const navMenuWrap = document.querySelector('.cg-nav-menu-wrap');
  const dropdownItems = document.querySelectorAll('.cg-nav-item.dropdown');

  if (toggleBtn && navMenuWrap) {
    const hamburgerSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const closeSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    const setToggleState = (expanded) => {
      toggleBtn.setAttribute('aria-expanded', expanded);
      toggleBtn.setAttribute('aria-label', expanded ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi');
      toggleBtn.innerHTML = expanded ? closeSvg : hamburgerSvg;
      if (expanded) {
        navMenuWrap.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        navMenuWrap.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setToggleState(!isExpanded);
    });

    // Close when clicking outside or pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenuWrap.classList.contains('active')) {
        setToggleState(false);
        toggleBtn.focus();
      }
    });

    // Close on navigation link click inside mobile drawer
    const links = navMenuWrap.querySelectorAll('a:not(.cg-nav-link-dropdown)');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          setToggleState(false);
        }
      });
    });
  }

  // Dropdown toggle on mobile & touch: supports both opening and closing on tap
  dropdownItems.forEach(item => {
    const trigger = item.querySelector('.cg-nav-link-dropdown');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth < 992 || window.matchMedia('(hover: none)').matches) {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.contains('show');
          dropdownItems.forEach(d => {
            d.classList.remove('show');
            const otherTrigger = d.querySelector('.cg-nav-link-dropdown');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          });
          if (!isOpen) {
            item.classList.add('show');
            trigger.setAttribute('aria-expanded', 'true');
          } else {
            item.classList.remove('show');
            trigger.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }
  });
}

/**
 * Header sticky shadow on scroll
 */
function initScrollHeader() {
  const header = document.querySelector('.cg-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * FAQ Accordion with Accessibility
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.cg-faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.cg-faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.cg-faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Portfolio Filter Bar
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.cg-filter-btn');
  const portfolioItems = document.querySelectorAll('[data-category]');
  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCat === filterValue) {
          item.style.display = '';
          item.removeAttribute('aria-hidden');
        } else {
          item.style.display = 'none';
          item.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/**
 * Consultation Brief Form -> Formats WhatsApp Message & Directs
 */
function initConsultationForm() {
  const form = document.getElementById('cg-consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
    const company = form.elements['company'] ? form.elements['company'].value.trim() : '-';
    const packageType = form.elements['package_type'] ? form.elements['package_type'].value : 'Corporate Gift';
    const quantity = form.elements['quantity'] ? form.elements['quantity'].value.trim() : '-';
    const deadline = form.elements['deadline'] ? form.elements['deadline'].value.trim() : '-';
    const city = form.elements['city'] ? form.elements['city'].value.trim() : '-';
    const brief = form.elements['brief'] ? form.elements['brief'].value.trim() : '';

    if (!name) {
      alert('Mohon masukkan nama Anda.');
      return;
    }

    // Compose formatted WhatsApp text message
    const waText = 
      `Halo Tim Hampersku, saya ingin konsultasi pengadaan corporate hampers & gift box.\n\n` +
      `*Nama:* ${name}\n` +
      `*Perusahaan/Instansi:* ${company}\n` +
      `*Jenis Paket:* ${packageType}\n` +
      `*Perkiraan Jumlah:* ${quantity} pcs / paket\n` +
      `*Target Tanggal:* ${deadline}\n` +
      `*Kota Pengiriman:* ${city}\n` +
      `*Catatan/Brief:* ${brief ? brief : '-'}\n\n` +
      `Mohon informasi rekomendasi hampers dan estimasi penawarannya. Terima kasih!`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/6282131087971?text=${encodedText}`;

    const feedback = document.getElementById('form-feedback');
    if (feedback) {
      feedback.classList.add('success');
      feedback.innerHTML = `<strong>Menghubungkan ke WhatsApp Hampersku...</strong><br>Jika jendela chat tidak terbuka otomatis, <a href="${waUrl}" target="_blank" rel="noopener noreferrer">klik di sini</a>.`;
    }

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/**
 * Back to top floating button
 */
function initBackToTop() {
  const backBtn = document.querySelector('.cg-back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * WhatsApp Click Analytics Tracker Event Hook
 */
function initWhatsAppTracking() {
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  waLinks.forEach(link => {
    link.addEventListener('click', () => {
      const source = link.getAttribute('data-wa-source') || 'general_cta';
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'Lead Intent',
          event_label: source
        });
      }
      console.info(`[Hampersku Analytics] WhatsApp lead intent clicked from: ${source}`);
    });
  });
}

/**
 * Scroll Progress Indicator Bar at Viewport Top
 */
function initScrollProgress() {
  let bar = document.querySelector('.cg-scroll-progress');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'cg-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
  }

  // If browser supports CSS scroll-timeline, CSS animates via compositor (0 reflow!)
  if (window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()')) {
    return;
  }

  // Fallback for older browsers: cache height to avoid synchronous layout queries
  let maxScroll = 1;
  const updateMetrics = () => {
    maxScroll = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
  };
  window.addEventListener('resize', updateMetrics, { passive: true });
  updateMetrics();

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        bar.style.transform = `scaleX(${scrolled})`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Hero & Page Header Entrance Animations on Load
 */
function initHeroAnimations() {
  // Homepage hero elements
  const hero = document.querySelector('.cg-hero');
  if (hero) {
    const eyebrow = hero.querySelector('.cg-eyebrow');
    const title = hero.querySelector('h1');
    const lead = hero.querySelector('.cg-lead');
    const ctaWrap = hero.querySelector('.d-flex.flex-wrap.gap-3');
    const note = hero.querySelector('.small.text-muted');
    const visual = hero.querySelector('.cg-hero-visual');

    if (eyebrow) eyebrow.classList.add('hero-anim-eyebrow');
    if (title) title.classList.add('hero-anim-title');
    if (lead) lead.classList.add('hero-anim-lead');
    if (ctaWrap) ctaWrap.classList.add('hero-anim-cta');
    if (note) note.classList.add('hero-anim-note');
    if (visual) visual.classList.add('hero-anim-visual');
  }

  // Subpage header elements
  const subpageHeader = document.querySelector('.cg-section-sm.cg-bg-soft, .cg-page-header');
  if (subpageHeader) {
    const breadcrumb = subpageHeader.querySelector('.cg-breadcrumb');
    const h1 = subpageHeader.querySelector('h1');
    const lead = subpageHeader.querySelector('.cg-lead');
    const eyebrow = subpageHeader.querySelector('.cg-eyebrow');

    if (eyebrow) eyebrow.classList.add('hero-anim-eyebrow');
    if (h1) h1.classList.add('hero-anim-title');
    if (lead) lead.classList.add('hero-anim-lead');
  }
}

/**
 * Scroll Reveal Animations (IntersectionObserver Engine)
 */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  document.documentElement.classList.add('js-anim-ready');

  // Select key components to animate on scroll across all pages
  const targets = document.querySelectorAll(
    '.cg-card, .cg-feature-card, .cg-portfolio-card, .cg-step-card, ' +
    '.cg-faq-item, .cg-cta-banner, .cg-form-box, ' +
    '.cg-section > .cg-container > .text-center, ' +
    '.cg-prose > h2, .cg-article-toc, ' +
    '[data-animate], .reveal'
  );

  if (!targets.length) return;

  // Stagger siblings in same row/grid for dynamic cascade
  const parents = new Set();
  targets.forEach(target => {
    target.classList.add('reveal-item');
    if (target.parentElement) parents.add(target.parentElement);
  });

  parents.forEach(parent => {
    const children = Array.from(parent.children).filter(child => child.classList.contains('reveal-item'));
    if (children.length > 1) {
      children.forEach((child, index) => {
        child.style.transitionDelay = `${(index % 4) * 110}ms`;
      });
    }
  });

  // Observe elements
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(target => observer.observe(target));
}

/**
 * Dynamic Counter Animation for Numbers and Statistics
 */
function initCounterAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = 1600;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = ease * target;

      el.textContent = prefix + (decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal).toLocaleString('id-ID')) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('id-ID')) + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

/**
 * Interactive Desktop Micro-Tilt on Cards
 */
function initInteractiveMicroEffects() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.cg-card, .cg-portfolio-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = (y / rect.height) * -3.5;
        const tiltY = (x / rect.width) * 3.5;
        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}
