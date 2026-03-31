import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
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

const ProjectCard = ({ proj, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={onMouseMove}
            className="senior-glass"
            style={{
                position: 'relative',
                borderRadius: '32px',
                overflow: 'hidden',
                padding: '20px',
                cursor: 'pointer'
            }}
        >
             <motion.div
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            rgba(133, 77, 255, 0.1),
                            transparent 85%
                        )
                    `,
                }}
                className="absolute inset-0 pointer-events-none"
            />

            <div style={{ aspectHeight: '9/16', overflow: 'hidden', borderRadius: '24px', position: 'relative' }}>
                <img 
                    src={proj.img} 
                    alt={proj.title} 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        aspectRatio: '16/9',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} 
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>

            <div style={{ marginTop: '24px', padding: '0 10px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                    {proj.tags.map(tag => (
                        <span key={tag} className="tag" style={{ margin: 0 }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', fontFamily: 'Outfit', fontWeight: 800 }}>
                    {proj.title}
                </h3>
                <p style={{ opacity: 0.5, fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '90%' }}>
                    {proj.details}
                </p>
            </div>
        </motion.div>
    );
};

const Work = () => {
    return (
        <div className="work-page">
            <section className="section-padding" style={{ paddingTop: '180px', background: '#000' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
                        {projects.map((proj, i) => (
                            <ProjectCard key={i} proj={proj} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <BookingCTA />
        </div>
    );
};

export default Work;
