import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(15px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const BookingCTA = () => {
    return (
        <section className="booking-cta section-padding" style={{ position: 'relative', overflow: 'hidden', background: '#050505' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    style={{ maxWidth: '800px', margin: '0 auto' }}
                >
                    <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '30px' }}>
                        Ready to <span className="text-accent">Scale</span> Your Vision?
                    </h2>
                    <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', opacity: 0.7, marginBottom: '50px', lineHeight: '1.8' }}>
                        I don't just edit videos; I engineer high-retention digital experiences. Whether you're a brand looking for commercial excellence or a creator aiming for viral growth, let's build something unforgettable.
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                        <Link to="/contact" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(133, 77, 255, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'var(--accent-purple)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '20px 45px',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    fontFamily: 'Outfit',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                Book Your Order Now
                            </motion.button>
                        </Link>
                        
                        <a href="mailto:hello@piyushrawat.com" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'transparent',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '20px 45px',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    fontFamily: 'Outfit',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}
                            >
                                Custom Inquiry
                            </motion.button>
                        </a>
                    </div>
                </motion.div>
            </div>
            
            {/* Subtle background glow */}
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60vw',
                height: '40vw',
                background: 'radial-gradient(circle, rgba(133, 77, 255, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default BookingCTA;
