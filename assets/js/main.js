// CreaTech — scripts communs
(function () {
  var WHATSAPP = '22607106484';

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Ombre de l'en-tête au défilement
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Apparition au défilement
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -60px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Filtres des réalisations
  var filters = document.querySelectorAll('.filter-btn');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', b === btn); });
      document.querySelectorAll('.project[data-type]').forEach(function (p) {
        p.hidden = !(f === 'all' || p.getAttribute('data-type') === f);
      });
    });
  });

  // Formulaire de contact -> message WhatsApp pré-rempli
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = [
        'Bonjour CreaTech,',
        '',
        'Je m\'appelle ' + (d.get('nom') || '').trim() + (d.get('entreprise') ? ' (' + d.get('entreprise').trim() + ')' : '') + '.',
        'Je suis intéressé(e) par : ' + d.get('besoin') + '.',
        '',
        (d.get('message') || '').trim()
      ];
      if (d.get('telephone')) lines.push('', 'Mon numéro : ' + d.get('telephone').trim());
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }

  // Pré-sélection du besoin via ?besoin=...
  var select = document.getElementById('besoin');
  var param = new URLSearchParams(location.search).get('besoin');
  if (select && param) {
    Array.prototype.forEach.call(select.options, function (o) { if (o.value === param) select.value = param; });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
