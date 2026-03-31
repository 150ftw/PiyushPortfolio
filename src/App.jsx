import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Beams from './components/Beams';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(15px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const charReveal = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const CharacterReveal = ({ text, className = "" }) => {
  const letters = Array.from(text);
  return (
    <motion.span
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ display: 'inline-block' }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={charReveal}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const marqueeRef = useRef(null);
  
  // Mouse Glow Logic
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax Logic for Section Headers
  const { scrollY } = useScroll();
  const bgTextY = useTransform(scrollY, [1000, 3000], [-100, 100]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (marqueeRef.current) {
      const items = marqueeRef.current.innerHTML;
      marqueeRef.current.innerHTML = items + items + items + items;
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div id="app-container" style={{ position: 'relative', overflowX: 'hidden' }}>
        {/* Cinematic Mouse Glow */}
        <motion.div 
            className="cursor-glow"
            style={{ x: mouseX, y: mouseY }}
        />

        {/* Navigation */}
        <nav className={isScrolled ? 'scrolled' : ''} style={{ pointerEvents: 'all' }}>
          <div className="nav-name">Piyush Rawat</div>
          <motion.div 
            className="menu-toggle" 
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: 'pointer', zIndex: 1001, pointerEvents: 'all' }}
          >
            <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(5px) rotate(45deg)', background: 'white' } : { background: 'white' }}></div>
            <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(-5px) rotate(-45deg)', background: 'white' } : { background: 'white' }}></div>
          </motion.div>
        </nav>

        {/* Menu Overlay */}
        <div 
            className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
            style={{ 
                pointerEvents: isMenuOpen ? 'all' : 'none', 
                visibility: isMenuOpen ? 'visible' : 'hidden',
                opacity: isMenuOpen ? 1 : 0
            }}
        >
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
                whileHover={{ x: 20, color: 'var(--accent-purple)', skewX: -5 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
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
          <motion.div className="container hero-content" style={{ position: 'relative', zIndex: 1, y: heroY }}>
            <h1 className="hero-title" style={{ display: 'flex', flexDirection: 'column' }}>
                <CharacterReveal text="LET'S CREATE" />
                <CharacterReveal text="VIDEOS PEOPLE" />
                <span style={{ display: 'block' }}>
                    <CharacterReveal text="ACTUALLY " />
                    <CharacterReveal text="WATCH" className="text-accent" />
                </span>
            </h1>
            
            <motion.div 
              className="hero-stats"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="stat-item" variants={fadeInUp} whileHover={{ y: -5 }}>
                <span className="stat-value">500+</span>
                <span className="stat-label">Project <br /> Completions</span>
              </motion.div>
              <motion.div className="stat-item" variants={fadeInUp} whileHover={{ y: -5 }}>
                <span className="stat-value">100%</span>
                <span className="stat-label">Client <br /> Satisfaction</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Marquee Section */}
        <motion.div 
          className="marquee-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="marquee-content" ref={marqueeRef}>
            {["Brands & Creators I have worked with", "✦", "Hershey's", "✦", "Tech Burner", "✦", "Netflix India", "✦", "Red Bull Gaming", "✦", "Unacademy", "✦"].map((item, i) => (
                <span key={i} className="marquee-item">{item}</span>
            ))}
          </div>
        </motion.div>

        {/* About Section */}
        <section className="section-padding" id="about">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            <h2 className="section-title">
               <CharacterReveal text="Clean" /><br/>
               <CharacterReveal text="Engaging" /><br/>
               <span className="text-accent"><CharacterReveal text="High-Retention" /></span>
            </h2>
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
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Outfit', border: '1px solid white', padding: '18px 40px', display: 'inline-flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase', fontWeight: 700, fontSize: '1rem', borderRadius: '50px', background: 'transparent', color: 'white' }}
              >
                Let's Talk <span>→</span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid with Parallax Backdrop */}
        <section className="projects-section section-padding" id="projects" style={{ position: 'relative' }}>
          <motion.div 
            className="parallax-bg-text"
            style={{ y: bgTextY }}
          >
            EDITS
          </motion.div>
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="section-title" style={{ marginBottom: '100px' }}>
                <CharacterReveal text="Selected" /><br/>
                <span className="text-accent"><CharacterReveal text="Work" /></span>
            </h2>
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
                <motion.a 
                  key={i} 
                  href="#"
                  className="project-card"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  style={{ display: 'block' }}
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
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expertise Section - Cinematic Sticky Sequence */}
        <section className="section-padding">
          <div className="container expertise-container">
            <div className="expertise-heading-sticky">
                <h2 className="section-title">
                    <CharacterReveal text="Core" /><br/>
                    <CharacterReveal text="Expertise" />
                </h2>
                <p className="text-muted" style={{ marginTop: '20px', maxWidth: '300px' }}>
                    Specialized workflows designed for high-end digital creators and brands.
                </p>
            </div>
            
            <motion.div 
              className="expertise-scroll-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { title: "SHORT-FORM CONTENT", desc: "Viral-ready Reels and Shorts optimized for retention and extreme audience engagement using advanced pacing techniques." },
                { title: "YOUTUBE EDITING", desc: "Advanced storytelling and dynamic pacing for creators looking to scale their channels with cinematic production value." },
                { title: "COLOR GRADING", desc: "High-end color palettes developed in DaVinci Resolve that establish unique brand moods and premium cinematic quality." },
                { title: "MOTION GRAPHICS", desc: "Sophisticated After Effects animations, kinetic typography, and custom VFX that elevate technical narratives." }
              ].map((item, i) => (
                <motion.div key={i} className="expertise-item-frame" variants={fadeInUp}>
                  <h4 style={{ fontFamily: 'Outfit', color: 'var(--accent-purple)', fontSize: '1.5rem', marginBottom: '15px' }}>{item.title}</h4>
                  <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{item.desc}</p>
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
              <CharacterReveal text="GET IN TOUCH" />
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
