import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "Test message" })
      });
      if (res.ok) setStatus('Message sent successfully! We will contact you soon.');
      else setStatus('Error sending message.');
    } catch(err) {
      console.error(err);
      setStatus('Could not connect to backend server. Make sure it is running.');
    }
  };

  return (
    <div>
      <header className="page-banner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="container page-banner-content">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Get in Touch</h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>
            Have questions about integrating SwiftAid at your local hospital? Need support with your account? We're here 24/7.
          </p>
        </div>
      </header>

      <section className="section" style={{ background: '#F8F9FA' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', maxWidth: '1100px', margin: '-100px auto 0', position: 'relative', zIndex: 10 }}>
            
            {/* Contact Info Card */}
            <div style={{ background: '#111827', color: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Contact Information</h2>
              <p style={{ color: '#9CA3AF', marginBottom: '3rem' }}>Fill out the form and our team will get back to you within 24 hours.</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ color: '#E63946', fontSize: '1.5rem' }}><i className="fas fa-phone-alt"></i></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem', fontSize: '1.125rem' }}>Phone</h4>
                  <p style={{ color: '#9CA3AF' }}>+1 (800) 555-0199</p>
                  <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>24/7 Critical Support Line</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ color: '#E63946', fontSize: '1.5rem' }}><i className="fas fa-envelope"></i></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem', fontSize: '1.125rem' }}>Email</h4>
                  <p style={{ color: '#9CA3AF' }}>support@swiftaid.example.com</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: '#E63946', fontSize: '1.5rem' }}><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem', fontSize: '1.125rem' }}>Headquarters</h4>
                  <p style={{ color: '#9CA3AF' }}>1400 Emergency Parkway<br/>Suite 200<br/>Seattle, WA 98101</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111827' }}>Send us a message</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>First Name</label>
                    <input type="text" required placeholder="Jane" style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Last Name</label>
                    <input type="text" required placeholder="Doe" style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                  <input type="email" required placeholder="jane@example.com" style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                  <select required style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px', background: 'white' }}>
                    <option value="" disabled selected>Select a topic...</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Hospital Integration Sales</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                  <textarea required rows="5" placeholder="How can we help?" style={{ width: '100%', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '8px', fontFamily: 'inherit' }}></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>Send Message</button>
                
                {status && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: status.includes('success') ? '#D1FAE5' : '#FEE2E2', color: status.includes('success') ? '#065F46' : '#991B1B', borderRadius: '8px', textAlign: 'center' }}>
                    {status}
                  </div>
                )}
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
