with open('css/styles.css', 'r', encoding='utf-8') as f:
    text = f.read()

target = '''@media (max-width: 900px) {
    /* Nav */
    nav { padding: 1.2rem 2rem; }
    .nav-links { display: none; }
    .nav-toggle { display: block; }
    .nav-cta { display: none; }
    .mobile-nav { position: absolute; top: 100%; left: 0; right: 0; }

    /* Section spacing */
    section { padding: 4rem 1rem; }
    section#reel { padding: 2rem 1rem 4rem !important; }
    section#work,
    section#gallery { padding: 4rem 1rem !important; }

    /* Hero */
    .hero { min-height: 0; padding: 7rem 1rem 3rem; }
    .hero-title { font-size: clamp(2.5rem, 8vw, 3.5rem); line-height: 0.95; }
    .hero-sub { font-size: 0.95rem; line-height: 1.7; }
    .hero-actions { gap: 0.75rem; margin-top: 1.5rem; }
    .btn-primary { padding: 0.6rem 1.2rem; font-size: 0.7rem; }
    .btn-ghost { font-size: 0.7rem; }
    .hero-scroll { position: relative; bottom: auto; left: auto; margin-top: 2.5rem; }
    .hero-number { display: none; }

    /* Showreel */
    .reel-upper { grid-template-columns: 1fr; gap: 2rem; }
    .reel-portrait-wrap { width: 100%; max-width: 420px; margin: 0 auto; }

    /* About */
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .about .section-title { font-size: 1.6rem; line-height: 1.2; }
    .about-body { font-size: 0.85rem; line-height: 1.8; }

    /* Scope / Process */
    .scope-grid { grid-template-columns: 1fr; }
    .process-steps { grid-template-columns: 1fr; gap: 2rem; }
    .process-steps::before { display: none; }

    /* Before/After + Gallery */
    .ba-grid { grid-template-columns: 1fr; }
    .ba-divider { width: 100%; height: 1px; }
    .gallery-grid { grid-template-columns: 1fr; gap: 1.25rem; }
    .gallery-item.tall { grid-row: span 1; }
    .gallery-item.tall .gal-placeholder { padding-bottom: 75%; }

    /* Footer / CTA */
    footer { flex-direction: column; gap: 1rem; text-align: center; }
    .cta-section { padding: 5rem 2rem; }
  }'''

replacement = '''@media (max-width: 900px) {
    /* Nav */
    nav { padding: 1rem 1.5rem; }
    .nav-logo-img { height: 34px; }
    .nav-logo-text { font-size: 0.8rem; }
    .nav-toggle span { width: 20px; margin: 4px 0; }
    .nav-links { display: none; }
    .nav-toggle { display: block; }
    .nav-cta { display: none; }
    .mobile-nav { position: absolute; top: 100%; left: 0; right: 0; }

    /* Section spacing */
    section { padding: 3.5rem 1rem; }
    section#reel { padding: 1.5rem 1rem 3.5rem !important; }
    section#work,
    section#gallery { padding: 3.5rem 1rem !important; }

    /* Hero */
    .hero { min-height: 0; padding: 6rem 1rem 2.5rem; }
    .hero-eyebrow { font-size: 0.6rem; }
    .hero-title { font-size: clamp(2.3rem, 7.5vw, 3.2rem); line-height: 0.95; }
    .hero-sub { font-size: 0.85rem; line-height: 1.7; }
    .hero-actions { gap: 0.6rem; margin-top: 1.5rem; }
    .btn-primary { padding: 0.5rem 1rem; font-size: 0.7rem; }
    .btn-ghost { font-size: 0.7rem; gap: 0.3rem; }
    .hero-scroll { position: relative; bottom: auto; left: auto; margin-top: 2rem; }
    .hero-number { display: none; }

    /* Showreel */
    .reel-upper { grid-template-columns: 1fr; gap: 1.5rem; }
    .reel-portrait-wrap { width: 100%; max-width: 420px; margin: 0 auto; }

    /* About */
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .about .section-title { font-size: 1.45rem; line-height: 1.2; }
    .about-body { font-size: 0.8rem; line-height: 1.75; }

    /* Scope / Process */
    .scope-grid { grid-template-columns: 1fr; }
    .scope-num { font-size: 2.5rem; }
    .process-steps { grid-template-columns: 1fr; gap: 1.5rem; }
    .process-steps::before { display: none; }

    /* Before/After + Gallery */
    .ba-grid { grid-template-columns: 1fr; }
    .ba-divider { width: 100%; height: 1px; }
    .gallery-grid { grid-template-columns: 1fr; gap: 1rem; }
    .gallery-item.tall { grid-row: span 1; }
    .gallery-item.tall .gal-placeholder { padding-bottom: 75%; }

    /* Footer / CTA */
    footer { flex-direction: column; gap: 1rem; text-align: center; }
    .cta-section { padding: 4rem 1.5rem; }
    .cta-title { font-size: clamp(2rem, 7vw, 2.5rem); }
  }'''

if target in text:
    text = text.replace(target, replacement)
    with open('css/styles.css', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Replaced CSS successfully.")
else:
    print("Target not found.")
