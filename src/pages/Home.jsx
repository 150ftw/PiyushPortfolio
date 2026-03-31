import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const expertiseSectionRef = useRef(null);

  const expertiseItems = [
    { 
      title: 'SHORT-FORM',    
      desc: 'Viral-ready Reels and Shorts optimized for maximum retention.',
      points: ['First 3-second hook strategy', 'Sync-heavy transitions', 'High-retention captions', 'Trending audio integration']
    },
    { 
      title: 'YOUTUBE',       
      desc: 'Advanced storytelling and dynamic pacing for scaling channels.',
      points: ['Narrative arc structuring', 'Engaging B-Roll selection', 'Pattern interrupt techniques', 'Sound design & Foley']
    },
    { 
      title: 'COLOR GRADING', 
      desc: 'High-end cinematic colour palettes crafted in DaVinci Resolve.',
      points: ['Custom LUT development', 'Skin tone correction', 'Shot matching & consistency', 'Atmospheric mood setting']
    },
    { 
      title: 'MOTION GRAPHICS', 
      desc: 'Kinetic typography and custom After Effects VFX sequences.',
      points: ['2D/3D Kinetic Typography', 'Logo & UI animations', 'Seamless VFX compositing', 'Brand-aligned visual assets']
    },
  ];

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
      <section ref={expertiseSectionRef} className="expertise-section section-padding" id="expertise">
        <div className="container">
          <div style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '30px' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}>
              <MaskText>Core</MaskText><br />
              <MaskText className="text-accent">Expertise</MaskText>
            </h2>
            <p style={{ maxWidth: '500px', opacity: 0.6, fontSize: '1.1rem' }}>
              Specialized in high-retention post-production workflows that transform viewer attention into brand authority.
            </p>
          </div>

          <div className="expertise-grid">
            {expertiseItems.map((item, i) => (
              <motion.div
                key={i}
                className="senior-glass expertise-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                style={{
                  padding: '50px',
                  borderRadius: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  height: '100%'
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '2px', 
                  background: 'var(--accent-purple)',
                  boxShadow: '0 0 15px var(--accent-purple-glow)'
                }} />
                
                <div>
                  <h4 style={{ 
                    color: '#fff', 
                    fontSize: '1.8rem', 
                    marginBottom: '10px', 
                    fontFamily: 'Outfit', 
                    fontWeight: 800,
                    letterSpacing: '1px'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ opacity: 0.7, fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {item.points.map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', opacity: 0.5 }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
