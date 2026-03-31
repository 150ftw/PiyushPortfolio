import React from 'react';
import { motion } from 'framer-motion';
import BookingCTA from '../components/BookingCTA';

const projects = [
    { 
        title: "Hershey's Campaign", 
        tags: ["Commercial", "Brand Film"], 
        img: "/assets/project1.png",
        details: "A high-end cinematic commercial focused on color grading and rhythmic pacing to drive brand identity."
    },
    { 
        title: "Valorant Montage", 
        tags: ["Gaming", "Cinematic"], 
        img: "/assets/project2.png",
        details: "Technical VFX-heavy edit featuring frame-perfect sync and custom kinetic typography."
    },
    { 
        title: "2024 Showreel", 
        tags: ["Highlights", "Official"], 
        img: "/assets/project3.png",
        details: "A curation of my best work across commercial, YouTube, and short-form content."
    },
    { 
        title: "Retention Strategy", 
        tags: ["YouTube", "Long-Form"], 
        img: "/assets/project4.png",
        details: "Long-form editing for high-profile creators, using storytelling hooks to maintain 70%+ retention."
    },
    { 
        title: "Dynamic Shorts", 
        tags: ["Vertical", "Viral"], 
        img: "/assets/project1.png",
        details: "Fast-paced short-form content designed to hook viewers in the first 2 seconds."
    }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const Work = () => {
    return (
        <div className="work-page">
            <section className="section-padding" style={{ paddingTop: '180px', background: '#000' }}>
                <div className="container">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <h1 className="section-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', marginBottom: '40px' }}>
                            Selected <span className="text-accent">Portfolio</span>
                        </h1>
                        <p style={{ maxWidth: '700px', fontSize: '1.2rem', opacity: 0.7, lineHeight: '1.8' }}>
                            A curation of my most impactful projects across commercial, social, and cinematic industries. Every frame is engineered for visual narrative.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
                        {projects.map((proj, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    borderRadius: '30px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    padding: '24px'
                                }}
                            >
                                <div style={{ height: '280px', borderRadius: '20px', overflow: 'hidden', marginBottom: '24px' }}>
                                    <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="project-tags" style={{ marginBottom: '15px' }}>
                                    {proj.tags.map(tag => <span key={tag} className="tag" style={{ color: 'var(--accent-purple)' }}>{tag}</span>)}
                                </div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', fontFamily: 'Outfit' }}>{proj.title}</h3>
                                <p style={{ opacity: 0.6, fontSize: '0.95rem', lineHeight: '1.6' }}>{proj.details}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <BookingCTA />
        </div>
    );
};

export default Work;
