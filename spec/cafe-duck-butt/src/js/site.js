/* Café Duck Butt — enhancement only. The HTML is complete without this file.
   ─────────────────────────────────────────────────────────────────────────────
   OWNER GATES. Flip to true after the owner confirms. Each flag reveals only its own value.
   Where a value is needed, it lives in the HTML as data-value on the matching [data-gate] element;
   a flag with an empty data-value keeps the em-dash and the stamp, so nothing unconfirmed can leak. */
var FLAGS = {
  'phone.telVerified':    false, // wraps every (808) 593-1880 in a tel: link           (FACTS F056, Q1)
  'hours.daysConfirmed':  false, // shows "Seven nights a week" + enables the open-now chip (C1, Q2)
  'prices.food':          false, // shows food prices typed into data-value on each .row__price (F120, Q7)
  'prices.drinks':        false, // shows drink prices typed into data-value (F139, Q7)
  'rooms.perSong':        false, // shows the per-song price typed into data-value (C4, Q3)
  'rooms.minimum':        false, // shows the minimum (or "None") typed into data-value (F155, Q4)
  'rooms.blocksConfirmed':false, // shows "5–8 · 8–11" (F161, Q5)
  'parking.validation':   false, // "Validated parking available" (F058, Q11)
  'parking.valet':        false, // "Valet available" (F060, Q11)
  'amenities.pool':       false, // reveals "Pool table" (F171, Q22)
  'social.facebook':      false, // reveals the Facebook link in the footer (F065 / C17, Q16)
  'sign.duckConfirmed':   false, // adds "Look for the duck on the sign." to Find us (F270, Q20)
  'name.hangulStandard':  false, // swaps 오리궁뎅이 (as the owners say it) for dictionary 오리궁둥이 (Q26)
  'photos.showSlots':     false  // reveals the labelled, aspect-locked photo slots for the photo conversation (Q20)
};
var TEL = '+18085931880'; // only used when phone.telVerified is true

(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- gates */
  function on(flag) { return FLAGS[flag] === true; }

  Array.prototype.forEach.call(d.querySelectorAll('[data-gate]'), function (el) {
    var flag = el.getAttribute('data-gate');
    if (!on(flag)) return;
    if (el.classList.contains('gate')) {
      var v = el.getAttribute('data-value') || '';
      if (!v) return;                       // confirmed but no value typed: stay gated
      var out = el.querySelector('.gate__value');
      if (out) out.textContent = v;
      el.classList.add('is-on');
    } else if (el.hasAttribute('hidden')) {
      el.removeAttribute('hidden');         // boolean reveal (pool table, facebook, photo slots)
    }
  });

  if (on('phone.telVerified')) {
    Array.prototype.forEach.call(d.querySelectorAll('.phone[data-phone]'), function (el) {
      if (el.closest('a')) return;
      var a = d.createElement('a');
      a.href = 'tel:' + TEL; a.className = el.className; a.textContent = el.textContent;
      el.parentNode.replaceChild(a, el);
    });
  }

  if (on('name.hangulStandard')) {
    Array.prototype.forEach.call(d.querySelectorAll('[data-hangul]'), function (el) { el.textContent = '오리궁둥이'; });
  }

  /* ---------------------------------------------------------------- open-now chip (only with confirmed days) */
  var chip = d.getElementById('open-chip');
  if (chip && on('hours.daysConfirmed')) {
    try {
      var h = Number(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'Pacific/Honolulu' }).format(new Date()));
      if (h === 24) h = 0;
      var openNow = (h >= 17 || h < 2);
      chip.classList.add(openNow ? 'is-open' : 'is-closed');
      chip.querySelector('.chip__en').textContent = openNow ? 'till 2 AM' : '5 PM – 2 AM';
    } catch (e) { /* leave the static chip */ }
  }

  /* ---------------------------------------------------------------- motion (one-shot reveals; never on reduced motion) */
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = d.querySelectorAll('.reveal, .melon, .phone-card');
    if (targets.length) {
      root.classList.add('io');             // pre-states only apply once observers are live
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -5% 0px' });
      Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
      // Anything already in view at load is revealed on the next frame so it never flashes hidden.
      requestAnimationFrame(function () {
        Array.prototype.forEach.call(targets, function (t) {
          var r = t.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) t.classList.add('is-in');
        });
      });
      // Safety net: whatever the observer misses is revealed after 4s.
      setTimeout(function () { Array.prototype.forEach.call(targets, function (t) { t.classList.add('is-in'); }); }, 4000);
    }
  }

  /* ---------------------------------------------------------------- song queue (user-driven only) */
  var list = d.getElementById('queue'), next = d.getElementById('queue-next');
  if (list && next) {
    next.removeAttribute('hidden');
    var busy = false;
    next.addEventListener('click', function () {
      if (busy) return;
      var first = list.firstElementChild;
      if (!first) return;
      if (reduce) { list.appendChild(first); return; }
      busy = true;
      var rowH = first.getBoundingClientRect().height + 6;
      list.style.transition = 'transform 400ms ease-out';
      list.style.transform = 'translateY(-' + rowH + 'px)';
      setTimeout(function () {
        list.style.transition = 'none';
        list.style.transform = '';
        list.appendChild(first);
        busy = false;
      }, 420);
    });
  }
})();
