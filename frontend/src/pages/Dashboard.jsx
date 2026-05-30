import React, { useEffect, useRef } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Dashboard() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Prevent double initialization
    if (!mapRef.current || mapInstance.current) return;

    // Initialize raw Leaflet Map
    const map = L.map(mapRef.current, {
      center: [17.4065, 78.4772],
      zoom: 13,
      zoomControl: false, // Hide default zoom controls to keep it cleaner
      scrollWheelZoom: true
    });
    
    // Add custom zoom control to the top right
    L.control.zoom({ position: 'topright' }).addTo(map);
    
    mapInstance.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const hospitalIcon = L.divIcon({
      className: 'custom-hospital-marker',
      html: '<i class="fas fa-map-marker-alt" style="color: #E63946; font-size: 32px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.4));"></i>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const hospitals = [
      { id: 1, lat: 17.4065, lng: 78.4772, name: 'City Central Trauma Center' },
      { id: 2, lat: 17.4265, lng: 78.4572, name: 'Lifeline Hospital ER' },
      { id: 3, lat: 17.3865, lng: 78.4972, name: 'Metro General ICU' },
      { id: 4, lat: 17.4165, lng: 78.5072, name: 'St. Mary\'s Care Facility' },
      { id: 5, lat: 17.3955, lng: 78.4872, name: 'Apex Heart Institute' },
    ];

    hospitals.forEach(h => {
      L.marker([h.lat, h.lng], { icon: hospitalIcon })
        .addTo(map)
        .bindPopup(`<strong>${h.name}</strong><br/>Status: Open 24/7`);
    });

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      
      {/* Side Control Panel overlaying nothing, taking fixed width */}
      <div className="dashboard-sidebar">
        
        <div>
          <div className="sidebar-section-title">Critical Dispatch</div>
          
          <div className="sidebar-action-card" style={{ marginBottom: '1.5rem' }}>
            <div className="sidebar-action-icon" style={{ boxShadow: 'inset 0 0 15px rgba(230,57,70,0.1)' }}>
              <i className="fas fa-plus"></i>
            </div>
            <h3>Emergency SOS</h3>
            <p>Immediate Assistance</p>
            <Link to="/sos" className="btn-sidebar-red">Activate <i className="fas fa-arrow-right"></i></Link>
          </div>

          <div className="sidebar-action-card">
            <div className="sidebar-action-icon">
              <i className="fas fa-ambulance"></i>
            </div>
            <h3>Track Ambulance</h3>
            <p>Live GPS Coordination</p>
            <Link to="/track" className="btn-sidebar-red">Track Now <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>

        <div>
          <div className="sidebar-section-title">Feature Modules</div>
          
          <div className="sidebar-modules-grid">
            <Link to="/features/1" className="sidebar-module">
              <div className="sidebar-module-icon" style={{ color: '#E11D48', background: '#FFE4E6' }}>
                <i className="fas fa-robot"></i>
              </div>
              <span>AI Chat</span>
            </Link>

            <Link to="/features/2" className="sidebar-module">
              <div className="sidebar-module-icon" style={{ color: '#2563EB', background: '#DBEAFE' }}>
                <i className="fas fa-file-prescription"></i>
              </div>
              <span>Rx Scan</span>
            </Link>

            <Link to="/features/3" className="sidebar-module">
              <div className="sidebar-module-icon" style={{ color: '#10B981', background: '#D1FAE5' }}>
                <i className="fas fa-clinic-medical"></i>
              </div>
              <span>Pharmacy</span>
            </Link>

            <Link to="/features/4" className="sidebar-module">
              <div className="sidebar-module-icon" style={{ color: '#DC2626', background: '#FEE2E2' }}>
                <i className="fas fa-hand-holding-medical"></i>
              </div>
              <span>Blood Net</span>
            </Link>

            <Link to="/features/5" className="sidebar-module" style={{ gridColumn: '1 / -1' }}>
              <div className="sidebar-module-icon" style={{ color: '#4B5563', background: '#F3F4F6' }}>
                <i className="fas fa-notes-medical"></i>
              </div>
              <span>Medical History</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Map takes up the remaining standard flow space using flex: 1 */}
      <div ref={mapRef} style={{ flex: 1, zIndex: 0, borderTopLeftRadius: '20px', overflow: 'hidden', margin: '1rem 1rem 1rem 0', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
      
    </div>
  );
}
