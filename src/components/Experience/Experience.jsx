import React from 'react';
import './Experience.css';

const experiences = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'Nexus Tech Solutions',
    period: '2022 - Present',
    description:
      'Lead a cross-functional team of 8 engineers building real-time collaboration dashboards and microservices. Improved application load performance by 45% with code-splitting and edge caching.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']
  },
  {
    role: 'Full Stack Developer',
    company: 'Hyperion Labs',
    period: '2020 - 2022',
    description:
      'Engineered customer-facing fintech portals handling over $2M in daily transaction volume. Architected resilient payment gateway integrations and event-driven notifications.',
    technologies: ['React', 'Redux', 'Express', 'MongoDB', 'Docker', 'Stripe']
  },
  {
    role: 'Frontend Developer',
    company: 'Aura Interactive',
    period: '2019 - 2020',
    description:
      'Developed high-fidelity design systems, landing experiences, and accessible components for high-growth startups and global brands.',
    technologies: ['JavaScript', 'React', 'CSS Modules', 'WebSockets', 'Jest']
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header reveal">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            A chronological timeline of my professional roles and key accomplishments.
          </p>
        </div>

        <div className="experience-timeline">
          {experiences.map((item, index) => (
            <div key={item.role + index} className="timeline-item reveal">
              <div className="timeline-marker">
                <div className="timeline-dot" />
                {index < experiences.length - 1 && <div className="timeline-line" />}
              </div>

              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <div className="timeline-company">{item.company}</div>
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </div>

                <p className="timeline-desc">{item.description}</p>

                <div className="timeline-tags">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="timeline-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
