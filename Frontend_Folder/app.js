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

  function setupFAQ() {
    var questions = document.querySelectorAll('.faq__question-btn');
    var answerText = document.getElementById('faq-answer-text');
    if (!questions.length || !answerText) return;

    var answers = {
      0: "Konsume is a local market-commerce platform built for people who cook often. It brings the market online with real prices, multiple vendors for the same item, bargaining, and pooled buying. Every price is verified by our team on the ground, and the only extra cost is delivery, which we keep low by clustering nearby orders.",
      1: "Yes, Konsume specializes in fresh groceries, raw foods, and market ingredients directly sourced from local markets and delivered straight to your doorstep.",
      2: "This is the question we built the entire platform around. Konsume has physical teams present inside the markets we source from. They check actual prices on the ground regularly and cross-reference them against what vendors are listing on the app. If a vendor lists above the verified market rate, the listing is flagged and corrected before it reaches you. Beyond that, because multiple vendors list the same product at different prices, they compete with each other the same way stall owners compete in a physical market, which naturally keeps pricing honest without us having to force it.",
      3: "In a physical market, six people can pool money together to buy an entire apere of pepper (the big basket) and split it equally. Everyone gets far more quantity per naira than if they had bought individually from a roadside seller. Konsume digitises this exactly. For each product, an open pool is created with a target amount. Strangers on the platform contribute toward that target. Once the pool fills, within 24 hours, Konsume buys the bulk quantity, splits it proportionally based on each person's contribution, and delivers each share. If the pool does not fill within 24 hours, every kobo contributed is automatically refunded. No risk. No commitment beyond your contribution.",
      4: "Yes, and this is by design. Konsume offers two completely separate purchase modes that coexist on the same platform. Individual purchase lets you order at the standard market price from a vendor of your choice and receive delivery the same day or next day. Pool purchase lets you opt into a group buy for below-market bulk pricing, with delivery dependent on when the pool fills. You choose based on what you need that day. Need pepper urgently? Buy individually. Planning your weekly foodstuff in advance and want to stretch your budget further? Join a pool. Both options are always available for the same product.",
      5: "One vendor is exactly the problem with every other platform that tried this before us. When there is only one seller, there is no competition, no price pressure, and no reason for that seller to offer you their best price. In a real market, the presence of ten tomato sellers beside each other forces every one of them to price fairly, because the buyer can simply walk to the next stall. Konsume replicates this deliberately. Multiple vetted vendors list the same product at different prices and quality grades. You can choose the cheapest option, the freshest option, or the vendor with the best reviews. Competition between sellers is not a feature of Konsume, it is the foundation of it.",
      6: "Yes. Haggling is one of the most culturally embedded parts of Nigerian market shopping and Konsume is the only platform that has digitised it. If a vendor lists tomatoes at ₦1,800 and you believe ₦1,600 is the right price, you can make that counter-offer directly to the vendor through the platform. If the vendor accepts, the transaction proceeds at your negotiated price. If they decline, you are free to move to another vendor listing the same product. This is not a gimmick: it is a direct reflection of how transactions have always worked in Nigerian markets, now brought into a digital environment where most platforms have completely stripped it out in the name of \"clean UX.\"",
      7: "Every vendor on Konsume goes through a vetting process before their listings go live. Beyond the initial verification, the platform builds a trust score for each vendor over time, calculated from their order fulfilment rate, their average customer ratings, and their transaction history. When you browse listings for any product, you can see each vendor's trust score and read reviews from previous buyers who received actual deliveries. The multi-vendor model also creates a natural accountability mechanism: a vendor who consistently delivers poor quality or short-weights orders will accumulate bad reviews and lose buyers to competing vendors on the same product listing. The market polices itself.",
      8: "Quality control for pool orders is managed by Konsume's physical team at the market, not by individual vendors self-reporting. When a pool fills and the bulk purchase is made, our team is on the ground inspecting the goods before they are split and packed for delivery. Each portion is weighed and packed according to the contributor's payment amount. If a delivery arrives with a quality issue that was not caught at the inspection stage, Konsume's dispute resolution process covers it: the vendor bears the cost, not the buyer. The details of our return and refund policy are available at checkout before you confirm any order.",
      9: "Konsume launches with a focused geographic strategy, starting with one major market cluster and the residential areas within its natural catchment zone. The reason for this is not a limitation but a deliberate quality decision: we would rather serve one area exceptionally well than spread thinly across Lagos and deliver a mediocre experience everywhere. Our sourcing begins with one of Lagos's major wholesale markets (the kind that smaller neighbourhood markets and roadside sellers themselves buy from). This means the prices you access on Konsume are as close to the original wholesale source as possible. As fulfilment quality and logistics are proven, we expand zone by zone.",
      10: "Konsume works for both. Individual buyers use it for weekly household foodstuff, including the rice, beans, pepper, tomatoes, and proteins that a family needs regularly. The pool buying feature is particularly suited to households that plan their shopping in advance and want to maximise how far their food budget stretches. Small food businesses (mama put operators, small restaurants, catering services) can also use Konsume to source raw ingredients at market or below-market prices, with the option to initiate their own pool orders for the specific quantities they need. If you are buying consistently large quantities, the individual purchase mode allows you to select vendors offering bulk quantities and negotiate pricing directly."
    };

    questions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        questions.forEach(function (q) {
          q.classList.remove('faq__question-btn--active');
        });
        btn.classList.add('faq__question-btn--active');

        var id = btn.getAttribute('data-faq');
        if (answers[id] !== undefined) {
          answerText.textContent = answers[id];
        }
      });
    });
  }

  // Start all once DOM is ready
  function init() {
    createTypewriter(heroEl, heroPhrases);
    setupMobileMenu();
    setupHIWCarousel();
    setupFAQ();
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
