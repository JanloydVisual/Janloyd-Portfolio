const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => observer.observe(el));

  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function() {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

(function() {
    var iframe = document.querySelector('.reel-landscape-wrap iframe');
    if (!iframe) return;
    var player = new Vimeo.Player(iframe);

    // Attempt to pick the best quality within 1080pâ€”2160p (4k).
    player.ready().then(function() {
      if (typeof player.getQualities === 'function') {
        player.getQualities().then(function(qualities) {
          try {
            // Normalize quality labels
            var labels = qualities.map(function(q) {
              if (typeof q === 'string') return q;
              return q.quality || q.label || q.name || (q.height ? q.height + 'p' : null);
            }).filter(Boolean);

            // Preferred order: 2160p, 1440p, 1080p
            var preferredOrder = ['2160p', '1440p', '1080p'];
            var chosen = labels.find(function(l) { return preferredOrder.indexOf(l) !== -1; });
            if (chosen && typeof player.setQuality === 'function') {
              player.setQuality(chosen).catch(function(){});
            }
          } catch (e) {}
        }).catch(function() {
          // ignore
        });
      } else {
        // Fallback: request 1080p via URL param (best-effort)
        try {
          var src = iframe.getAttribute('src') || '';
          if (src.indexOf('quality=') === -1) {
            iframe.setAttribute('src', src + (src.indexOf('?') === -1 ? '?' : '&') + 'quality=1080p');
          }
        } catch (e) {}
      }
    }).catch(function(){});
  })();




// Native browser scrolling in use (no delay).

gsap.registerPlugin(ScrollTrigger);

// ── PRELOADER ──
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  const preloaderText = document.querySelector('.preloader-text');
  
  if (preloader && preloaderText) {
    const tl = gsap.timeline();
    tl.to(preloaderText, { opacity: 1, duration: 0.5, ease: "power2.inOut" })
      .to(preloaderText, { opacity: 0, duration: 0.5, delay: 0.5, ease: "power2.inOut" })
      .to(preloader, { yPercent: -100, duration: 0.8, ease: "power4.inOut" });
  }
});

// ── CUSTOM CURSOR ──
// Only enable custom cursor on non-touch (desktop) devices
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const cursor = document.querySelector('.custom-cursor');
if (cursor && !isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  const hoverElements = document.querySelectorAll('a, button, .ba-slider, .btn-primary, .btn-ghost');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
} else if (cursor && isTouchDevice) {
  cursor.style.display = 'none';
}

// ── BEFORE/AFTER SLIDER ──
const baSlider = document.getElementById('baSlider');
const baHandle = document.getElementById('baHandle');
const baBefore = document.querySelector('.ba-before');

if (baSlider && baHandle && baBefore) {
  let isDragging = false;
  
  const updateSlider = (x) => {
    const rect = baSlider.getBoundingClientRect();
    let percent = ((x - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    baHandle.style.left = percent + '%';
    baBefore.style.width = percent + '%';
  };

  baSlider.addEventListener('mousedown', (e) => { isDragging = true; updateSlider(e.clientX); });
  baSlider.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); });
  
  window.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
  window.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); });
  
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('touchend', () => { isDragging = false; });
}

// ── GSAP PARALLAX ──
gsap.to('.hero-title', {
  yPercent: 30,
  ease: "none",
  scrollTrigger: {
    trigger: '.hero',
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});
gsap.to('.hero-logo-watermark', {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: '.hero',
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});
