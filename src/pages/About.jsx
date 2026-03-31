import React from 'react';
import { motion } from 'framer-motion';
import BookingCTA from '../components/BookingCTA';

const fadeInUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const About = () => {
    return (
        <div className="about-page">
            {/* Hero Section for About */}
            <section className="section-padding" style={{ paddingTop: '180px', background: '#000' }}>
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: '40px' }}>
                            The <span className="text-accent">Story</span> <br />
                            Behind the Frames
                        </h1>
                        <p style={{ maxWidth: '800px', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: '1.7', opacity: 0.8 }}>
                            I am Piyush Rawat, a professional video editor and visual storyteller. My mission is simple: to transform raw footage into high-retention digital assets that command attention in an age of distractions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'Outfit', fontWeight: 800 }}>
                                Retention-First <br />
                                <span className="text-accent">Philosophy</span>
                            </h2>
                            <p style={{ opacity: 0.7, lineHeight: '1.8', marginBottom: '20px' }}>
                                Most editors focus strictly on "cutting." I focus on **pacing, psychological hooks, and visual storytelling**. In today's landscape, every frame matters. If you lose the viewer in the first 3 seconds, you lose the project.
                            </p>
                            <p style={{ opacity: 0.7, lineHeight: '1.8' }}>
                                I combine cinematic aesthetics with data-driven editing styles used by the world's top creators to ensure your content isn't just "watched" — it's experienced.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            style={{ background: 'rgba(255,255,255,0.03)', padding: '50px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <h3 style={{ marginBottom: '30px', opacity: 0.5, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Workflow & Stack</h3>
                            {[
                                { tool: 'DaVinci Resolve', desc: 'Industry-standard cinematic color grading.' },
                                { tool: 'Adobe After Effects', desc: 'High-end custom motion graphics and VFX.' },
                                { tool: 'AI-Enhanced Pipeline', desc: 'Using AI for upscale, clean-up, and efficiency.' },
                                { tool: 'Kinetic Typography', desc: 'Custom text animations that drive retention.' }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeInUp} style={{ marginBottom: '25px' }}>
                                    <h4 style={{ color: 'var(--accent-purple)', fontSize: '1.2rem', marginBottom: '5px' }}>{item.tool}</h4>
                                    <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            <BookingCTA />
        </div>
    );
};

export default About;
