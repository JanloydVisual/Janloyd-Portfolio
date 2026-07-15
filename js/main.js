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


