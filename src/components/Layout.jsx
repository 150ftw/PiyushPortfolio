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
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Work', path: '/work' },
            { name: 'Expertise', path: '/expertise' },
            { name: 'Contact', path: '/contact' },
            { name: 'Book Now', path: '/inquiry' }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="menu-item"
              style={{ textDecoration: 'none' }}
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.span
                variants={fadeInUp}
                whileHover={{ x: 20, color: 'var(--accent-purple)', skewX: -5 }}
                style={{ display: 'block' }}
              >
                {item.name}
              </motion.span>
            </Link>
          ))}
        </motion.div>
      </div>

      <main>{children}</main>

      {/* Footer */}
      <footer id="footer">
        <div className="container footer-content">
          <Link to="/contact" className="contact-link" style={{ textDecoration: 'none' }}>
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
            {/* Physical Spotlight Fixture */}
            {!isMobile && (
              <motion.div
                className="footer-spotlight-fixture"
                initial={{ opacity: 0, x: "-50%" }}
                animate={{
                  opacity: 1,
                  x: "-50%",
                  filter: hoveredIndex === null 
                    ? ["drop-shadow(0 0 12px rgba(133, 77, 255, 0.4))", "drop-shadow(0 0 20px rgba(133, 77, 255, 0.6))", "drop-shadow(0 0 12px rgba(133, 77, 255, 0.4))"] 
                    : "drop-shadow(0 0 18px rgba(133, 77, 255, 0.7))"
                }}
                transition={{ 
                  filter: hoveredIndex === null ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }
                }}
                style={{ position: 'absolute' }}
              >
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H36C38.2091 0 40 1.79086 40 4V10C40 12.2091 38.2091 14 36 14H4C1.79086 14 0 12.2091 0 10V4Z" fill="#1A1A1A"/>
                  <rect x="4" y="2" width="32" height="10" rx="2" fill="#333333"/>
                  <circle cx="20" cy="8" r="5" fill="#4B4B4B"/>
                  <circle cx="20" cy="8" r="3" fill="white" className="spotlight-lens-glow" />
                  <path d="M10 14L8 24M30 14L32 24" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div className="footer-spotlight-lens-flare" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
              </motion.div>
            )}

            {/* Multi-Ray Spotlight Beam */}
            {!isMobile && (
              <motion.div
                className="footer-spotlight-beam"
                initial={{ opacity: 0, x: "-50%" }}
                animate={{
                  opacity: 1,
                  x: "-50%",
                  rotate: hoveredIndex === 0 ? 68 : hoveredIndex === 1 ? 0 : hoveredIndex === 2 ? -68 : 0,
                  scaleY: hoveredIndex === 0 || hoveredIndex === 2 ? 1.35 : 1
                }}
                transition={{
                  rotate: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  scaleY: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                {/* Lens-Corrected Atmospheric Rays (Mist Cluster) */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="footer-ray-streak"
                    initial={{ x: "-50%", rotate: (i - 2) * 7 }}
                    animate={{
                      opacity: hoveredIndex === null ? [0.2, 0.4, 0.2] : 0.6,
                      scaleY: hoveredIndex === null ? [1, 1.1, 1] : 1.15
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                    style={{
                      left: '50%',
                      transformOrigin: 'top center'
                    }}
                  />
                ))}
              </motion.div>
            )}

            {[
              "Ghaziabad, India",
              ...(!isMobile ? ["Available Worldwide"] : []),
              `© ${new Date().getFullYear()} Piyush Rawat`
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="footer-meta-item"
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{ position: 'relative', cursor: 'default' }}
              >
                {/* Reflection Puddle (Floor Impact) */}
                <motion.div 
                  className="footer-light-puddle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: (hoveredIndex === i) ? 1 : (hoveredIndex === null && i === 1) ? 0.6 : 0,
                    scale: (hoveredIndex === i) ? 1.1 : (hoveredIndex === null && i === 1) ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                <motion.span
                  animate={{ 
                    color: (hoveredIndex === i || (hoveredIndex === null && i === 1)) ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                    textShadow: (hoveredIndex === i || (hoveredIndex === null && i === 1)) ? '0 0 10px rgba(168, 85, 247, 0.5)' : 'none'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {item}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

// Note: Ensure the form is clearly branded for project bookings.
