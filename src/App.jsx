import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
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

const maskReveal = {
    hidden: { y: "100%", skewY: 10 },
    visible: {
        y: 0,
        skewY: 0,
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

const MaskText = ({ children, className = "" }) => (
    <span className={`mask-container ${className}`}>
        <motion.span 
            className="mask-text"
            variants={maskReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {children}
        </motion.span>
    </span>
);

// Expertise Card Sub-Component to avoid Hook Violations in loops
const ExpertiseCard = ({ item, index, progress, total }) => {
    const step = 1 / total;
    const start = index * step;
    const end = (index + 1) * step;
    
    // Overlapping ranges for perfectly continuous cross-fade (no black screens)
    // Larger Y translation ensures Card A's description clears before Card B's title arrives
    const inStart = Math.max(0, index * step - 0.05);
    const inEnd = index * step + 0.03;
    const outStart = (index + 1) * step - 0.03;
    const outEnd = Math.min(1, (index + 1) * step + 0.05);

    // Provide strict, unique interpolation points for Framer Motion to prevent crashes
    const opacity = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
    const scale = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0.85, 1, 1, 0.85]);
    const y = useTransform(progress, [inStart, inEnd, outStart, outEnd], [150, 0, 0, -150]);

    return (
        <motion.div 
            className="expertise-card-frame"
            style={{ opacity, scale, y }}
        >
            <h4 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '20px' }}>{item.title}</h4>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', opacity: 0.8, lineHeight: '1.6' }}>{item.desc}</p>
        </motion.div>
    );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const marqueeRef = useRef(null);
  
  // Mouse Glow Logic
  const mouseX = useSpring(0, { stiffness: 60, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 25 });

  useEffect(() => {
    // RESOLVE INITIAL SCROLL OFFSET BUG
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
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Horizontal Scroll Logic
  const workRef = useRef(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start start", "end end"]
  });
  
  // Use exact vw translation to perfectly center the final project and prevent it from looking "half cut"
  const xTranslate = useTransform(workProgress, [0, 1], ["0vw", "-140vw"]);
  // This opacity smoothly fades the entire project gallery out at the very end to satisfy "vanishes from that section"
  const workOpacity = useTransform(workProgress, [0.95, 1], [1, 0]);
  // Fixed "ALBUMS" parallax math: ensure it stays centered
  const albumTextX = useTransform(workProgress, [0, 1], ["-10%", "10%"]);

  // Expertise Stacking Logic
  const expertiseRef = useRef(null);
  const { scrollYProgress: expProgress } = useScroll({
    target: expertiseRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const expertiseItems = [
    { title: "SHORT-FORM", desc: "Viral-ready Reels and Shorts optimized for retention." },
    { title: "YOUTUBE", desc: "Advanced storytelling and dynamic pacing for scaling channels." },
    { title: "COLOR GRADING", desc: "High-end cinematic color palettes in DaVinci Resolve." },
    { title: "MOTION GRAPHICS", desc: "Kinetic typography and custom After Effects VFX." }
  ];

  useEffect(() => {
    if (marqueeRef.current) {
      const items = marqueeRef.current.innerHTML;
      marqueeRef.current.innerHTML = items + items + items + items;
    }
  }, []);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div id="app-container" style={{ position: 'relative', background: '#000' }}>
        {/* Cinematic Mouse Glow */}
        {!isMobile && (
            <motion.div 
                className="cursor-glow"
                style={{ x: mouseX, y: mouseY }}
            />
        )}

        {/* Navigation */}
        <nav className={isScrolled ? 'scrolled' : ''} style={{ pointerEvents: 'all' }}>
          <div className="nav-name">Piyush Rawat</div>
          <motion.div 
            className="menu-toggle" 
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: 'pointer', zIndex: 1020, pointerEvents: 'all' }}
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
                opacity: isMenuOpen ? 1 : 0,
                zIndex: 1010
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
        <section className="hero" id="home">
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
          <div className="container hero-content" style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="hero-title" style={{ display: 'flex', flexDirection: 'column' }}>
                <MaskText>LET'S CREATE</MaskText>
                <MaskText>VIDEOS PEOPLE</MaskText>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    <MaskText>ACTUALLY </MaskText>
                    <MaskText className="text-accent">WATCH</MaskText>
                </div>
            </h1>
            
            <motion.div 
              className="hero-stats"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
          </div>
        </section>

        {/* Marquee Section */}
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

        {/* About Section */}
        <section className="section-padding" id="about">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '60px', alignItems: 'start' }}>
            <h2 className="section-title">
               <MaskText>Performance</MaskText><br/>
               <MaskText>Meets</MaskText><br/>
               <MaskText className="text-accent">High-Retention</MaskText>
            </h2>
            <motion.div 
              className="about-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p style={{ marginBottom: '30px', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }} variants={fadeInUp}>
                I am Piyush Rawat, a video editor focused on creating clean, engaging, and high-retention content. I work with creators and brands to transform raw footage into polished videos that capture attention and keep it.
              </motion.p>
              <motion.div style={{ marginBottom: '30px', fontSize: '0.9rem', letterSpacing: '1px', opacity: 0.7 }} variants={fadeInUp}>
                LOCATION: GHAZIABAD, INDIA <br />
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

        {/* Work Section - Sticky Horizontal Scroll Experience */}
        <section ref={workRef} className="horizontal-scroll-section" id="work">
            <motion.div className="sticky-wrapper" style={{ opacity: workOpacity }}>
                {!isMobile && (
                    <motion.div 
                        className="parallax-bg-text"
                        style={{ x: albumTextX, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                        ALBUMS
                    </motion.div>
                )}
                
                <motion.div className="horizontal-content" style={{ x: isMobile ? 0 : xTranslate }}>
                    <div style={{ minWidth: isMobile ? '100%' : '50vw' }}>
                        <h2 className="section-title" style={{ fontSize: isMobile ? '3.5rem' : '8vw' }}>
                            <MaskText>Selected</MaskText><br/>
                            <MaskText className="text-accent">Work</MaskText>
                        </h2>
                    </div>

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
                            style={{ 
                                minWidth: isMobile ? '100%' : '35vw', 
                                height: isMobile ? 'auto' : '60vh', 
                                marginTop: (!isMobile && i % 2 === 0) ? '-5vh' : '5vh',
                                scale: (isMobile || i === 0) ? 1 : 0.95
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="project-img-wrapper" style={{ height: isMobile ? '300px' : '100%', borderRadius: '20px' }}>
                                <motion.img 
                                    src={proj.img} 
                                    alt={proj.title} 
                                    className="project-img" 
                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                />
                                <div className="play-hint"></div>
                            </div>
                            <div className="project-info" style={{ marginTop: '20px' }}>
                                <h3 className="project-title" style={{ fontSize: '1.5rem' }}>{proj.title}</h3>
                                <div className="project-tags">
                                    {proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>
        </section>

        {/* Expertise Section - Sticky Stack Experience */}
        <section ref={expertiseRef} className="expertise-stack-container" id="expertise">
            <div className="expertise-stack-sticky">
                {/* Column 1: Static Header */}
                <div className="expertise-header-container">
                    <h2 className="section-title reveal" style={{ fontSize: isMobile ? '3rem' : '4.5vw', textAlign: 'left', margin: 0 }}>
                        <MaskText>Core</MaskText><br/>
                        <MaskText className="text-accent">Expertise</MaskText>
                    </h2>
                </div>

                {/* Column 2: Moving Stack */}
                <div className="expertise-cards-stack">
                    {!isMobile ? expertiseItems.map((item, index) => (
                        <ExpertiseCard 
                            key={index} 
                            item={item} 
                            index={index} 
                            progress={expProgress} 
                            total={expertiseItems.length}
                        />
                    )) : (
                        <div className="expertise-list-mobile">
                            {expertiseItems.map((item, index) => (
                                <div key={index} className="expertise-card-frame-mobile">
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="section-padding">
          <div className="container footer-content" style={{ textAlign: 'center' }}>
            <motion.a 
              href="mailto:hello@piyushrawat.com" 
              className="contact-link"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <MaskText>GET IN TOUCH</MaskText>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ fontSize: isMobile ? '1.1rem' : '1.5rem', color: 'var(--accent-purple)', marginTop: '20px' }}
              >
                START YOUR PROJECT TODAY →
              </motion.span>
            </motion.a>
            
            <div style={{ marginTop: '100px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: '20px', width: '100%', opacity: 0.6, fontSize: '0.9rem' }}>
                <div>GHAZIABAD, INDIA</div>
                {!isMobile && <div>AVAILABLE WORLDWIDE</div>}
                <div>&copy; {new Date().getFullYear()} PIYUSH RAWAT</div>
            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
};

export default App;
