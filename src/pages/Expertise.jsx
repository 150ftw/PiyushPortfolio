import React from 'react';
import { motion } from 'framer-motion';
import BookingCTA from '../components/BookingCTA';

const services = [
    {
        title: "Short Form Strategy",
        icon: "📱",
        desc: "Engineered for Reels, TikTok, and YouTube Shorts. Focus on the first 3-second hook and high-speed pacing to maximize viral reach.",
        deliverables: ["Kinetic Typography", "Sound Design", "Frame-Perfect Sync", "Viral Hook Extraction"]
    },
    {
        title: "YouTube Content Branding",
        icon: "🎬",
        desc: "Advanced storytelling for long-form creators. We handle everything from pacing to transitions, ensuring your viewers stay engaged from start to finish.",
        deliverables: ["Pacing Optimization", "Dynamic Intro Hooks", "B-Roll Integration", "Engagement Overlays"]
    },
    {
        title: "Cinematic Color Grading",
        icon: "🎨",
        desc: "Industry-standard grading in DaVinci Resolve. Whether you want a dark moody aesthetic or a vibrant commercial look, we craft unique LUTs tailored to your brand.",
        deliverables: ["Custom Color Palettes", "Skin Tone Correction", "Scene Consistency", "HDR Delivery"]
    },
    {
        title: "VFX & Motion Graphics",
        icon: "⚡",
        desc: "Custom After Effects sequences that bring your videos to life. From subtle HUDs to complex kinetic typography and visual effects.",
        deliverables: ["After Effects Sequences", "Custom Transitions", "3D Elements Integration", "Animated Logo Infusion"]
    }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const Expertise = () => {
    return (
        <div className="expertise-page">
            <section className="section-padding" style={{ paddingTop: '180px', background: '#000' }}>
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <h1 className="section-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', marginBottom: '40px' }}>
                            Core <span className="text-accent">Expertise</span>
                        </h1>
                        <p style={{ maxWidth: '800px', fontSize: '1.2rem', opacity: 0.7, lineHeight: '1.8' }}>
                            I provide premium video editing services designed for creators and brands who demand excellence. Every service is a result of years of experience in retention science and cinematic aesthetics.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    padding: '50px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '30px' }}>{service.icon}</div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'Outfit', fontWeight: 800 }}>{service.title}</h3>
                                <p style={{ opacity: 0.7, lineHeight: '1.7', marginBottom: '40px' }}>{service.desc}</p>
                                
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                                    <h4 style={{ fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', opacity: 0.5 }}>Deliverables:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {service.deliverables.map(item => (
                                            <li key={item} style={{ fontSize: '0.85rem', opacity: 0.8, color: 'var(--accent-purple)' }}>
                                                ✦ {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <BookingCTA />
        </div>
    );
};

export default Expertise;
