/* ================================================
   SALMAN COLORS — Main JS
   ================================================ */
'use strict';

/* ── NAVBAR SCROLL ─────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    if (y > 120) {
      navbar.classList.toggle('navbar-hidden', y > lastScrollY);
    } else {
      navbar.classList.remove('navbar-hidden');
    }
    lastScrollY = y;
  }, { passive: true });
}

/* ── MOBILE MENU ───────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── ACTIVE NAV LINK ───────────────────────────── */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

/* ── HERO PARALLAX ─────────────────────────────── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  document.querySelector('.hero')?.classList.add('loaded');
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.28}px)`;
  }, { passive: true });
}

/* ── AOS (Animate on Scroll) ───────────────────── */
(function initAOS() {
  const items = document.querySelectorAll('[data-aos]');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseInt(e.target.dataset.aosDelay || '0', 10);
      setTimeout(() => e.target.classList.add('aos-animate'), delay);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -55px 0px' });
  items.forEach(el => obs.observe(el));
})();

/* ── STATS COUNTER ─────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const dur = 1800;
      const start = performance.now();
      (function update(now) {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.floor(ease * target) + suffix;
        if (t < 1) requestAnimationFrame(update);
      })(performance.now());
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
})();

/* ── SERVICES INTERACTIVE LIST ─────────────────── */
(function initServices() {
  const items  = document.querySelectorAll('.svc-item');
  const slides = document.querySelectorAll('.svc-slide');
  if (!items.length) return;
  function activate(idx) {
    items.forEach((el, i)  => el.classList.toggle('active', i === idx));
    slides.forEach((sl, i) => sl.classList.toggle('active', i === idx));
  }
  items.forEach((item, i) => {
    item.addEventListener('click', () => activate(i));
  });
  activate(0);
})();

/* ── SKILL BARS ────────────────────────────────── */
(function initSkills() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.pct + '%';
      obs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  fills.forEach(f => obs.observe(f));
})();

/* ── TESTIMONIALS SLIDER ───────────────────────── */
(function initTestimonials() {
  const track = document.querySelector('.testi-track');
  if (!track) return;
  const cards   = track.querySelectorAll('.testi-card');
  const dotsWrap = document.querySelector('.testi-dots');
  const prevBtn  = document.querySelector('.testi-prev');
  const nextBtn  = document.querySelector('.testi-next');
  let current = 0;
  let timer;

  const dots = Array.from({ length: cards.length }, (_, i) => {
    const d = document.createElement('button');
    d.className = 'testi-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap?.appendChild(d);
    return d;
  });

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    track.style.transform = `translateX(${current * 100 * (document.documentElement.lang === 'ar' ? 1 : -1)}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5500);
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  resetTimer();
})();

/* ── PORTFOLIO FILTER ──────────────────────────── */
(function initFilter() {
  const tabs  = document.querySelectorAll('.f-tab');
  const items = document.querySelectorAll('.proj-card, .port-item');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.filter;
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ── LIGHTBOX ──────────────────────────────────── */
(function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg  = lb.querySelector('.lb-img');
  const lbPrev = lb.querySelector('.lb-prev');
  const lbNext = lb.querySelector('.lb-next');
  let items = [], cur = 0;

  document.querySelectorAll('[data-lb]').forEach((el, i) => {
    const img = el.querySelector('img');
    items.push({ el, cap: el.querySelector('.port-title, h4')?.textContent || '' });
    el.addEventListener('click', () => { items[i].src = img?.src || ''; open(i); });
  });

  function open(i) {
    cur = i; lbImg.src = items[cur].src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.src = ''; }
  function nav(d) { open((cur + d + items.length) % items.length); }

  lb.querySelector('.lb-close')?.addEventListener('click', close);
  lbPrev?.addEventListener('click', () => nav(-1));
  lbNext?.addEventListener('click', () => nav(1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') nav(document.documentElement.lang === 'ar' ? -1 : 1);
    if (e.key === 'ArrowLeft')  nav(document.documentElement.lang === 'ar' ? 1 : -1);
  });
})();

/* ── SCROLL TO TOP ─────────────────────────────── */
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── CONTACT FORM ──────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    const name    = form.querySelector('[name="name"]')?.value || '';
    const phone   = form.querySelector('[name="phone"]')?.value || '';
    const service = form.querySelector('[name="service"]')?.value || '';
    const msg     = form.querySelector('[name="message"]')?.value || '';
    const lang    = document.documentElement.lang;
    const text = encodeURIComponent(
      lang === 'fr'
        ? `Bonjour 👋\nNom: ${name}\nTél: ${phone}\nService: ${service}\nMessage: ${msg}`
        : `السلام عليكم 👋\nالاسم: ${name}\nالهاتف: ${phone}\nالخدمة: ${service}\nالرسالة: ${msg}`
    );
    window.open(`https://wa.me/212662193210?text=${text}`, '_blank');
    setTimeout(() => {
      form.style.display = 'none';
      const ok = document.getElementById('formSuccess');
      if (ok) ok.style.display = 'flex';
    }, 500);
  });
})();

/* ── LANGUAGE SWITCHER ─────────────────────────── */
(function initLang() {
  const saved = localStorage.getItem('sc-lang') || 'fr';
  applyLang(saved, false);

  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      applyLang(document.documentElement.lang === 'ar' ? 'fr' : 'ar', true);
    });
  });
  document.querySelectorAll('.lang-label[data-lang]').forEach(lbl => {
    lbl.addEventListener('click', () => applyLang(lbl.dataset.lang, true));
  });
})();

function applyLang(lang, animate) {
  if (animate) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.2s';
    setTimeout(() => { document.body.style.opacity = '1'; }, 220);
  }
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('sc-lang', lang);
  document.querySelectorAll('.lang-label[data-lang]').forEach(l => {
    l.classList.toggle('active', l.dataset.lang === lang);
  });
  // Update testi slider direction on switch
  const track = document.querySelector('.testi-track');
  if (track) track.style.transform = 'translateX(0)';
  // Bilingual placeholders on contact form inputs
  document.querySelectorAll('.bilingual-placeholder').forEach(el => {
    const ph = lang === 'fr' ? el.getAttribute('placeholder-fr') : el.getAttribute('placeholder-ar');
    if (ph) el.placeholder = ph;
  });
  // Flag emoji on the toggle thumb circle
  document.querySelectorAll('.lang-thumb').forEach(t => {
    t.textContent = lang === 'fr' ? '🇫🇷' : '🇲🇦';
  });
}

/* ── PAGE FADE IN ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.45s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});


/* ── Meta Pixel events (Lead on WhatsApp + forms) ── */
(function () {
  function lead() { if (window.fbq) fbq('track', 'Lead'); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me"], .btn-whatsapp, .wa-float-orange');
    if (a) lead();
  });
  ['contactForm', 'devisForm'].forEach(function (id) {
    var f = document.getElementById(id);
    if (f) f.addEventListener('submit', lead);
  });
  var p = location.pathname.toLowerCase();
  if (window.fbq && (p.indexOf('services') > -1 || p.indexOf('realisation') > -1)) {
    fbq('track', 'ViewContent');
  }
})();
