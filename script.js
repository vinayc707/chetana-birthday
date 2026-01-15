// ===== CONFIGURATION =====
const PHOTO_FOLDER = 'Photos-1-001/';
const PHOTO_FILES = [
    '0f760448-f16d-4cee-9d26-9179ab5ed748.jpg',
    '1000143306.jpg',
    '2921c6d4-dedd-4325-85b2-f880581181fb.jpg',
    '30aff636-7bc2-4d52-8eb8-d186bfb90494.jpg',
    '3383cc65-ad2a-41cf-89c6-b400b5f9294c.jpg',
    '349a67a2-27cd-4db0-85c0-eb57c0cf8f05.jpg',
    '3bac8cb4-5559-40f8-947d-a177a7d2c526.jpg',
    '3c924fea-0db9-4331-802f-a51f92270892.jpg',
    '452e29cd-5971-43bf-8d6f-d406a7a4838c.jpg',
    '5270cbf8-a7ad-4cee-9fde-a952c3c4f99c.jpg',
    '81bed29b-7998-47cc-b036-bf227bf1e4a4.jpg',
    '8263d0d0-1b26-4c94-bf18-6190a4ac7ad6.jpg',
    '8a588a25-b3f0-4dfb-ba95-067a432df4a9.jpg',
    'IMG_6809.JPG',
    'b624b59b-6c6a-4ecc-b533-c49b58855f28.jpg',
    'e02e721a-c1e3-4955-aa3c-7f5ae68787fc.jpg'
];



// Auto-trigger celebration 3 seconds after page load
setTimeout(triggerCelebration, 3000);

// ===== PHOTO GALLERY =====
function loadPhotoGallery() {
    const gallery = document.getElementById('photoGallery');

    PHOTO_FILES.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'bento-item';
        item.dataset.aos = 'zoom-in';
        item.dataset.aosDelay = index * 50;

        const img = document.createElement('img');
        img.src = PHOTO_FOLDER + photo;
        img.alt = `Memory ${index + 1}`;
        img.loading = 'lazy';

        item.appendChild(img);
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

// ===== LIGHTBOX =====
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');

    img.src = PHOTO_FOLDER + PHOTO_FILES[index];
    counter.textContent = `${index + 1} / ${PHOTO_FILES.length}`;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % PHOTO_FILES.length;
    openLightbox(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + PHOTO_FILES.length) % PHOTO_FILES.length;
    openLightbox(currentImageIndex);
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxNext').addEventListener('click', nextImage);
document.getElementById('lightboxPrev').addEventListener('click', prevImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

// ===== SCROLL ANIMATIONS (AOS) =====
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===== PREMIUM CELEBRATION EFFECTS =====
function createPremiumFirework() {
    const firework = document.createElement('div');
    firework.style.position = 'fixed';
    firework.style.left = (20 + Math.random() * 60) + '%';
    firework.style.top = (20 + Math.random() * 60) + '%';
    firework.style.pointerEvents = 'none';
    firework.style.zIndex = '99999';

    const colors = ['#ff6ec4', '#7873f5', '#4facfe', '#43e97b', '#feca57', '#ffd700', '#ff6b6b', '#4ecdc4'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Reduced to 30 particles for better performance
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.animation = `explode 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        firework.appendChild(particle);
    }

    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1500);
}

function createRocket() {
    const rocket = document.createElement('div');
    rocket.style.position = 'fixed';
    rocket.style.left = Math.random() * 100 + '%';
    rocket.style.bottom = '-50px';
    rocket.style.width = '4px';
    rocket.style.height = '20px';
    rocket.style.background = 'linear-gradient(to top, #ffd700, #ff6ec4)';
    rocket.style.borderRadius = '2px';
    rocket.style.boxShadow = '0 0 10px #ffd700';
    rocket.style.pointerEvents = 'none';
    rocket.style.zIndex = '99999';
    rocket.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    document.body.appendChild(rocket);

    setTimeout(() => {
        rocket.style.bottom = (50 + Math.random() * 30) + '%';
        rocket.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        createPremiumFirework();
        rocket.remove();
    }, 1000);
}

function createBurst() {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const colors = ['#ff6ec4', '#7873f5', '#4facfe', '#43e97b', '#feca57', '#ffd700'];

    // Reduced to 20 particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = '0 0 10px currentColor';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '99999';

        const angle = (Math.PI * 2 * i) / 20;
        const distance = 80 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.style.transform = `translate(${tx}px, ${ty}px)`;
            particle.style.opacity = '0';
        }, 50);

        setTimeout(() => particle.remove(), 1050);
    }
}

function createConfetti() {
    const colors = ['#ff6ec4', '#7873f5', '#4facfe', '#43e97b', '#feca57', '#ffd700', '#ff6b6b', '#4ecdc4'];

    // Reduced to 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = (6 + Math.random() * 6) + 'px';
        confetti.style.height = (6 + Math.random() * 6) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '99999';
        confetti.style.transition = 'all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.top = '120vh';
            confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 100);

        setTimeout(() => confetti.remove(), 3100);
    }
}

function createSparkles() {
    const sparkleChars = ['✨', '⭐', '💫', '🌟'];

    // Reduced to 20 sparkles
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = (15 + Math.random() * 20) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '99999';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        sparkle.style.textShadow = '0 0 10px #ffd700';

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }
}

function createTrail() {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = Math.random() * 100 + '%';
    trail.style.top = Math.random() * 100 + '%';
    trail.style.width = '2px';
    trail.style.height = '60px';
    trail.style.background = 'linear-gradient(to bottom, transparent, #ffd700, transparent)';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '99999';
    trail.style.transform = `rotate(${Math.random() * 360}deg)`;
    trail.style.opacity = '0.6';
    trail.style.animation = 'trailFade 0.8s ease-out forwards';

    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
}

function screenShake() {
    document.body.style.animation = 'shake 0.3s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 300);
}

function screenFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'white';
    flash.style.opacity = '0.5';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '99998';
    flash.style.animation = 'flashFade 0.2s ease-out forwards';

    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);
}

function triggerCelebration() {
    console.log('🎉 BIRTHDAY CELEBRATION! 🎉');

    // Hide celebration indicator
    const celebrationIndicator = document.getElementById('celebrationIndicator');
    if (celebrationIndicator) {
        celebrationIndicator.style.transition = 'all 0.5s ease';
        celebrationIndicator.style.opacity = '0';
        celebrationIndicator.style.transform = 'scale(0.8)';

        setTimeout(() => {
            celebrationIndicator.style.display = 'none';
        }, 500);
    }

    // Quick opening - Screen flash
    screenFlash();

    // Launch 8 rockets
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createRocket(), i * 150);
    }

    // Confetti explosions
    createConfetti();
    setTimeout(() => createConfetti(), 800);

    // Bursts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createBurst(), i * 250);
    }

    // Sparkles
    createSparkles();
    setTimeout(() => createSparkles(), 1200);

    // Trails
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createTrail(), i * 200);
    }

    // Continue celebration for 5 seconds (reduced from 15)
    let count = 0;
    const interval = setInterval(() => {
        // Reduced frequency
        if (Math.random() > 0.5) createPremiumFirework();
        if (Math.random() > 0.7) createBurst();

        // Periodic effects
        if (count % 2 === 0) createSparkles();
        if (count % 3 === 0) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createTrail(), i * 100);
            }
        }

        count++;
        if (count >= 5) clearInterval(interval);
    }, 1000);
}

// ===== TEST BUTTON =====
document.getElementById('testBtn').addEventListener('click', () => {
    if (!celebrationTriggered) {
        celebrationTriggered = true;

        // Set countdown to zero
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';

        setTimeout(triggerCelebration, 500);
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ADD EXPLOSION ANIMATION CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes flashFade {
        0% { opacity: 0.8; }
        100% { opacity: 0; }
    }
    
    @keyframes trailFade {
        0% { opacity: 0.8; transform: rotate(var(--rotate, 0deg)) scale(1); }
        100% { opacity: 0; transform: rotate(var(--rotate, 0deg)) scale(0); }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    loadPhotoGallery();
    initAOS();
    console.log('🎂 Birthday website loaded! 💜');
});
