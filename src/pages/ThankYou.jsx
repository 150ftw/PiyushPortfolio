import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div className="thank-you-page" style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="senior-glass"
                    style={{ padding: '80px', borderRadius: '40px', maxWidth: '600px', margin: '0 auto' }}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '30px' }}>🚀</div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: 'Outfit', fontWeight: 800 }}>
                        Inquiry <span className="text-accent">Received!</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.7, lineHeight: '1.8', marginBottom: '40px' }}>
                        Thank you for reaching out. I've received your project details and will review them carefully. 
                        I typically respond within **24-72 hours**.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'var(--accent-purple)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '15px 35px',
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    fontFamily: 'Outfit',
                                    cursor: 'pointer'
                                }}
                            >
                                Back to Home
                            </motion.button>
                        </Link>
                        <Link to="/work" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'transparent',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '15px 35px',
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    fontFamily: 'Outfit',
                                    cursor: 'pointer'
                                }}
                            >
                                View Portfolio
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ThankYou;
