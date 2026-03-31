import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(15px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const FluctuatingText = ({ text, delayOffset = 0 }) => {
  const chars = Array.from(text);

  return (
    <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', color: '#fff', overflow: 'hidden', padding: '10px 0' }}>
      {/* Shine Sweep Layer */}
      <motion.div
        className="shine-sweep-layer"
        animate={{ left: ['-100%', '200%'] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut"
        }}
      />

      {chars.map((char, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: [1, 0.98, 1],
            textShadow: [
              '0 0 2px rgba(168, 85, 247, 0)',
              '0 0 5px rgba(168, 85, 247, 0.3)',
              '0 0 8px rgba(168, 85, 247, 0.2)',
              '0 0 2px rgba(168, 85, 247, 0)',
            ],
            scale: [1, 1.01, 1],
            filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1.1)', 'brightness(1)'],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 3 + Math.random() * 5,
            delay: i * 0.08 + delayOffset,
            ease: "easeInOut"
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            lineHeight: '1',
            letterSpacing: '0.02em',
            willChange: 'transform, opacity, filter, text-shadow'
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const Layout = ({ children, isMobile, mouseX, mouseY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu and scroll to top on route change
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [location, lenis]);

  const toggleMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : 'auto';
  };

  return (
    <div id="app-container" style={{ position: 'relative', background: '#000' }}>
      {/* Mouse Glow */}
      {!isMobile && (
        <motion.div className="cursor-glow" style={{ x: mouseX, y: mouseY }} />
      )}

      {/* Nav */}
      <nav className={isScrolled ? 'scrolled' : ''} style={{ pointerEvents: 'all' }}>
        <Link to="/" className="nav-name" style={{ textDecoration: 'none', color: 'inherit' }}>Piyush Rawat</Link>
        <motion.div
          className="menu-toggle"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          style={{ cursor: 'pointer', zIndex: 1020, pointerEvents: 'all', gap: '6px' }}
        >
          <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(8px) rotate(45deg)', background: 'white' } : { background: 'white' }} />
          <div className="menu-line" style={isMenuOpen ? { opacity: 0, background: 'white' } : { background: 'white' }} />
          <div className="menu-line" style={isMenuOpen ? { transform: 'translateY(-8px) rotate(-45deg)', background: 'white' } : { background: 'white' }} />
        </motion.div>
      </nav>

      {/* Menu Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        style={{ pointerEvents: isMenuOpen ? 'all' : 'none', visibility: isMenuOpen ? 'visible' : 'hidden', opacity: isMenuOpen ? 1 : 0, zIndex: 1010 }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', alignItems: 'center', gap: '40px' }}>
            <motion.div className="menu-links" initial="hidden" animate={isMenuOpen ? 'visible' : 'hidden'} variants={staggerContainer} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
              {[
                { name: 'Home', path: '/', sub: 'Back to Start' },
                { name: 'About', path: '/about', sub: 'The vision behind' },
                { name: 'Work', path: '/work', sub: 'Selected archives' },
                { name: 'Expertise', path: '/expertise', sub: 'The technical stack' },
                { name: 'Inquiry', path: '/inquiry', sub: 'Start a project' },
                { name: 'Contact', path: '/contact', sub: 'Direct reach' }
              ].map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="menu-item-wrapper"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '30px', marginBottom: '10px' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="menu-index" style={{ fontSize: '1rem', color: 'var(--accent-purple)', fontWeight: 600, opacity: 0.6 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <motion.span
                      className="menu-item"
                      variants={fadeInUp}
                      whileHover={{ x: 15, color: 'var(--accent-purple)' }}
                      style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.1' }}
                    >
                      {item.name}
                    </motion.span>
                    <span className="menu-sub" style={{ fontSize: '0.8rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '2px', marginLeft: '2px', marginTop: '5px' }}>
                      {item.sub}
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>

            {!isMobile && (
              <motion.div 
                className="menu-visual-side"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isMenuOpen ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ position: 'relative', pointerEvents: 'none' }}
              >
                <h2 style={{ fontSize: '30vw', fontWeight: 900, fontFamily: 'Outfit', lineHeight: 1, margin: 0 }}>
                  PR
                </h2>
              </motion.div>
            )}
          </div>

          {/* Socials / Status */}
          <motion.div 
            className="menu-footer" 
            initial={{ opacity: 0, y: 30 }}
            animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6 }}
            style={{ 
              marginTop: '80px', 
              paddingTop: '40px', 
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', gap: '30px' }}>
              <a href="https://www.instagram.com/ig_rouf/" target="_blank" rel="noopener noreferrer" className="social-mini">Instagram</a>
              <a href="https://www.linkedin.com/in/piyushrawat/" target="_blank" rel="noopener noreferrer" className="social-mini">LinkedIn</a>
              <a href="https://www.youtube.com/channel/UCE-NP3ZWAo2O1NyDoL039rA" target="_blank" rel="noopener noreferrer" className="social-mini">YouTube</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              <span style={{ fontSize: '0.9rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Available for Q3 Projects</span>
            </div>
          </motion.div>
        </div>
      </div>

      <main>{children}</main>

      {/* Footer */}
      <footer id="footer">
        <div className="container footer-content">
          <Link to="/inquiry" className="contact-link" style={{ textDecoration: 'none' }}>
            <motion.span
              className="contact-cta-label"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              ✦ &nbsp; Available for projects &nbsp; ✦
            </motion.span>

            <motion.div
              className="contact-headline"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ display: 'block' }}
            >
              <FluctuatingText text="GET IN" />
            </motion.div>
            <motion.div
              className="contact-headline"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ display: 'block' }}
            >
              <FluctuatingText text="TOUCH" delayOffset={0.5} />
            </motion.div>

            <motion.span
              className="contact-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              &nbsp;
            </motion.span>
          </Link>

          <div className="footer-meta" style={{ position: 'relative', marginTop: isMobile ? '60px' : '100px' }}>

            {[
              "Ghaziabad, India",
              ...(!isMobile ? ["Available Worldwide"] : []),
              `@ ${new Date().getFullYear()} Piyush Rawat`
            ].map((item, i) => (
              <div 
                key={i}
                className="footer-meta-item"
                style={{ position: 'relative', cursor: 'default' }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
