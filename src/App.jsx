import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Beams from './components/Beams';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const textReveal = {
  hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

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
          <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(5px) rotate(45deg)', background: 'white' } : { background: 'white' }}></div>
          <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(-5px) rotate(-45deg)', background: 'white' } : { background: 'white' }}></div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <motion.div 
          className="menu-links"
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {['Home', 'About', 'Work', 'Testimonials', 'Contact'].map((item, i) => (
            <motion.a 
              key={item}
              href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
              className="menu-item"
              variants={fadeInUp}
              onClick={closeMenu}
              whileHover={{ x: 20, color: 'var(--accent-purple)' }}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
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
          <motion.h1 
            className="hero-title"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {["LET'S CREATE", "VIDEOS PEOPLE", "ACTUALLY WATCH"].map((line, i) => (
              <motion.span key={i} style={{ display: 'block' }} variants={textReveal}>
                {line.includes("ACTUALLY WATCH") ? (
                  <>ACTUALLY <span className="text-accent">WATCH</span></>
                ) : line}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            className="hero-stats"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="stat-item" variants={fadeInUp}>
              <span className="stat-value">500+</span>
              <span className="stat-label">Project <br /> Completions</span>
            </motion.div>
            <motion.div className="stat-item" variants={fadeInUp}>
              <span className="stat-value">100%</span>
              <span className="stat-label">Client <br /> Satisfaction</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <motion.div 
        className="marquee-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
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
      </motion.div>

      {/* About Section */}
      <section className="section-padding" id="about">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Clean <br /> Engaging <br /> <span className="text-accent">High-Retention</span>
          </motion.h2>
          <motion.div 
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p style={{ marginBottom: '30px' }} variants={fadeInUp}>
              I am Piyush Rawat, a video editor focused on creating clean, engaging, and high-retention content. I work with creators and brands to transform raw footage into polished videos that capture attention and keep it.
            </motion.p>
            <motion.p style={{ marginBottom: '30px', fontSize: '0.9rem', letterSpacing: '1px', opacity: 0.7 }} variants={fadeInUp}>
              LOCATION: GHAZIABAD, INDIA <br />
              AVAILABILITY: OPEN FOR FREELANCE PROJECTS
            </motion.p>
            <motion.a 
              href="#footer" 
              variants={fadeInUp}
              whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
              style={{ fontFamily: 'Outfit', border: '1px solid white', padding: '18px 40px', display: 'inline-flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase', fontWeight: 700, fontSize: '1rem', borderRadius: '50px', transition: '0.3s' }}
            >
              Let's Talk <span>→</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section section-padding" id="projects">
        <div className="container">
          <motion.h2 
            className="section-title" 
            style={{ marginBottom: '40px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Selected <br /> <span className="text-accent">Work</span>
          </motion.h2>
          <motion.div 
            className="projects-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { title: "Hershey's Campaign", tags: ["Commercial", "Brand Film"], img: "/assets/project1.png" },
              { title: "Valorant Montage", tags: ["Gaming", "Cinematic"], img: "/assets/project2.png" },
              { title: "2024 Showreel", tags: ["Highlights", "Official"], img: "/assets/project3.png" },
              { title: "Retention Strategy", tags: ["YouTube", "Long-Form"], img: "/assets/project4.png" }
            ].map((proj, i) => (
              <motion.div 
                key={i} 
                className="project-card"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="project-img-wrapper">
                  <motion.img 
                    src={proj.img} 
                    alt={proj.title} 
                    className="project-img" 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="play-hint"></div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{proj.title}</h3>
                  <div className="project-tags">
                    {proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Core <br /> Expertise
          </motion.h2>
          <motion.div 
            className="expertise-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { title: "SHORT-FORM CONTENT", desc: "Viral-ready Reels and Shorts optimized for retention." },
              { title: "YOUTUBE EDITING", desc: "Advanced storytelling and dynamic pacing for creators." },
              { title: "COLOR GRADING", desc: "High-end color palettes that establish cinematic quality." },
              { title: "MOTION GRAPHICS", desc: "Kinetic typography and After Effects animations." }
            ].map((item, i) => (
              <motion.div key={i} style={{ marginBottom: '40px' }} variants={fadeInUp}>
                <h4 style={{ fontFamily: 'Outfit', color: 'var(--accent-purple)', marginBottom: '5px' }}>{item.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="container footer-content">
          <motion.a 
            href="mailto:hello@piyushrawat.com" 
            className="contact-link"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            GET IN TOUCH
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              START YOUR PROJECT TODAY →
            </motion.span>
          </motion.a>
          <motion.div 
            style={{ marginTop: '40px', fontFamily: 'Inria Serif', opacity: 0.6 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
          >
            GHAZIABAD, INDIA | AVAILABLE WORLDWIDE
          </motion.div>
          <motion.p 
            className="text-muted" 
            style={{ marginTop: '40px', fontWeight: 600, letterSpacing: '2px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &copy; {new Date().getFullYear()} PIYUSH RAWAT. VIDEO EDITOR.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default App;
