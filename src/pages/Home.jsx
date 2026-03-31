import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Beams from '../components/Beams';

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

const Home = ({ isMobile }) => {
  const marqueeRef = useRef(null);
  
  // ---- WORK SECTION: pixel-accurate horizontal scroll ----
  const workSectionRef  = useRef(null);
  const workContentRef  = useRef(null);
  const [workTranslate, setWorkTranslate] = React.useState(0);

  const { scrollYProgress: workProgress } = useScroll({
    target: workSectionRef,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const measure = () => {
      if (workContentRef.current) {
        const totalW  = workContentRef.current.scrollWidth;
        const viewW   = window.innerWidth;
        setWorkTranslate(-(totalW - viewW));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const xMotion = useTransform(workProgress, [0, 1], [0, workTranslate]);
  const workOpacity = useTransform(workProgress, [0.9, 1], [1, 0]);
  const albumTextX  = useTransform(workProgress, [0, 1], ['-5%', '5%']);

  // ---- EXPERTISE SECTION: event-driven card swap ----
  const expertiseSectionRef = useRef(null);
  const [activeCard, setActiveCard] = React.useState(0);

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

  // Marquee items duplicated for seamless loop
  const marqueeItems = ["Brands & Creators", "✦", "Hershey's", "✦", "Tech Burner", "✦", "Netflix India", "✦", "Red Bull Gaming", "✦", "Unacademy", "✦"];
  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <>
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
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
      >
        <div className="marquee-content">
          {duplicatedItems.map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </motion.div>

      {/* ── Selected Work ── */}
      <section ref={workSectionRef} className="horizontal-scroll-section" id="work" style={{ height: isMobile ? 'auto' : '600vh' }}>
        {isMobile ? (
          <div style={{ padding: '80px 20px' }}>
            <h2 className="section-title" style={{ marginBottom: '50px' }}>
              <MaskText>Selected</MaskText><br />
              <MaskText className="text-accent">Work</MaskText>
            </h2>
            {projects.map((proj, i) => (
              <motion.a key={i} href="#" className="project-card" style={{ display: 'block', marginBottom: '40px' }} whileHover={{ scale: 1.02 }}>
                <div className="project-img-wrapper" style={{ height: '280px', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="project-info" style={{ marginTop: '16px' }}>
                  <h3 className="project-title" style={{ fontSize: '1.4rem' }}>{proj.title}</h3>
                  <div className="project-tags">{proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <motion.div className="sticky-wrapper" style={{ opacity: workOpacity }}>
            <motion.div className="parallax-bg-text" style={{ x: albumTextX }}>ALBUMS</motion.div>
            <motion.div ref={workContentRef} className="horizontal-content" style={{ x: xMotion }}>
              <div style={{ minWidth: '45vw', flexShrink: 0 }}>
                <h2 className="section-title" style={{ fontSize: '8vw', lineHeight: 1 }}>
                  <MaskText>Selected</MaskText><br />
                  <MaskText className="text-accent">Work</MaskText>
                </h2>
              </div>
              {projects.map((proj, i) => (
                <motion.a key={i} href="#" className="project-card" style={{ minWidth: '32vw', flexShrink: 0, height: '65vh', marginTop: i % 2 === 0 ? '-3vh' : '3vh' }} whileHover={{ scale: 1.03 }}>
                  <div className="project-img-wrapper" style={{ height: '80%', borderRadius: '20px', overflow: 'hidden' }}>
                    <img src={proj.img} alt={proj.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    <div className="play-hint" />
                  </div>
                  <div className="project-info" style={{ marginTop: '16px' }}>
                    <h3 className="project-title" style={{ fontSize: '1.4rem' }}>{proj.title}</h3>
                    <div className="project-tags">{proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ── Expertise ── */}
      <section ref={expertiseSectionRef} className="expertise-stack-container" id="expertise" style={{ height: isMobile ? 'auto' : '500vh' }}>
        {isMobile ? (
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
          <div className="expertise-stack-sticky">
            <div className="expertise-header-container">
              <h2 className="section-title" style={{ fontSize: '4.5vw', textAlign: 'left', margin: 0 }}>
                <MaskText>Core</MaskText><br />
                <MaskText className="text-accent">Expertise</MaskText>
              </h2>
              <div style={{ marginTop: '40px', opacity: 0.4, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                {String(activeCard + 1).padStart(2, '0')} / {String(expertiseItems.length).padStart(2, '0')}
              </div>
            </div>
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
                  <h4 style={{ color: 'var(--accent-purple)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '24px', fontFamily: 'Outfit', fontWeight: 800 }}>{expertiseItems[activeCard].title}</h4>
                  <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', opacity: 0.75, lineHeight: 1.7 }}>{expertiseItems[activeCard].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
