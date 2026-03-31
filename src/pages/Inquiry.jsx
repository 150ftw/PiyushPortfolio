import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Lead Capture' },
  { id: 2, title: 'Project Overview' },
  { id: 3, title: 'Goals & Style' },
  { id: 4, title: 'Scope & Budget' }
];

const Inquiry = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', company: '',
    videoType: '', projectBrief: '',
    goal: [], targetAudience: '', references: '', style: '',
    numVideos: '', duration: '', rawFootage: 'No',
    needs: [],
    deadline: '', isUrgent: 'No',
    budget: '', longTerm: 'One-time',
    fileLink: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const nextStep = () => currentStep < 4 ? setCurrentStep(prev => prev + 1) : handleSubmit();
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log('Final Form Data:', formData);
    // Simulate submission
    navigate('/thank-you');
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="inquiry-page" style={{ minHeight: '100vh', background: '#000', paddingTop: '150px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Progress Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-tracking-wide" style={{ fontSize: '0.8rem', opacity: 0.5 }}>Step {currentStep} of 4</span>
              <span className="text-tracking-wide" style={{ fontSize: '1.2rem', opacity: 0.8, color: 'var(--accent-purple)', fontFamily: 'Outfit', fontWeight: 700 }}>{steps[currentStep-1].title}</span>
            </div>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.5 }}>
              ← Direct Reach
            </Link>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          className="senior-glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '60px', borderRadius: '32px' }}
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              
              {/* STEP 1: BASIC DETAILS */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontFamily: 'Outfit' }}>Let's start with the basics.</h2>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="form-input" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address (required)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="john@example.com" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp (Optional)</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" placeholder="+91" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company / Brand Name</label>
                      <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="form-input" placeholder="Acme Inc." />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PROJECT OVERVIEW */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontFamily: 'Outfit' }}>Tell me about the project.</h2>
                  <div className="form-group">
                    <label className="form-label">What type of video do you need?</label>
                    <select name="videoType" value={formData.videoType} onChange={handleInputChange} className="form-select" required>
                      <option value="">Select Type</option>
                      <option value="Reels / Shorts">Reels / Shorts</option>
                      <option value="YouTube Video">YouTube Video</option>
                      <option value="Ad Creative">Ad Creative</option>
                      <option value="Corporate Video">Corporate Video</option>
                      <option value="Podcast Edit">Podcast Edit</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Briefly describe your project</label>
                    <textarea name="projectBrief" value={formData.projectBrief} onChange={handleInputChange} className="form-textarea" placeholder="What's the story we're telling?" required />
                    <p style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: '10px' }}>Limit: 200–300 words</p>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: GOALS & STYLE */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontFamily: 'Outfit' }}>Creative Direction.</h2>
                  <div className="form-group">
                    <label className="form-label">What's the goal of this video? (Multi-select)</label>
                    <div className="check-group">
                      {['Increase engagement', 'Drive sales', 'Brand awareness', 'Education', 'Content growth'].map(g => (
                        <div key={g} className={`check-item ${formData.goal.includes(g) ? 'active' : ''}`} onClick={() => toggleMultiSelect('goal', g)}>{g}</div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred editing style</label>
                    <select name="style" value={formData.style} onChange={handleInputChange} className="form-select">
                      <option value="">Select Style</option>
                      <option value="Fast-paced / Viral">Fast-paced / Viral</option>
                      <option value="Cinematic">Cinematic</option>
                      <option value="Minimal / Clean">Minimal / Clean</option>
                      <option value="Storytelling">Storytelling</option>
                      <option value="Open to suggestions">Open to suggestions</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reference Videos (URLs)</label>
                    <input type="text" name="references" value={formData.references} onChange={handleInputChange} className="form-input" placeholder="YouTube or Drive links" />
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SCOPE & BUDGET */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontFamily: 'Outfit' }}>Budget & Timeline.</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Budget range</label>
                      <select name="budget" value={formData.budget} onChange={handleInputChange} className="form-select" required>
                        <option value="">Select Range</option>
                        <option value="₹5k–₹10k">₹5k – ₹10k</option>
                        <option value="₹10k–₹25k">₹10k – ₹25k</option>
                        <option value="₹25k–₹50k">₹25k – ₹50k</option>
                        <option value="₹50k+">₹50k+</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Deadline</label>
                      <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} className="form-input" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Is this a long-term potential?</label>
                    <div className="check-group">
                      {['One-time', 'Ongoing collaboration'].map(opt => (
                        <div key={opt} className={`check-item ${formData.longTerm === opt ? 'active' : ''}`} onClick={() => setFormData(p => ({ ...p, longTerm: opt }))}>{opt}</div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Assets (Link to Drive/Dropbox)</label>
                    <input type="text" name="fileLink" value={formData.fileLink} onChange={handleInputChange} className="form-input" placeholder="Optional but recommended" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '15px 30px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'Outfit' }}>
                  Back
                </button>
              )}
              <div style={{ marginLeft: 'auto' }}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(133, 77, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  style={{
                    background: 'var(--accent-purple)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    fontFamily: 'Outfit',
                    cursor: 'pointer'
                  }}
                >
                  {currentStep === 4 ? 'Submit Project Inquiry' : 'Continue'}
                </motion.button>
                {currentStep === 4 && (
                  <p style={{ textAlign: 'right', fontSize: '0.7rem', opacity: 0.4, marginTop: '10px' }}>I typically respond within 24-72 hours.</p>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Inquiry;
