import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Beams from './components/Beams';

// ---------- Animation Variants ----------
const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(15px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const maskReveal = {
  hidden: { y: '100%', skewY: 10 },
  visible: { y: 0, skewY: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

// ---------- MaskText ----------
const MaskText = ({ children, className = '' }) => (
  <span className={`mask-container ${className}`}>
    <motion.span
      className="mask-text"
      variants={maskReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {children}
    </motion.span>
  </span>
);

// ---------- App ----------
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled]  = useState(false);
  const [isMobile, setIsMobile]       = useState(false);
  const marqueeRef = useRef(null);

  // Mouse Glow
  const mouseX = useSpring(0, { stiffness: 60, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 25 });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.history.scrollRestoration) window.history.scrollRestoration = 'manual';

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (marqueeRef.current) {
      const items = marqueeRef.current.innerHTML;
      marqueeRef.current.innerHTML = items + items + items + items;
    }
  }, []);

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : 'auto';
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // ---- WORK SECTION: pixel-accurate horizontal scroll ----
  const workSectionRef  = useRef(null);
  const workContentRef  = useRef(null);
  const [workTranslate, setWorkTranslate] = useState(0);

  const { scrollYProgress: workProgress } = useScroll({
    target: workSectionRef,
    offset: ['start start', 'end end']
  });

  // Measure the exact scroll distance once mounted / on resize
  useEffect(() => {
    const measure = () => {
      if (workContentRef.current) {
        const totalW  = workContentRef.current.scrollWidth;
        const viewW   = window.innerWidth;
        setWorkTranslate(-(totalW - viewW));   // negative px value
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Drive horizontal translation from scroll
  const xMotion = useTransform(workProgress, [0, 1], [0, workTranslate]);
  const workOpacity = useTransform(workProgress, [0.9, 1], [1, 0]);
  const albumTextX  = useTransform(workProgress, [0, 1], ['-5%', '5%']);

  // ---- EXPERTISE SECTION: event-driven card swap ----
  const expertiseSectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress: expProgress } = useScroll({
    target: expertiseSectionRef,
    offset: ['start start', 'end end']
  });

  const expertiseItems = [
    { title: 'SHORT-FORM',    desc: 'Viral-ready Reels and Shorts optimised for maximum retention.' },
    { title: 'YOUTUBE',       desc: 'Advanced storytelling and dynamic pacing for scaling channels.' },
    { title: 'COLOR GRADING', desc: 'High-end cinematic colour palettes crafted in DaVinci Resolve.' },
    { title: 'MOTION GRAPHICS', desc: 'Kinetic typography and custom After Effects VFX sequences.' },
  ];

  useMotionValueEvent(expProgress, 'change', (v) => {
    const idx = Math.min(
      Math.floor(v * expertiseItems.length),
      expertiseItems.length - 1
    );
    setActiveCard(idx);
  });

  const projects = [
    { title: "Hershey's Campaign",  tags: ['Commercial', 'Brand Film'],   img: '/assets/project1.png' },
    { title: 'Valorant Montage',    tags: ['Gaming', 'Cinematic'],         img: '/assets/project2.png' },
    { title: '2024 Showreel',       tags: ['Highlights', 'Official'],      img: '/assets/project3.png' },
    { title: 'Retention Strategy',  tags: ['YouTube', 'Long-Form'],        img: '/assets/project4.png' },
  ];

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div id="app-container" style={{ position: 'relative', background: '#000' }}>

        {/* Mouse Glow */}
        {!isMobile && (
          <motion.div className="cursor-glow" style={{ x: mouseX, y: mouseY }} />
        )}

        {/* Nav */}
        <nav className={isScrolled ? 'scrolled' : ''} style={{ pointerEvents: 'all' }}>
          <div className="nav-name">Piyush Rawat</div>
          <motion.div
            className="menu-toggle"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: 'pointer', zIndex: 1020, pointerEvents: 'all' }}
          >
            <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(5px) rotate(45deg)', background: 'white' } : { background: 'white' }} />
            <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(-5px) rotate(-45deg)', background: 'white' } : { background: 'white' }} />
          </motion.div>
        </nav>

        {/* Menu Overlay */}
        <div
          className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
          style={{ pointerEvents: isMenuOpen ? 'all' : 'none', visibility: isMenuOpen ? 'visible' : 'hidden', opacity: isMenuOpen ? 1 : 0, zIndex: 1010 }}
        >
          <motion.div className="menu-links" initial="hidden" animate={isMenuOpen ? 'visible' : 'hidden'} variants={staggerContainer}>
            {['Home', 'About', 'Work', 'Expertise', 'Contact'].map((item) => (
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

        {/* ── Hero ── */}
        <section className="hero" id="home">
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Beams beamWidth={3} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
          </div>
          <div className="container hero-content" style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="hero-title" style={{ display: 'flex', flexDirection: 'column' }}>
              <MaskText>LET'S CREATE</MaskText>
              <MaskText>VIDEOS PEOPLE</MaskText>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <MaskText>ACTUALLY </MaskText>
                <MaskText className="text-accent">WATCH</MaskText>
              </div>
            </h1>
            <motion.div className="hero-stats" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div className="stat-item" variants={fadeInUp} whileHover={{ y: -5 }}>
                <span className="stat-value">500+</span>
                <span className="stat-label">Project<br />Completions</span>
              </motion.div>
              <motion.div className="stat-item" variants={fadeInUp} whileHover={{ y: -5 }}>
                <span className="stat-value">100%</span>
                <span className="stat-label">Client<br />Satisfaction</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <motion.div
          className="marquee-container"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="marquee-content" ref={marqueeRef}>
            {["Brands & Creators", "✦", "Hershey's", "✦", "Tech Burner", "✦", "Netflix India", "✦", "Red Bull Gaming", "✦", "Unacademy", "✦"].map((item, i) => (
              <span key={i} className="marquee-item">{item}</span>
            ))}
          </div>
        </motion.div>

        {/* ── About ── */}
        <section className="section-padding" id="about">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '60px', alignItems: 'start' }}>
            <h2 className="section-title">
              <MaskText>Performance</MaskText><br />
              <MaskText>Meets</MaskText><br />
              <MaskText className="text-accent">High-Retention</MaskText>
            </h2>
            <motion.div className="about-text" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}>
              <motion.p style={{ marginBottom: '30px', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }} variants={fadeInUp}>
                I am Piyush Rawat, a video editor focused on creating clean, engaging, and high-retention content. I work with creators and brands to transform raw footage into polished videos that capture attention and keep it.
              </motion.p>
              <motion.div style={{ marginBottom: '30px', fontSize: '0.9rem', letterSpacing: '1px', opacity: 0.7 }} variants={fadeInUp}>
                LOCATION: GHAZIABAD, INDIA<br />
                AVAILABILITY: OPEN FOR FREELANCE PROJECTS
              </motion.div>
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

        {/* ── Selected Work: Sticky Horizontal Scroll ── */}
        <section
          ref={workSectionRef}
          className="horizontal-scroll-section"
          id="work"
          style={{ height: isMobile ? 'auto' : '600vh' }}
        >
          {isMobile ? (
            /* Mobile: simple vertical stack */
            <div style={{ padding: '80px 20px' }}>
              <h2 className="section-title" style={{ marginBottom: '50px' }}>
                <MaskText>Selected</MaskText><br />
                <MaskText className="text-accent">Work</MaskText>
              </h2>
              {projects.map((proj, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="project-card"
                  style={{ display: 'block', marginBottom: '40px' }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="project-img-wrapper" style={{ height: '280px', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="project-info" style={{ marginTop: '16px' }}>
                    <h3 className="project-title" style={{ fontSize: '1.4rem' }}>{proj.title}</h3>
                    <div className="project-tags">
                      {proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            /* Desktop: sticky horizontal scroll */
            <motion.div
              className="sticky-wrapper"
              style={{ opacity: workOpacity }}
            >
              {/* Background watermark */}
              <motion.div
                className="parallax-bg-text"
                style={{ x: albumTextX }}
              >
                ALBUMS
              </motion.div>

              {/* Scrolling content strip */}
              <motion.div
                ref={workContentRef}
                className="horizontal-content"
                style={{ x: xMotion }}
              >
                {/* Title panel */}
                <div style={{ minWidth: '45vw', flexShrink: 0 }}>
                  <h2 className="section-title" style={{ fontSize: '8vw', lineHeight: 1 }}>
                    <MaskText>Selected</MaskText><br />
                    <MaskText className="text-accent">Work</MaskText>
                  </h2>
                </div>

                {/* Project cards */}
                {projects.map((proj, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="project-card"
                    style={{
                      minWidth: '32vw',
                      flexShrink: 0,
                      height: '65vh',
                      marginTop: i % 2 === 0 ? '-3vh' : '3vh',
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="project-img-wrapper" style={{ height: '80%', borderRadius: '20px', overflow: 'hidden' }}>
                      <img src={proj.img} alt={proj.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                      <div className="play-hint" />
                    </div>
                    <div className="project-info" style={{ marginTop: '16px' }}>
                      <h3 className="project-title" style={{ fontSize: '1.4rem' }}>{proj.title}</h3>
                      <div className="project-tags">
                        {proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </section>

        {/* ── Core Expertise: Sticky Card Swap ── */}
        <section
          ref={expertiseSectionRef}
          className="expertise-stack-container"
          id="expertise"
          style={{ height: isMobile ? 'auto' : '500vh' }}
        >
          {isMobile ? (
            /* Mobile: simple stacked list */
            <div style={{ padding: '80px 20px' }}>
              <h2 className="section-title" style={{ marginBottom: '50px' }}>
                <MaskText>Core</MaskText><br />
                <MaskText className="text-accent">Expertise</MaskText>
              </h2>
              {expertiseItems.map((item, i) => (
                <div key={i} style={{ background: 'rgba(20,20,20,0.9)', padding: '30px', borderRadius: '16px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h4 style={{ color: 'var(--accent-purple)', fontSize: '1.5rem', marginBottom: '10px' }}>{item.title}</h4>
                  <p style={{ opacity: 0.75, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: sticky side-by-side */
            <div className="expertise-stack-sticky">
              {/* Left: static title */}
              <div className="expertise-header-container">
                <h2 className="section-title" style={{ fontSize: '4.5vw', textAlign: 'left', margin: 0 }}>
                  <MaskText>Core</MaskText><br />
                  <MaskText className="text-accent">Expertise</MaskText>
                </h2>
                {/* Card counter */}
                <div style={{ marginTop: '40px', opacity: 0.4, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                  {String(activeCard + 1).padStart(2, '0')} / {String(expertiseItems.length).padStart(2, '0')}
                </div>
              </div>

              {/* Right: animating card */}
              <div className="expertise-cards-stack" style={{ display: 'flex', alignItems: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    className="expertise-card-frame"
                    initial={{ opacity: 0, y: 50, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.94 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h4 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '24px', fontFamily: 'Outfit', fontWeight: 800 }}>
                      {expertiseItems[activeCard].title}
                    </h4>
                    <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', opacity: 0.75, lineHeight: 1.7 }}>
                      {expertiseItems[activeCard].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </section>

        {/* ── Footer ── */}
        <footer id="footer">
          <div className="container footer-content">
            <motion.a
              href="mailto:hello@piyushrawat.com"
              className="contact-link"
            >
              <motion.span
                className="contact-cta-label"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                ✦ &nbsp; Available for projects &nbsp; ✦
              </motion.span>

              <motion.span
                className="contact-headline"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                GET IN
              </motion.span>
              <motion.span
                className="contact-headline"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                TOUCH
              </motion.span>

              <motion.span
                className="contact-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                hello@piyushrawat.com &nbsp;→
              </motion.span>
            </motion.a>

            <div className="footer-meta">
              <div>Ghaziabad, India</div>
              {!isMobile && <div>Available Worldwide</div>}
              <div>© {new Date().getFullYear()} Piyush Rawat</div>
            </div>
          </div>
        </footer>

      </div>
    </ReactLenis>
  );
};

export default App;
