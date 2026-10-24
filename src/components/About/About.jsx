import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const statsData = [
  { target: 5, suffix: '+', label: 'Years Experience', icon: 'zap' },
  { target: 50, suffix: '+', label: 'Projects Completed', icon: 'briefcase' },
  { target: 20, suffix: '+', label: 'Happy Clients', icon: 'users' }
];

export default function About() {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const currentRef = statsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const animateCount = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              statsData.map((stat) => Math.floor(easeProgress * stat.target))
            );

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setCounts(statsData.map((stat) => stat.target));
            }
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasAnimated]);

  const handleDownloadResume = () => {
    // Download placeholder resume or alert
    const blob = new Blob([
      `Alex Devara - Full Stack Developer\n\nExperience: 5+ Years\nSpecialties: React, Node.js, Next.js, Cloud Architectures\nEmail: alex.devara@example.com\nPortfolio: https://alexdevara.dev`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex_Devara_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'zap':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        );
      case 'briefcase':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case 'users':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Title */}
        <div className="section-header reveal">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A glimpse into my journey, mindset, and what fuels my passion for building web applications.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="about-grid">
          {/* Left Column: Stylized Avatar Frame */}
          <div className="about-visual-col reveal">
            <div className="avatar-frame-container">
              {/* Rotating Gradient Frame */}
              <div className="avatar-frame">
                <div className="avatar-inner">
                  <div className="code-header">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                    <span className="code-filename">developer.config.ts</span>
                  </div>

                  <div className="avatar-graphic">
                    <div className="initials-badge">
                      <span className="gradient-text initials-text">AD</span>
                    </div>
                    <div className="code-snippet">
                      <p><span className="keyword">const</span> <span className="variable">developer</span> = &#123;</p>
                      <p className="indent-1"><span className="property">name:</span> <span className="string">'Alex Devara'</span>,</p>
                      <p className="indent-1"><span className="property">role:</span> <span className="string">'Full Stack Architect'</span>,</p>
                      <p className="indent-1"><span className="property">location:</span> <span className="string">'Remote / Global'</span>,</p>
                      <p className="indent-1"><span className="property">status:</span> <span className="string">'Ready to Innovate'</span></p>
                      <p>&#125;;</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="deco-dot dot-1"></div>
              <div className="deco-dot dot-2"></div>
              <div className="deco-line line-1"></div>
              <div className="floating-badge glass-card">
                <span className="badge-icon">🚀</span>
                <div>
                  <div className="badge-title">Full Stack</div>
                  <div className="badge-desc">Modern React & Node</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Content & Stats */}
          <div className="about-content-col reveal">
            <h3 className="about-heading">
              Passionate <span className="gradient-text">Full Stack Developer</span>
            </h3>

            <div className="about-bio">
              <p>
                Hello! I'm Alex Devara, a dedicated Full Stack Developer with over 5 years of experience
                in architecting modern, performant, and intuitive web solutions. I specialize in the JavaScript
                ecosystem, crafting responsive user interfaces with React and robust backend microservices with Node.js.
              </p>
              <p>
                My philosophy centers on clean code, maintainability, and user-centric architecture. Whether
                scaling complex SaaS applications or fine-tuning interactive micro-animations, I bridge the gap
                between design elegance and engineering rigor.
              </p>
              <p>
                When I'm not writing code, I love exploring emerging technologies like AI-driven interfaces,
                contributing to open-source communities, and sharing technical insights with aspiring engineers.
              </p>
            </div>

            {/* Stats Row */}
            <div className="stats-row" ref={statsRef}>
              {statsData.map((stat, idx) => (
                <div key={stat.label} className="stat-card glass-card">
                  <div className="stat-icon-wrapper">
                    {renderIcon(stat.icon)}
                  </div>
                  <div className="stat-number">
                    <span className="stat-val">{counts[idx]}</span>
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Download Resume Action */}
            <div className="about-cta">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownloadResume}
                aria-label="Download Resume"
              >
                <span>Download Resume</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
