import React from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { id: '1', title: 'Instant SOS Alerts', icon: 'fa-bell', color: '#E63946', bg: '#FEE2E2' },
  { id: '2', title: 'Nearest Hospital Locator', icon: 'fa-hospital-alt', color: '#2563EB', bg: '#DBEAFE' },
  { id: '3', title: 'Live Navigation Assistance', icon: 'fa-location-arrow', color: '#059669', bg: '#D1FAE5' },
  { id: '4', title: 'Emergency Contact Dialer', icon: 'fa-phone-alt', color: '#D97706', bg: '#FEF3C7' },
  { id: '5', title: 'First Aid Guide', icon: 'fa-book-medical', color: '#4F46E5', bg: '#E0E7FF' },
  { id: '6', title: 'Multi-Language Support', icon: 'fa-language', color: '#DB2777', bg: '#FCE7F3' },
  { id: '7', title: 'Offline Mode', icon: 'fa-wifi', color: '#4B5563', bg: '#F3F4F6' },
  { id: '8', title: 'Real-Time Notifications', icon: 'fa-comment-medical', color: '#0891B2', bg: '#CFFAFE' },
  { id: '9', title: 'User-Friendly Dashboard', icon: 'fa-columns', color: '#7C3AED', bg: '#EDE9FE' },
  { id: '10', title: 'Accessibility Features', icon: 'fa-universal-access', color: '#EA580C', bg: '#FFEDD5' },
];

export default function Features() {
  return (
    <div>
      <header className="page-banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="container page-banner-content">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Complete Emergency Toolkit</h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>
            Click on any feature below to explore its functional details.
          </p>
        </div>
      </header>

      <div className="section" style={{ background: '#F8F9FA' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {FEATURES.map(f => (
              <Link to={`/features/${f.id}`} key={f.id} style={{ background: 'white', padding: '2.5rem 2rem', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', color: f.color, marginBottom: '1.5rem' }}>
                  <i className={`fas ${f.icon}`}></i>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#111827' }}>{f.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
