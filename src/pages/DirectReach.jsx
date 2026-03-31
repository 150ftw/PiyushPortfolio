import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const Instagram = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Linkedin = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const X = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l5.5 5.5m5.5 5.5l5 5m-16 0l16-16"></path></svg>;
import BookingCTA from '../components/BookingCTA';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const contactMethods = [
  { 
    icon: <Mail className="w-8 h-8" />, 
    label: 'Email', 
    value: 'hello@piyushrawat.com', 
    link: 'mailto:hello@piyushrawat.com',
    color: 'rgba(133, 77, 255, 0.2)'
  },
  { 
    icon: <MessageSquare className="w-8 h-8" />, 
    label: 'WhatsApp', 
    value: 'Message Directly', 
    link: 'https://wa.me/910000000000',
    color: 'rgba(37, 211, 102, 0.2)' 
  },
  { 
    icon: <Phone className="w-8 h-8" />, 
    label: 'Direct Call', 
    value: '+91 00000 00000', 
    link: 'tel:+910000000000',
    color: 'rgba(52, 152, 219, 0.2)'
  }
];

const socialLinks = [
  { icon: <Instagram />, label: 'Instagram', link: '#' },
  { icon: <Linkedin />, label: 'LinkedIn', link: '#' },
  { icon: <X />, label: 'X', link: '#' }
];

const Contact = () => {
    return (
        <div className="contact-page">
            <section className="section-padding" style={{ paddingTop: '180px', paddingBottom: '100px', background: '#000' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <h1 className="section-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', marginBottom: '30px' }}>
                            Direct <span className="text-accent">Reach</span>
                        </h1>
                        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.7, lineHeight: '1.8', marginBottom: '80px' }}>
                            No filters, no gatekeepers. Reach me directly for urgent discussions or personal queries.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
                        {contactMethods.map((method, i) => (
                            <motion.a
                                key={i}
                                href={method.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: '50px 30px',
                                    borderRadius: '40px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}
                                whileHover={{ 
                                    y: -10, 
                                    background: 'rgba(255,255,255,0.05)',
                                    borderColor: 'rgba(133, 77, 255, 0.3)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                                }}
                            >
                                <div style={{ 
                                    padding: '20px', 
                                    borderRadius: '24px', 
                                    background: method.color,
                                    color: 'var(--accent-purple)'
                                }}>
                                    {method.icon}
                                </div>
                                <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', opacity: 0.5 }}>{method.label}</span>
                                <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Outfit' }}>{method.value}</span>
                            </motion.a>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ marginTop: '100px', padding: '60px', borderRadius: '50px', background: 'radial-gradient(circle at center, rgba(133,77,255,0.05) 0%, transparent 70%)' }}
                    >
                        <p style={{ opacity: 0.5, marginBottom: '20px', fontSize: '0.9rem', letterSpacing: '1px' }}>BUSINESS & PROJECTS</p>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'Outfit' }}>Have a project in mind?</h2>
                        <p style={{ opacity: 0.7, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>For brand inquiries and bulk video editing retainers, please use the structured inquiry hub for better coordination.</p>
                        <Link to="/inquiry" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: 'white',
                                    color: 'black',
                                    border: 'none',
                                    padding: '20px 45px',
                                    borderRadius: '50px',
                                    fontSize: '1rem',
                                    fontWeight: 800,
                                    fontFamily: 'Outfit',
                                    cursor: 'pointer'
                                }}
                            >
                                Enter Inquiry Hub ➔
                            </motion.button>
                        </Link>
                    </motion.div>

                    <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
                        {socialLinks.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'white', fontSize: '1.5rem', opacity: 0.5 }}
                                whileHover={{ opacity: 1, y: -5, color: 'var(--accent-purple)' }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
            <BookingCTA />
        </div>
    );
};

export default Contact;
