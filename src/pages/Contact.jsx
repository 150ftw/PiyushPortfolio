import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookingCTA from '../components/BookingCTA';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const Contact = () => {
    return (
        <div className="contact-page">
            <section className="section-padding" style={{ paddingTop: '180px', background: '#000' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <h1 className="section-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', marginBottom: '40px' }}>
                            Get In <span className="text-accent">Touch</span>
                        </h1>
                        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.7, lineHeight: '1.8' }}>
                            Ready to transform your content? Whether you have a specific project in mind or just want to explore the possibilities, I'm here to help you scale.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ background: 'rgba(255,255,255,0.03)', padding: '50px', borderRadius: '30px', border: '1px solid rgba(133,77,255,0.1)' }}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px', fontFamily: 'Outfit' }}>Direct Communication</h3>
                            <div style={{ marginBottom: '30px' }}>
                                <p style={{ opacity: 0.5, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>Email</p>
                                <a href="mailto:hello@piyushrawat.com" style={{ fontSize: '1.4rem', color: 'white', textDecoration: 'none', fontWeight: 600 }}>hello@piyushrawat.com</a>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <p style={{ opacity: 0.5, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>Location</p>
                                <p style={{ fontSize: '1.2rem', color: 'white' }}>Ghaziabad, India (Universal Availability)</p>
                            </div>
                            <div>
                                <p style={{ opacity: 0.5, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>Socials</p>
                                <div style={{ display: 'flex', gap: '20px', fontSize: '1.1rem' }}>
                                    <a href="#" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>LinkedIn</a>
                                    <a href="#" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>Instagram</a>
                                    <a href="#" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>X (Twitter)</a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: 'Outfit', fontWeight: 800 }}>Project Inquiry</h3>
                            <p style={{ opacity: 0.7, lineHeight: '1.8', marginBottom: '40px' }}>
                                For brand inquiries, creator partnerships, or bulk short-form retainers, please reach out directly via email or the booking link below. I typically respond within 24 hours.
                            </p>
                            <Link to="/inquiry" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(133, 77, 255, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'var(--accent-purple)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '20px 45px',
                                        borderRadius: '50px',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        fontFamily: 'Outfit',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        width: 'fit-content'
                                    }}
                                >
                                    Start Your Project Today
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <BookingCTA />
        </div>
    );
};

export default Contact;
