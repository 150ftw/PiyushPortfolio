import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSpring } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

// Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Expertise from './pages/Expertise';
import Contact from './pages/Contact';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Mouse Glow Position (Springs) - Shared logic
  const mouseX = useSpring(0, { stiffness: 60, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 25 });

  useEffect(() => {
    // Scroll Reset
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

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <Layout isMobile={isMobile} mouseX={mouseX} mouseY={mouseY}>
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile} />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </ReactLenis>
  );
};

export default App;
