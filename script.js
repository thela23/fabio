document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            alert('Thank you for your message! Fabio will get back to you soon.');
            contactForm.reset();
        });
    }

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            const caption = this.querySelector('.gallery-caption h3').textContent;
            const description = this.querySelector('.gallery-caption p').textContent;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            const lightboxImg = document.createElement('img');
            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt;
            const lightboxCaption = document.createElement('div');
            lightboxCaption.className = 'lightbox-caption';
            lightboxCaption.innerHTML = `<h3>${caption}</h3><p>${description}</p>`;
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(lightboxCaption);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeLightbox();
            });
            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Add lightbox styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.9);
            display: flex; justify-content: center; align-items: center;
            z-index: 1000;
        }
        .lightbox-content {
            position: relative;
            max-width: 80%; max-height: 80%;
        }
        .lightbox-content img {
            max-width: 100%; max-height: 80vh;
            border: 3px solid white;
        }
        .lightbox-caption {
            color: white; text-align: center; padding: 1rem;
        }
        .lightbox-close {
            position: absolute; top: -40px; right: 0;
            color: white; font-size: 2rem; cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Sticky navigation
    const nav = document.querySelector('nav');
    const headerHeight = document.querySelector('header').offsetHeight;
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight - 100) {
            nav.classList.add('sticky');
            if (!nav.hasAttribute('style')) {
                nav.style.position = 'fixed';
                nav.style.top = '0';
                nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                nav.style.transition = 'background-color 0.3s ease';
            }
        } else {
            nav.classList.remove('sticky');
            nav.removeAttribute('style');
        }
    });

    // Audio player pause others
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            audioElements.forEach(other => {
                if (other !== audio && !other.paused) other.pause();
            });
        });
    });

    // Theme toggle
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', () => {
        body.classList.add('theme-transition');
        setTimeout(() => {
            body.classList.toggle('dark-mode');
            body.classList.remove('theme-transition');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        }, 300);
    });

    // Animate on scroll using Intersection Observer
    const animatedElements = document.querySelectorAll('.section, .gallery-item, .about-content, .track, .contact-content');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
