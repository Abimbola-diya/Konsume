// ═══════════════════════════════════════════════════════
//  KONSUME — Typewriter Engine
//  Reusable: drives both the hero and market-ready sections.
//  Each instance gets its own phrases, element, and timing.
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  /**
   * Creates a self-contained typewriter loop.
   * @param {HTMLElement} el        — the <span> to type into
   * @param {string[]}    phrases   — array of strings to cycle
   * @param {object}      [opts]    — optional speed overrides
   */
  function createTypewriter(el, phrases, opts) {
    if (!el) return;

    const TYPE_SPEED = (opts && opts.typeSpeed) || 70;
    const ERASE_SPEED = (opts && opts.eraseSpeed) || 35;
    const PAUSE_AFTER = (opts && opts.pauseAfter) || 2000;
    const PAUSE_BEFORE = (opts && opts.pauseBefore) || 400;

    let phraseIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    function tick() {
      const current = phrases[phraseIndex];

      if (!isErasing) {
        charIndex++;
        el.textContent = current.substring(0, charIndex);

        if (charIndex === current.length) {
          isErasing = true;
          setTimeout(tick, PAUSE_AFTER);
        } else {
          setTimeout(tick, TYPE_SPEED);
        }
      } else {
        charIndex--;
        el.textContent = current.substring(0, charIndex);

        if (charIndex === 0) {
          isErasing = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, PAUSE_BEFORE);
        } else {
          setTimeout(tick, ERASE_SPEED);
        }
      }
    }

    setTimeout(tick, PAUSE_BEFORE);
  }

  function setupMobileMenu() {
    const moreBtn = document.getElementById('more-btn');
    const menu = document.getElementById('mobile-menu');

    if (!moreBtn || !menu) return;

    const closeTargets = menu.querySelectorAll('[data-menu-close]');
    const menuLinks = menu.querySelectorAll('a');
    const mobileQuery = window.matchMedia('(max-width: 900px)');

    function openMenu() {
      if (!mobileQuery.matches) return;
      document.body.classList.add('menu-open');
      menu.setAttribute('aria-hidden', 'false');
      moreBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      document.body.classList.remove('menu-open');
      menu.setAttribute('aria-hidden', 'true');
      moreBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      if (document.body.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    moreBtn.addEventListener('click', toggleMenu);

    closeTargets.forEach(function (target) {
      target.addEventListener('click', closeMenu);
    });

    menuLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuLinks.forEach(function (item) {
          item.classList.remove('is-active');
        });
        link.classList.add('is-active');
        closeMenu();
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    mobileQuery.addEventListener('change', function (event) {
      if (!event.matches) {
        closeMenu();
      }
    });
  }

  // ── Hero typewriter ──────────────────────────────────
  const heroEl = document.getElementById('typed-text');
  const heroPhrases = [
    'Price first, convenience second.',
    'Food is Cheaper when bought together.',
    'Buy together, save more.',
    'Bulk Buying made simple.'
  ];

  // ── Market-ready typewriter ──────────────────────────
  const marketEl = document.getElementById('market-typed-text');
  const marketPhrases = [

    'How many times you go talk “last price”?',
    'Still pricing tomatoes under hot sun?',
    'Who send you go Mile 12 by 6am?',
    'The market is 45 minutes away. Your phone is in your hand.',
    "You've been managing that small nylon of pepper for too long."
  ];

  function typeSlideTitle(el, text, speed) {
    if (!el) return;
    el.textContent = '';
    var i = 0;

    if (el.typingInterval) {
      clearInterval(el.typingInterval);
    }

    el.classList.add('hiw__typing-cursor');

    el.typingInterval = setInterval(function () {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(el.typingInterval);
        el.typingInterval = null;
        setTimeout(function () {
          el.classList.remove('hiw__typing-cursor');
        }, 1500);
      }
    }, speed || 85);
  }

  // ── HIW Carousel ──────────────────────────────────────
  function setupHIWCarousel() {
    var section = document.querySelector('.hiw');
    var track = document.getElementById('hiw-track');
    var prevBtn = document.getElementById('hiw-prev');
    var nextBtn = document.getElementById('hiw-next');
    if (!section || !track || !prevBtn || !nextBtn) return;

    var dots = section.querySelectorAll('.hiw__dot');
    var slides = track.querySelectorAll('.hiw__slide');
    var total = slides.length;
    var current = 0;
    var autoTimer = null;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      // Update dots
      dots.forEach(function (d) { d.classList.remove('hiw__dot--active'); });
      if (dots[current]) dots[current].classList.add('hiw__dot--active');
      // Update data attribute for CSS color theming
      section.setAttribute('data-active-slide', String(current));

      // Custom typing effect for Slide 0, Slide 1, and Slide 2
      if (current === 0) {
        var titleEl = document.getElementById('hiw-slide-0-title');
        if (titleEl) {
          typeSlideTitle(titleEl, 'How Konsume works', 85);
        }
      } else if (current === 1) {
        var titleEl1 = document.getElementById('hiw-slide-1-title');
        if (titleEl1) {
          typeSlideTitle(titleEl1, 'Drop your location', 85);
        }
      } else if (current === 2) {
        var titleEl2 = document.getElementById('hiw-slide-2-title');
        if (titleEl2) {
          typeSlideTitle(titleEl2, 'Pool with others', 85);
        }
      } else if (current === 3) {
        var titleEl3 = document.getElementById('hiw-slide-3-title');
        if (titleEl3) {
          typeSlideTitle(titleEl3, 'You buy. We carry', 85);
        }
      } else if (current === 4) {
        var titleEl4 = document.getElementById('hiw-slide-4-title');
        if (titleEl4) {
          typeSlideTitle(titleEl4, 'Ready to Buy ?', 85);
        }
      }
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function () { goTo(current + 1); }, 7000);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    prevBtn.addEventListener('click', function () { stopAuto(); goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', function () { stopAuto(); goTo(current + 1); startAuto(); });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var target = parseInt(dot.getAttribute('data-goto'), 10);
        if (!isNaN(target)) { stopAuto(); goTo(target); startAuto(); }
      });
    });

    // Initialize
    goTo(0);
    startAuto();
  }

  // Start both once DOM is ready
  function init() {
    createTypewriter(heroEl, heroPhrases);
    setupMobileMenu();
    setupHIWCarousel();
    // Slight delay so the two typewriters don't perfectly sync
    setTimeout(function () {
      createTypewriter(marketEl, marketPhrases, {
        typeSpeed: 65,
        eraseSpeed: 30,
        pauseAfter: 2200,
        pauseBefore: 500
      });
    }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
