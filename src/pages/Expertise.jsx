import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import BookingCTA from '../components/BookingCTA';
import * as Icons from '../components/Icons';

const services = [
    {
        id: "bento-item-1",
        title: "Short Form Strategy",
        icon: Icons.IconShortForm,
        desc: "Engineered for Reels, TikTok, and YouTube Shorts. Focus on the first 3-second hook and high-speed pacing to maximize viral reach.",
        deliverables: ["Kinetic Typography", "Sound Design", "Frame-Perfect Sync", "Viral Hook Extraction"]
    },
    {
        id: "bento-item-2",
        title: "YouTube Content Branding",
        icon: Icons.IconYouTube,
        desc: "Advanced storytelling for long-form creators. We handle everything from pacing to transitions, ensuring your viewers stay engaged.",
        deliverables: ["Pacing Optimization", "Dynamic Intro Hooks", "B-Roll Integration", "Engagement Overlays"]
    },
    {
        id: "bento-item-3",
        title: "Color Grading",
        icon: Icons.IconColor,
        desc: "Industry-standard grading in DaVinci Resolve.",
        deliverables: ["Custom LUTs", "Skin Tones"]
    },
    {
        id: "bento-item-4",
        title: "VFX / Motion",
        icon: Icons.IconVFX,
        desc: "Custom After Effects sequences that bring videos to life.",
        deliverables: ["Transitions", "3D Elements"]
    }
];

const ExpertiseCard = ({ service, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={onMouseMove}
            className={`senior-glass ${service.id}`}
            style={{
                position: 'relative',
                padding: '40px',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden'
            }}
        >
            <motion.div
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(133, 77, 255, 0.1),
                            transparent 80%
                        )
                    `,
                }}
                className="absolute inset-0 pointer-events-none"
            />

            <div>
                <div style={{ color: 'var(--accent-purple)', marginBottom: '30px' }}>
                    <service.icon size={40} />
                </div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '15px', fontFamily: 'Outfit', fontWeight: 800 }}>
                    {service.title}
                </h3>
                <p style={{ opacity: 0.6, lineHeight: '1.6', fontSize: '1rem', marginBottom: '30px' }}>
                    {service.desc}
                </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <span className="text-tracking-wide" style={{ fontSize: '0.7rem', opacity: 0.4, display: 'block', marginBottom: '15px' }}>
                    Deliverables
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {service.deliverables.map(item => (
                        <span key={item} className="tag" style={{ margin: 0 }}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Expertise = () => {
    return (
        <div className="expertise-page">
            <section className="section-padding" style={{ paddingTop: '180px', background: '#000' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
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
                    <div className="bento-grid">
                        {services.map((service, i) => (
                            <ExpertiseCard key={i} service={service} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <BookingCTA />
        </div>
    );
};

export default Expertise;
