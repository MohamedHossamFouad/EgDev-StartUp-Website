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


    // --- 2. Mobile Navigation ---
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


    // --- 3. Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 4. Scroll Reveal Animations ---
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
                // Reverse animation when leaving viewport
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));


    // --- 5. Dynamic Year in Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // --- 6. Form Submission Prevention (Demo) ---
    const auditForm = document.getElementById('auditForm');
    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = auditForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Processing...';
            btn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-check-circle"></i> Audit Requested!';
                btn.classList.add('btn-glow');
                auditForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // --- 7. Hero Mouse Interaction ---
    const hero = document.querySelector('.hero');
    const heroGlow = document.querySelector('.hero-glow');
    const heroGrid = document.querySelector('.hero-bg-grid');

    if (hero && heroGlow && heroGrid) {
        hero.addEventListener('mousemove', (e) => {
            // Radial Glow follows mouse
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            heroGlow.style.setProperty('--x', `${x}%`);
            heroGlow.style.setProperty('--y', `${y}%`);
            
            // Grid Subtle Parallax
            const moveX = (window.innerWidth / 2 - e.clientX) * 0.02;
            const moveY = (window.innerHeight / 2 - e.clientY) * 0.02;
            heroGrid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // Reset when mouse leaves hero section
        hero.addEventListener('mouseleave', () => {
            heroGlow.style.setProperty('--x', '50%');
            heroGlow.style.setProperty('--y', '50%');
            heroGrid.style.transform = `translate(0px, 0px)`;
        });
    }

});
