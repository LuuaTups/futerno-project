// Language Switcher
const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = localStorage.getItem('lang') || 'ko';
document.body.setAttribute('data-lang', currentLang);

// Set active language button
langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
        btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        currentLang = lang;
        document.body.setAttribute('data-lang', lang);
        localStorage.setItem('lang', lang);

        langBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        updateContent();
    });
});

function updateContent() {
    document.querySelectorAll('[data-ko][data-en]').forEach(el => {
        const koText = el.getAttribute('data-ko');
        const enText = el.getAttribute('data-en');
        el.innerHTML = currentLang === 'ko' ? koText : enText;
    });

    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = currentLang === 'ko'
            ? 'Marmi Futerno | 석재 전문 제작사'
            : 'Marmi Futerno | Specialist Stone Fabrication';
    }

    // Update meta description
    const pageDescription = document.getElementById('pageDescription');
    if (pageDescription) {
        pageDescription.setAttribute('content', currentLang === 'ko'
            ? '마르미 퓨테르노는 에스토니아 탈린에 본사를 둔 석재 전문 제작 회사입니다. 천연석, 엔지니어드 스톤으로 주거용, 상업용 맞춤형 석재 솔루션을 제공합니다.'
            : 'Marmi Futerno is a specialist stone fabrication company based in Tallinn, Estonia. We provide custom stone solutions for residential and commercial projects using natural and engineered stone.');
    }

    // Update HTML lang attribute
    const html = document.getElementById('html');
    if (html) {
        html.setAttribute('lang', currentLang === 'ko' ? 'ko' : 'en');
    }
}

// Hero Carousel
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideInterval = 3000;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance carousel
let carouselTimer = setInterval(nextSlide, slideInterval);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(carouselTimer);
        currentSlide = index;
        showSlide(currentSlide);
        carouselTimer = setInterval(nextSlide, slideInterval);
    });
});

// Timeline scroll animations are handled by the general observer below

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply scroll animations to sections
document.querySelectorAll('.intro-statement, .services-timeline, .projects-sections, .video-showcase, .contact-cta').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Duplicate marquee content for seamless loop
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    const marqueeContent = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML += marqueeContent;
}

// Gallery Navigation
function scrollGallery(galleryId, direction) {
    const gallery = document.getElementById(galleryId);
    const scrollAmount = gallery.offsetWidth;
    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Initialize content on load
updateContent();
