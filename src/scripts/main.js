// Navigation Overlay Logic
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = document.querySelectorAll('.menu-item');

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');
    
    // Animate menu lines
    const lines = menuToggle.querySelectorAll('.menu-line');
    if (menuOverlay.classList.contains('active')) {
      lines[0].style.transform = 'translateY(5px) rotate(45deg)';
      lines[1].style.transform = 'translateY(-5px) rotate(-45deg)';
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      lines[0].style.transform = 'none';
      lines[1].style.transform = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Close menu when clicking links
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOverlay.classList.remove('active');
      const lines = menuToggle.querySelectorAll('.menu-line');
      lines[0].style.transform = 'none';
      lines[1].style.transform = 'none';
      document.body.style.overflow = 'auto';
    });
  });
}

// Scroll Reveal Logic
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Infinite Marquee Duplicate
const marquee = document.getElementById('marquee');
if (marquee) {
    const items = marquee.innerHTML;
    // Duplicate multiple times to ensure continuous flow across all screen widths
    marquee.innerHTML = items + items + items + items;
}

// Initial reveal for Hero (if already in viewport)
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
});

// Desktop Hover Parallax effect for project images (subtle)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const img = card.querySelector('.project-img');
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        img.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.project-img');
        img.style.transform = `scale(1) translate(0, 0)`;
    });
});

// Header scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

