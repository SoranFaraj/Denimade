/* ==========================================================================
   DENIMADE UF — interaktion
   Vanilla JS, inga beroenden. Allt innehåll är läsbart utan den här filen;
   skriptet lägger bara till lager ovanpå.
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- Header: hårlinje när sidan har scrollats ------------------------- */

  var header = document.querySelector('[data-header]');

  if (header) {
    var scrolled = false;

    var syncHeader = function () {
      var past = window.scrollY > 40;
      if (past !== scrolled) {
        scrolled = past;
        header.classList.toggle('is-scrolled', past);
      }
    };

    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  /* ---- "Om oss": hover sköts av CSS, klick och tangentbord av JS -------- */

  var group = document.querySelector('[data-nav-group]');

  if (group) {
    var groupToggle = group.querySelector('[data-nav-toggle]');
    var groupPanel = group.querySelector('[data-nav-panel]');

    var setGroup = function (open) {
      groupToggle.setAttribute('aria-expanded', String(open));
      groupPanel.setAttribute('data-open', String(open));
    };

    groupToggle.addEventListener('click', function () {
      setGroup(groupToggle.getAttribute('aria-expanded') !== 'true');
    });

    group.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setGroup(false);
        groupToggle.focus();
      }
    });

    /* Panelen får inte bli hängande öppen när fokus eller pekare lämnar. */
    group.addEventListener('focusout', function (event) {
      if (!group.contains(event.relatedTarget)) setGroup(false);
    });

    group.addEventListener('mouseleave', function () { setGroup(false); });

    document.addEventListener('click', function (event) {
      if (!group.contains(event.target)) setGroup(false);
    });
  }

  /* ---- Mobilmeny -------------------------------------------------------- */

  var burger = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');

  if (burger && menu) {
    var closeMenu = function (returnFocus) {
      burger.setAttribute('aria-expanded', 'false');
      menu.setAttribute('data-open', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      if (returnFocus) burger.focus();
    };

    var openMenu = function () {
      burger.setAttribute('aria-expanded', 'true');
      menu.setAttribute('data-open', 'true');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');

      /* Panelen måste ha hunnit bli synlig innan fokus kan flyttas dit. */
      var first = menu.querySelector('a, button');
      if (first) requestAnimationFrame(function () { first.focus(); });
    };

    burger.addEventListener('click', function () {
      if (burger.getAttribute('aria-expanded') === 'true') closeMenu(true);
      else openMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });

    /* Håll fokus kvar i panelen så länge den är öppen. */
    menu.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;

      var focusable = menu.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    /* Om skärmen växer till desktopbredd medan menyn är öppen. */
    var wide = window.matchMedia('(min-width: 64rem)');
    var onWide = function (event) {
      if (event.matches && burger.getAttribute('aria-expanded') === 'true') closeMenu(false);
    };

    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else wide.addListener(onWide);

    closeMenu(false);
  }

  /* ---- Reveal ----------------------------------------------------------- */

  var targets = document.querySelectorAll('.reveal');

  if (!targets.length) return;

  if (reduced.matches || !('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  targets.forEach(function (target) {
    /* Element som redan syns vid inladdning ska inte tona in efteråt. */
    var box = target.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.9) target.classList.add('is-in');
    else observer.observe(target);
  });
}());
