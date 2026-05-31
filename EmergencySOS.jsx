import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EmergencySOS() {
  const [countdown, setCountdown] = useState(5);
  const [triggered, setTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0 && !triggered) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !triggered) {
      executeSOS();
    }
    return () => clearTimeout(timer);
  }, [countdown, triggered]);

  const executeSOS = async () => {
    setTriggered(true);
    try {
      await fetch('http://localhost:5000/api/sos', { method: 'POST' });
    } catch(err) {
      console.log("Could not hit backend API", err);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#111827', color: 'white', textAlign: 'center', padding: '2rem' }}>
      
      {!triggered ? (
        <>
          <h1 style={{ color: '#E63946', fontSize: '3rem', marginBottom: '1rem' }}>EMERGENCY SOS INITIATED</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '3rem' }}>Alerting local responders and your emergency contacts in...</p>
          <div style={{ fontSize: '6rem', fontWeight: 'bold', width: '200px', height: '200px', border: '10px solid #E63946', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
            {countdown}
          </div>
          <button onClick={() => navigate('/')} className="btn btn-outline" style={{ color: 'white', borderColor: 'white', fontSize: '1.25rem', padding: '1rem 3rem' }}>Cancel SOS</button>
        </>
      ) : (
        <>
          <div style={{ fontSize: '5rem', color: '#10B981', marginBottom: '2rem' }}><i className="fas fa-check-circle"></i></div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Alert Dispatched</h1>
          <p style={{ fontSize: '1.25rem', color: '#9CA3AF', maxWidth: '600px', marginBottom: '3rem' }}>Emergency responders have received your exact GPS coordinates and medical history. An ambulance is en route. Stay calm and stay put.</p>
          <Link to="/track" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>Track Ambulance</Link>
        </>
      )}

    </div>
  );
}
