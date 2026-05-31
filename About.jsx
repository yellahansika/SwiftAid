import React from 'react';

export default function About() {
  return (
    <div>
      <header className="page-banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="container page-banner-content">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our Mission</h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>
            To eliminate preventable delays in emergency response through intuitive technology, giving every patient the best possible chance at survival and recovery.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2>What Drives Us</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            
            <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', background: '#FEE2E2', color: '#E63946', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Reliability</h3>
              <p style={{ color: '#6B7280' }}>In life-or-death moments, failure is not an option. Our systems are built with triple redundancy bridging offline maps to local mesh networks.</p>
            </div>
            
            <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', background: '#DBEAFE', color: '#2563EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                <i className="fas fa-lock"></i>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Data Privacy</h3>
              <p style={{ color: '#6B7280' }}>Your medical history is yours. It is heavily encrypted to HIPAA standards and only released exactly when you authorize it.</p>
            </div>
            
            <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', background: '#D1FAE5', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                <i className="fas fa-bolt"></i>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Speed</h3>
              <p style={{ color: '#6B7280' }}>We shave minutes off response times seamlessly. In our industry, a single minute is an eternity.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
