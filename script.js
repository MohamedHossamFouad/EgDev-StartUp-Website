document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'ph ph-sun';
        } else {
            themeIcon.className = 'ph ph-moon';
        }
    }


    // --- 2. Language Toggle ---
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');

    // HTML templates for elements that contain inner HTML (spans with gradients, etc.)
    const htmlTemplates = {
        heroTitle: {
            en: 'Complete <span class="text-gradient">IT & Software</span> Solutions for Your Business',
            ar: 'حلول <span class="text-gradient">IT + Software</span> متكاملة لشغلك'
        },
        servicesTitle: {
            en: 'How We <span class="text-gradient">Help You</span>',
            ar: 'إزاي بنساعدك <span class="text-gradient">بالظبط</span>'
        },
        processTitle: {
            en: 'Our <span class="text-gradient">Process</span>',
            ar: 'خطواتنا <span class="text-gradient">ببساطة</span>'
        },
        pricingTitle: {
            en: 'Our <span class="text-gradient">Plans</span>',
            ar: 'خطط <span class="text-gradient">الأسعار</span>'
        },
        portfolioTitle: {
            en: 'Our Success <span class="text-gradient">Stories</span>',
            ar: 'سابقة <span class="text-gradient">أعمالنا</span>'
        },
        auditTitle: {
            en: 'Get a <span class="text-gradient">Free</span> Consultation',
            ar: 'احجز <span class="text-gradient">استشارة مجانية</span>'
        },
        finalCtaTitle: {
            en: 'Ready to <span class="text-gradient">Organize Your Business?</span>',
            ar: 'جاهز تنظم <span class="text-gradient">شغلك وتكبر؟</span>'
        }
    };



    function applyLanguage(lang) {
        // Swap text content for all elements with data-en/data-ar
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = lang === 'ar' ? el.dataset.ar : el.dataset.en;
            if (text) {
                // Skip elements that contain child elements with their own translations
                const hasTranslatableChildren = el.querySelector('[data-en]');
                if (!hasTranslatableChildren) {
                    el.textContent = text;
                }
            }
        });

        // Handle elements with inner HTML (containing spans, gradients etc.)
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.innerHTML = htmlTemplates.heroTitle[lang];

        const sectionTitles = document.querySelectorAll('.section-title');
        const titleKeys = ['servicesTitle', 'processTitle', 'pricingTitle', 'portfolioTitle'];
        sectionTitles.forEach((title, i) => {
            if (titleKeys[i] && htmlTemplates[titleKeys[i]]) {
                title.innerHTML = htmlTemplates[titleKeys[i]][lang];
            }
        });

        const auditTitle = document.querySelector('.audit-content h2');
        if (auditTitle) auditTitle.innerHTML = htmlTemplates.auditTitle[lang];

        const finalCtaTitle = document.querySelector('.final-cta h2');
        if (finalCtaTitle) finalCtaTitle.innerHTML = htmlTemplates.finalCtaTitle[lang];

        // Handle form placeholders
        document.querySelectorAll('[data-placeholder-en]').forEach(input => {
            input.placeholder = lang === 'ar' ? input.dataset.placeholderAr : input.dataset.placeholderEn;
        });

        // Re-append icon to hero CTA button
        const heroCta = document.querySelector('.hero-actions .btn-primary');
        if (heroCta) {
            const ctaText = lang === 'ar' ? heroCta.dataset.ar : heroCta.dataset.en;
            heroCta.innerHTML = ctaText + ' <i class="ph ph-arrow-right"></i>';
        }

        // Re-append icon to form submit button
        const formSubmit = document.querySelector('.form-submit');
        if (formSubmit) {
            const submitText = lang === 'ar' ? formSubmit.dataset.ar : formSubmit.dataset.en;
            formSubmit.innerHTML = submitText + ' <i class="ph ph-paper-plane-right"></i>';
        }

        // Re-append icons to case-link elements
        document.querySelectorAll('.case-link').forEach(link => {
            const span = link.querySelector('span[data-en]');
            if (span) {
                span.textContent = lang === 'ar' ? span.dataset.ar : span.dataset.en;
            }
        });

        // Set HTML attributes
        root.setAttribute('data-lang', lang);
        root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', lang);

        // Update toggle button label
        langLabel.textContent = lang === 'ar' ? 'EN' : 'ع';

        // Save preference
        localStorage.setItem('lang', lang);
    }

    // Initialize language
    const savedLang = localStorage.getItem('lang') || 'en';
    applyLanguage(savedLang);

    langToggle.addEventListener('click', () => {
        const currentLang = root.getAttribute('data-lang');
        applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });


    // --- 3. Mobile Navigation ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.className = 'ph ph-x';
        } else {
            icon.className = 'ph ph-list';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'ph ph-list';
        });
    });


    // --- 4. Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 5. Scroll Reveal Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));


    // --- 6. Dynamic Year in Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // --- 7. Form Submission Prevention (Demo) ---
    const auditForm = document.getElementById('auditForm');
    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = auditForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            const currentLang = root.getAttribute('data-lang');
            
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> ' + (currentLang === 'ar' ? 'ثانية واحدة...' : 'Processing...');
            btn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-check-circle"></i> ' + (currentLang === 'ar' ? 'تم! هنكلمك خلال 24 ساعة' : 'Done! We will call you soon');
                btn.classList.add('btn-glow');
                auditForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // --- 8. Hero Mouse Interaction ---
    const hero = document.querySelector('.hero');
    const heroGlow = document.querySelector('.hero-glow');
    const heroGrid = document.querySelector('.hero-bg-grid');

    if (hero && heroGlow && heroGrid) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            heroGlow.style.setProperty('--x', `${x}%`);
            heroGlow.style.setProperty('--y', `${y}%`);
            
            const moveX = (window.innerWidth / 2 - e.clientX) * 0.02;
            const moveY = (window.innerHeight / 2 - e.clientY) * 0.02;
            heroGrid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            heroGlow.style.setProperty('--x', '50%');
            heroGlow.style.setProperty('--y', '50%');
            heroGrid.style.transform = `translate(0px, 0px)`;
        });
    }

});
