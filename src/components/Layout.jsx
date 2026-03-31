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
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 6 + Math.random() * 4,
          ease: "easeInOut"
        }}
      />
      
      {chars.map((char, i) => (
        <motion.span
          key={i}
          animate={{ 
            opacity: [1, 0.9, 1],
            textShadow: [
              '0 0 10px rgba(168, 85, 247, 0.1)',
              '0 0 25px rgba(168, 85, 247, 0.8)',
              '0 0 40px rgba(168, 85, 247, 0.4)',
              '0 0 10px rgba(168, 85, 247, 0.1)',
            ],
            scale: [1, 1.08, 1.02, 1],
            filter: ['brightness(1)', 'brightness(2)', 'brightness(1.5)', 'brightness(1)'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 5 + Math.random() * 5,
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
            { name: 'Contact', path: '/inquiry' }
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
              hello@piyushrawat.com &nbsp;→
            </motion.span>
          </Link>

          <div className="footer-meta">
            <div>Ghaziabad, India</div>
            {!isMobile && <div>Available Worldwide</div>}
            <div>© {new Date().getFullYear()} Piyush Rawat</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
