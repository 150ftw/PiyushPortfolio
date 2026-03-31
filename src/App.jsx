import React, { useEffect, useState, useRef } from 'react';
import Beams from './components/Beams';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const marqueeRef = useRef(null);

  // Scroll logic for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Marquee Duplication logic
  useEffect(() => {
    if (marqueeRef.current) {
      const items = marqueeRef.current.innerHTML;
      marqueeRef.current.innerHTML = items + items + items + items;
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div id="app-container">
      {/* Navigation */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-name">Piyush Rawat</div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(5px) rotate(45deg)' } : {}}></div>
          <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(-5px) rotate(-45deg)' } : {}}></div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-links">
          <a href="#" className="menu-item active" onClick={closeMenu}>Home</a>
          <a href="#about" class="menu-item" onClick={closeMenu}>About</a>
          <a href="#projects" class="menu-item" onClick={closeMenu}>Work</a>
          <a href="#reviews" class="menu-item" onClick={closeMenu}>Testimonials</a>
          <a href="#footer" class="menu-item" onClick={closeMenu}>Contact</a>
        </div>
        <div className="social-links">
          <a href="#" className="social-item">IG</a>
          <a href="#" className="social-item">TW</a>
          <a href="#" className="social-item">BE</a>
          <a href="#" className="social-item">YT</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
        <div className="container hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-title reveal">LET'S CREATE <br /> VIDEOS PEOPLE <br /> <span className="text-accent">ACTUALLY WATCH</span></h1>
          <div className="hero-stats reveal">
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Project <br /> Completions</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Client <br /> Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content" ref={marqueeRef}>
          <span className="marquee-item">Brands & Creators I have worked with</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">Hershey's</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">Tech Burner</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">Netflix India</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">Red Bull Gaming</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">Unacademy</span>
          <span className="marquee-item">✦</span>
        </div>
      </div>

      {/* About Section */}
      <section className="section-padding reveal" id="about">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <h2 className="section-title">Clean <br /> Engaging <br /> <span className="text-accent">High-Retention</span></h2>
          <div className="about-text">
            <p style={{ marginBottom: '30px' }}>
              I am Piyush Rawat, a video editor focused on creating clean, engaging, and high-retention content. I work with creators and brands to transform raw footage into polished videos that capture attention and keep it.
            </p>
            <p style={{ marginBottom: '30px', fontSize: '0.9rem', letterSpacing: '1px', opacity: 0.7 }}>
              LOCATION: GHAZIABAD, INDIA <br />
              AVAILABILITY: OPEN FOR FREELANCE PROJECTS
            </p>
            <a href="#footer" style={{ fontFamily: 'Outfit', border: '1px solid white', padding: '18px 40px', display: 'inline-flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase', fontWeight: 700, fontSize: '1rem', borderRadius: '50px' }}>
              Let's Talk <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section section-padding" id="projects">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '40px' }}>Selected <br /> <span className="text-accent">Work</span></h2>
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card reveal">
              <div className="project-img-wrapper">
                <img src="/assets/project1.png" alt="Hershey's Campaign" className="project-img" />
                <div className="play-hint"></div>
              </div>
              <div className="project-info">
                <h3 className="project-title">Hershey's Campaign</h3>
                <div className="project-tags">
                  <span className="tag">Commercial</span>
                  <span className="tag">Brand Film</span>
                </div>
              </div>
            </div>
            {/* Project 2 */}
            <div className="project-card reveal">
              <div className="project-img-wrapper">
                <img src="/assets/project2.png" alt="Valorant Montage" className="project-img" />
                <div className="play-hint"></div>
              </div>
              <div className="project-info">
                <h3 className="project-title">Valorant Montage</h3>
                <div className="project-tags">
                  <span className="tag">Gaming</span>
                  <span className="tag">Cinematic</span>
                </div>
              </div>
            </div>
            {/* Project 3 */}
            <div className="project-card reveal">
              <div className="project-img-wrapper">
                <img src="/assets/project3.png" alt="2024 Showreel" className="project-img" />
                <div className="play-hint"></div>
              </div>
              <div className="project-info">
                <h3 className="project-title">2024 Showreel</h3>
                <div className="project-tags">
                  <span className="tag">Highlights</span>
                  <span className="tag">Official</span>
                </div>
              </div>
            </div>
            {/* Project 4 */}
            <div className="project-card reveal">
              <div className="project-img-wrapper">
                <img src="/assets/project4.png" alt="Retention Strategy" className="project-img" />
                <div className="play-hint"></div>
              </div>
              <div className="project-info">
                <h3 className="project-title">Retention Strategy</h3>
                <div className="project-tags">
                  <span className="tag">YouTube</span>
                  <span className="tag">Long-Form</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding reveal">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <h2 className="section-title">Core <br /> Expertise</h2>
          <div className="expertise-list">
            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ fontFamily: 'Outfit', color: 'var(--accent-purple)', marginBottom: '5px' }}>SHORT-FORM CONTENT</h4>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Viral-ready Reels and Shorts optimized for retention and audience engagement.</p>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ fontFamily: 'Outfit', color: 'var(--accent-purple)', marginBottom: '5px' }}>YOUTUBE EDITING</h4>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Advanced storytelling and dynamic pacing for creators looking to scale their channels.</p>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ fontFamily: 'Outfit', color: 'var(--accent-purple)', marginBottom: '5px' }}>COLOR GRADING</h4>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>High-end color palettes in DaVinci Resolve that establish mood and cinematic quality.</p>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ fontFamily: 'Outfit', color: 'var(--accent-purple)', marginBottom: '5px' }}>MOTION GRAPHICS</h4>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Sophisticated After Effects animations, title designs, and kinetic typography.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="container footer-content">
          <a href="mailto:hello@piyushrawat.com" className="contact-link reveal">
            GET IN TOUCH
            <span>START YOUR PROJECT TODAY →</span>
          </a>
          <div className="reveal" style={{ marginTop: '40px', fontFamily: 'Inria Serif', opacity: 0.6 }}>
            GHAZIABAD, INDIA | AVAILABLE WORLDWIDE
          </div>
          <p className="text-muted reveal" style={{ marginTop: '40px', fontWeight: 600, letterSpacing: '2px' }}>&copy; 2024 PIYUSH RAWAT. VIDEO EDITOR.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
