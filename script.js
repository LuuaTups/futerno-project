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

        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        updateContent();
    });
});

function updateContent() {
    document.querySelectorAll('[data-ko][data-en]').forEach(el => {
        const koText = el.getAttribute('data-ko');
        const enText = el.getAttribute('data-en');
        el.innerHTML = currentLang === 'ko' ? koText : enText;
    });
}

// Hero Carousel
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideInterval = 5000;

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

// Video Embed Click
const videoEmbed = document.getElementById('videoEmbed');
if (videoEmbed) {
    videoEmbed.addEventListener('click', () => {
        alert('Factory video will be embedded here');
    });
}

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
