import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

  // Horizontal Scroll Logic (Selected Work)
  const workRef = useRef(null);
  const { scrollYProgress: workProgress } = useScroll({
    target: workRef,
    offset: ["start start", "end end"]
  });
  
  const xTranslate = useTransform(workProgress, [0, 1], ["0%", "-65%"]);
  const albumTextX = useTransform(workProgress, [0, 1], ["-10%", "130%"]);

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
    <ReactLenis root>
      <div id="app-container" style={{ position: 'relative', overflowX: 'hidden', background: '#000' }}>
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
          <div className="container hero-content" style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="hero-title" style={{ display: 'flex', flexDirection: 'column' }}>
                <MaskText>LET'S CREATE</MaskText>
                <MaskText>VIDEOS PEOPLE</MaskText>
                <div style={{ display: 'flex', gap: '20px' }}>
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
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
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
              <motion.p style={{ marginBottom: '30px' }} variants={fadeInUp}>
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
            <div className="sticky-wrapper">
                <motion.div 
                    className="parallax-bg-text"
                    style={{ x: albumTextX, top: '50%', transform: 'translateY(-50%)', opacity: 0.05 }}
                >
                    ALBUMS
                </motion.div>
                
                <motion.div className="horizontal-content" style={{ x: xTranslate }}>
                    <div style={{ minWidth: '40vw' }}>
                        <h2 className="section-title" style={{ fontSize: '8vw' }}>
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
                                minWidth: '35vw', 
                                height: '60vh', 
                                marginTop: i % 2 === 0 ? '-5vh' : '5vh',
                                scale: i === 0 ? 1 : 0.95
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="project-img-wrapper" style={{ height: '100%', borderRadius: '20px' }}>
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
            </div>
        </section>

        {/* Expertise Section - Sticky Stack Experience */}
        <section ref={expertiseRef} className="expertise-stack-container" id="expertise">
            <div className="expertise-stack-sticky">
                <div style={{ position: 'absolute', top: '10%', left: '5%', zIndex: 10 }}>
                    <h2 className="section-title" style={{ fontSize: '5vw' }}>
                        <MaskText>Core</MaskText><br/>
                        <MaskText className="text-accent">Expertise</MaskText>
                    </h2>
                </div>

                {[
                    { title: "SHORT-FORM", desc: "Viral-ready Reels and Shorts optimized for retention.", bg: "rgba(168, 85, 247, 0.1)" },
                    { title: "YOUTUBE", desc: "Advanced storytelling and dynamic pacing for scaling channels.", bg: "rgba(255, 0, 0, 0.05)" },
                    { title: "COLOR GRADING", desc: "High-end cinematic color palettes in DaVinci Resolve.", bg: "rgba(0, 255, 255, 0.05)" },
                    { title: "MOTION GRAPHICS", desc: "Kinetic typography and custom After Effects VFX.", bg: "rgba(255, 255, 255, 0.05)" }
                ].map((item, i) => {
                    const step = 1 / 4;
                    const start = i * step;
                    const end = (i + 1) * step;
                    
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(expProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const scale = useTransform(expProgress, [start, start + 0.05, end - 0.05, end], [0.8, 1, 1, 0.8]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const y = useTransform(expProgress, [start, start + 0.05, end - 0.05, end], [50, 0, 0, -50]);

                    return (
                        <motion.div 
                            key={i}
                            className="expertise-card-frame"
                            style={{ opacity, scale, y }}
                        >
                            <h4 style={{ color: 'var(--accent-purple)', fontSize: '2.5rem', marginBottom: '20px' }}>{item.title}</h4>
                            <p style={{ fontSize: '1.4rem', opacity: 0.8, lineHeight: '1.6' }}>{item.desc}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>

        {/* Footer */}
        <footer id="footer">
          <div className="container footer-content">
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
                style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}
              >
                START YOUR PROJECT TODAY →
              </motion.span>
            </motion.a>
            
            <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-between', width: '100%', opacity: 0.6 }}>
                <div>GHAZIABAD, INDIA</div>
                <div>AVAILABLE WORLDWIDE</div>
                <div>&copy; {new Date().getFullYear()} PIYUSH RAWAT</div>
            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
};

export default App;
