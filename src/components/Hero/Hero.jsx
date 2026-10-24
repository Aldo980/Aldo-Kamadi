import React, { useState, useEffect } from 'react';
import './Hero.css';

const roles = [
  'Full Stack Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Tech Innovator'
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const currentFullText = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText.length + 1 === currentFullText.length) {
          // Pause at end of word
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Backspacing
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Grid Pattern */}
      <div className="hero-grid-overlay" />

      {/* Floating Geometric Shapes */}
      <div className="hero-shapes">
        <div className="shape shape-circle-1" />
        <div className="shape shape-circle-2" />
        <div className="shape shape-square-1" />
        <div className="shape shape-square-2" />
        <div className="shape shape-triangle-1">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 15, 90 85, 10 85" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="shape shape-triangle-2">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50 15, 90 85, 10 85" stroke="rgba(0, 229, 199, 0.3)" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="shape shape-glow-orb orb-1" />
        <div className="shape shape-glow-orb orb-2" />
      </div>

      {/* Main Content */}
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-greeting hero-stagger hero-stagger-1">
            <span className="greeting-badge">
              <span className="pulse-dot"></span>
              Available for Opportunities
            </span>
            <p className="greeting-sub">Hello, I'm</p>
          </div>

          <h1 className="hero-name hero-stagger hero-stagger-2">
            <span className="gradient-text hero-name-gradient">Alex Devara</span>
          </h1>

          <div className="hero-role-wrapper hero-stagger hero-stagger-3">
            <span className="hero-role-label">I am a </span>
            <span className="hero-role-typing">
              {displayText}
              <span className="typing-cursor">|</span>
            </span>
          </div>

          <p className="hero-tagline hero-stagger hero-stagger-4">
            Building digital experiences that blend creativity with cutting-edge technology.
            Focused on crafting scalable, high-performance web applications with exceptional user experiences.
          </p>

          <div className="hero-actions hero-stagger hero-stagger-5">
            <a
              href="#about"
              className="btn btn-primary hero-btn"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('about');
              }}
            >
              <span>View My Work</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="#contact"
              className="btn btn-outline hero-btn"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('contact');
              }}
            >
              <span>Contact Me</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        className="hero-scroll-indicator"
        aria-label="Scroll down to About section"
        onClick={(e) => {
          e.preventDefault();
          handleScrollTo('about');
        }}
      >
        <span className="scroll-indicator-text">Scroll Down</span>
        <div className="scroll-chevron">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </a>
    </section>
  );
}
