import React from 'react';

export const IconShortForm = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 7L13 10L9 13V7Z" fill="currentColor"/>
  </svg>
);

export const IconYouTube = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22.54 6.42A2.78 2.78 0 0020.58 4.46C18.84 4 12 4 12 4s-6.84 0-8.58.46a2.78 2.78 0 00-1.96 1.96C1 8.16 1 12 1 12s0 3.84.46 5.58a2.78 2.78 0 001.96 1.96C5.16 20 12 20 12 20s6.84 0 8.58-.46a2.78 2.78 0 001.96-1.96C23 15.84 23 12 23 12s0-3.84-.46-5.58z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9.75 15.02l5.75-3.02-5.75-3.02v6.04z" fill="currentColor"/>
  </svg>
);

export const IconColor = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 3V21" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21" fill="currentColor" fillOpacity="0.2"/>
    <path d="M7.5 7.5L16.5 16.5" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const IconVFX = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
  </svg>
);
