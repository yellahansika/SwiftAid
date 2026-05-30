import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function TrackAmbulance() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [eta, setEta] = useState(4);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [17.435, 78.460], // Midpoint
      zoom: 14,
      zoomControl: false,
      scrollWheelZoom: true
    });
    
    L.control.zoom({ position: 'topright' }).addTo(map);
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Patient Location
    const patientIcon = L.divIcon({
      className: 'custom-patient-marker',
      html: '<div style="background:#111827; color:white; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 0 15px rgba(0,0,0,0.3);"><i class="fas fa-street-view" style="font-size: 20px;"></i></div>',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    L.marker([17.420, 78.440], { icon: patientIcon }).addTo(map).bindPopup("<b>Your Location</b>").openPopup();

    // Ambulance Location
    const ambIcon = L.divIcon({
      className: 'custom-amb-marker',
      html: '<div style="background:#E63946; color:white; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 0 15px rgba(230,57,70,0.5);"><i class="fas fa-ambulance" style="font-size: 18px;"></i></div>',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    const ambMarker = L.marker([17.450, 78.480], { icon: ambIcon }).addTo(map).bindPopup("<b>Unit 404</b><br>En Route");

    // Mock Route Line
    const latlngs = [
      [17.450, 78.480],
      [17.440, 78.470],
      [17.430, 78.455],
      [17.420, 78.440]
    ];
    L.polyline(latlngs, { color: '#E63946', weight: 5, dashArray: '10, 10' }).addTo(map);

    // Simulate ETA drop
    const timer = setInterval(() => {
      setEta(prev => (prev > 1 ? prev - 1 : 1));
    }, 60000); // minus 1 min every 60s

    return () => {
      clearInterval(timer);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ padding: '80px 0 0', height: '100vh', display: 'flex', flexDirection: 'column', background: '#F3F4F6' }}>
      
      {/* Top Tracking Header */}
      <header style={{ background: 'white', padding: '1.5rem 2rem', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#FEE2E2', color: '#E63946', padding: '1rem', borderRadius: '50%' }}>
            <i className="fas fa-siren-on" style={{ fontSize: '1.5rem' }}></i>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>Emergency Transit En Route</h1>
            <p style={{ margin: 0, color: '#6B7280', fontWeight: '500' }}>Dispatch ID: #EMG-9941-X</p>
          </div>
        </div>
        <div>
          <Link to="/dashboard" className="btn btn-outline" style={{ background: 'white' }}><i className="fas fa-times"></i> Close Tracker</Link>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Status Bar */}
        <div style={{ width: '400px', background: 'white', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', borderRight: '1px solid #E5E7EB', zIndex: 5 }}>
          
          <div style={{ textAlign: 'center', background: '#111827', color: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#9CA3AF', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Time</h3>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#10B981', lineHeight: '1' }}>0{eta}<span style={{ fontSize: '1.5rem', marginLeft: '0.2rem' }}>MIN</span></div>
            <p style={{ margin: '1rem 0 0 0', background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '0.5rem', borderRadius: '50px', display: 'inline-block', fontSize: '0.85rem', fontWeight: 'bold' }}><i className="fas fa-bolt"></i> HIGH PRIORITY TRAFFIC CLEARANCE</p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Unit Details</h4>
            <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80" alt="Paramedic" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Paramedic Rajesh</h4>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.9rem' }}>Lead Responder &bull; 15 yrs exp</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E7EB', paddingTop: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6B7280' }}>Vehicle</span>
                <strong style={{ color: '#111827' }}>Advanced Life Support (ALS)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>License Plate</span>
                <strong style={{ color: '#111827' }}>TS-09-EM-4040</strong>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Transmitting Data</h4>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E5E7EB' }}>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#111827', lineHeight: '1.8' }}>
                <li>Live GPS Location verified</li>
                <li>Patient medical history synced</li>
                <li>Nearest Trauma Center alerted (Apollo ER)</li>
              </ul>
            </div>
          </div>

          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '1.25rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: 'auto' }}>
            <i className="fas fa-phone-alt"></i> Call Dispatch
          </button>

        </div>

        {/* Map Area */}
        <div ref={mapRef} style={{ flex: 1, zIndex: 0 }} />
        
      </div>

    </div>
  );
}
