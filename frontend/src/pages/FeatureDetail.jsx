import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default leaflet marker icon in react
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* --- FEATURE 1: AI CHAT BOT --- */
const AIChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello. I am the SwiftAid AI assistant. Please describe your symptoms or ask any medical-related questions.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have specific information on that. Please consult a medical professional or press Emergency SOS if it's urgent.";
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes('burn')) {
        botResponse = "For a minor burn:\n\n1. Cool the burn immediately under cool (not cold) running water for 10-15 mins.\n2. Remove rings or tight items from the burned area.\n3. Do not break blisters.\n4. Apply a sterile, non-adhesive bandage or clean cloth.\n\n**If the burn is severe, deep, or covers a large area, please press Emergency SOS immediately.**";
      } else if (lowerInput.includes('fever')) {
        botResponse = "For a standard fever:\n\n1. Rest and drink plenty of fluids.\n2. Take over-the-counter medication like Acetaminophen or Ibuprofen if advised by a doctor.\n3. Stay cool with light clothing.\n\n**Seek immediate care if the fever is over 103°F (39.4°C) or accompanied by a severe headache, stiff neck, or difficulty breathing.**";
      } else if (lowerInput.includes('cut') || lowerInput.includes('bleed')) {
        botResponse = "For cuts and bleeding:\n\n1. Wash your hands to avoid infection.\n2. Stop the bleeding by applying firm, gentle pressure with a clean cloth.\n3. Clean the wound with water.\n4. Apply an antibiotic or petroleum jelly and cover with a bandage.\n\n**If the bleeding is severe or won't stop, go to the nearest emergency room.**";
      } else if (lowerInput.includes('cold')) {
        botResponse = "For a common cold:\n\n1. Stay hydrated by drinking plenty of water, juice, or warm soup.\n2. Rest quietly to help your body heal.\n3. Soothe your throat with warm liquids or lozenges.\n4. Relieve stuffiness with saline drops or a humidifier.\n\n*If symptoms last longer than 10 days or worsen, consider seeing a doctor.*";
      } else if (lowerInput.includes('headache')) {
        botResponse = "For a standard headache:\n\n1. Drink water, as dehydration can cause headaches.\n2. Rest in a quiet, dark room.\n3. Use a cold or warm compress on your head or neck.\n4. Over-the-counter pain relievers can help if appropriate.\n\n*If the headache is sudden and extremely severe, seek emergency medical care immediately.*";
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: '#111827', color: 'white', padding: '1.5rem 2rem', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
          <i className="fas fa-robot"></i>
        </div>
        <div>
          <h2 style={{ margin: 0 }}>SwiftAid Medical AI</h2>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.9rem' }}>Online &bull; Replies instantly</p>
        </div>
      </div>
      <div style={{ background: '#F9FAFB', padding: '2rem', height: '500px', overflowY: 'auto', borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? '#E63946' : 'white',
            color: msg.role === 'user' ? 'white' : 'inherit',
            padding: '1rem 1.5rem',
            borderRadius: msg.role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
            border: msg.role === 'user' ? 'none' : '1px solid #E5E7EB',
            maxWidth: '80%',
            boxShadow: msg.role === 'user' ? '0 2px 10px rgba(230,57,70,0.2)' : '0 2px 10px rgba(0,0,0,0.02)',
            whiteSpace: 'pre-wrap'
          }}>
            <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', background: 'white', padding: '1rem 1.5rem', borderRadius: '20px 20px 20px 0', border: '1px solid #E5E7EB', maxWidth: '80%', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#6B7280' }}>Typing...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0 0 20px 20px', border: '1px solid #E5E7EB', display: 'flex', gap: '1rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your symptoms..." 
          style={{ flex: 1, padding: '1rem', borderRadius: '50px', border: '1px solid #E5E7EB', outline: 'none', fontSize: '1rem' }} 
        />
        <button onClick={handleSend} style={{ background: '#E63946', color: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="fas fa-paper-plane" style={{ marginLeft: '-3px' }}></i>
        </button>
      </div>
    </div>
  );
};

/* --- FEATURE 2: PRESCRIPTION ANALYZER --- */
const PrescriptionAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, processing, complete
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const fileInputRef = useRef(null);

  const simulateProcessing = () => {
    setStatus('processing');
    setProgress(0);
    setProgressText('Uploading document...');
    
    setTimeout(() => { setProgress(25); setProgressText('Running OCR digitization...'); }, 1000);
    setTimeout(() => { setProgress(55); setProgressText('Extracting medication names and dosages...'); }, 2500);
    setTimeout(() => { setProgress(80); setProgressText('Cross-referencing drug interactions...'); }, 4000);
    setTimeout(() => { setProgress(100); setProgressText('Generating final report...'); }, 5500);
    setTimeout(() => { setStatus('complete'); }, 6000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      simulateProcessing();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      simulateProcessing();
    }
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Intelligent Prescription Analysis</h2>
        <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>Upload a photo of your handwritten or printed prescription. Our AI will digitize it, detail the medication usages, and flag potential drug interactions.</p>
      </div>
      
      {status === 'idle' && (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          style={{ background: 'white', border: '2px dashed #94A3B8', borderRadius: '20px', padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#2563EB'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#94A3B8'}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,image/*" style={{ display: 'none' }} />
          <div style={{ width: '80px', height: '80px', background: '#DBEAFE', color: '#2563EB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem' }}>
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Drag & Drop Prescription</h3>
          <p style={{ color: '#64748B', marginBottom: '2rem' }}>or click to browse from your device (JPG, PNG, PDF)</p>
          <button style={{ background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', padding: '0.8rem 2.5rem', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>Select File</button>
        </div>
      )}

      {status === 'processing' && (
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
           <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #DBEAFE', borderTopColor: '#2563EB', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }}></div>
           <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1E293B' }}>{progressText}</h3>
           <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', background: '#F1F5F9', borderRadius: '10px', overflow: 'hidden', height: '10px' }}>
              <div style={{ width: `${progress}%`, background: '#2563EB', height: '100%', transition: 'width 0.5s ease-out' }}></div>
           </div>
           <p style={{ marginTop: '1rem', color: '#64748B', fontWeight: 'bold' }}>{progress}%</p>
        </div>
      )}

      {status === 'complete' && (
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#10B981', color: 'white', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fas fa-check-circle"></i> Analysis Complete</h3>
             <button onClick={reset} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Scan Another</button>
          </div>
          <div style={{ padding: '2rem' }}>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: '1 1 300px' }}>
                   <h4 style={{ color: '#64748B', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1rem' }}>Extracted Medications</h4>
                   
                   <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' }}>
                     <strong style={{ fontSize: '1.2rem', color: '#1E293B', display: 'block', marginBottom: '0.5rem' }}>Amoxicillin 500mg</strong>
                     <p style={{ margin: '0 0 0.5rem 0', color: '#475569' }}><i className="fas fa-pills" style={{ width: '20px', color: '#64748B' }}></i> 1 Capsule, 3 times a day</p>
                     <p style={{ margin: 0, color: '#475569' }}><i className="fas fa-clock" style={{ width: '20px', color: '#64748B' }}></i> After meals</p>
                   </div>
                   
                   <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.5rem' }}>
                     <strong style={{ fontSize: '1.2rem', color: '#1E293B', display: 'block', marginBottom: '0.5rem' }}>Ibuprofen 400mg</strong>
                     <p style={{ margin: '0 0 0.5rem 0', color: '#475569' }}><i className="fas fa-pills" style={{ width: '20px', color: '#64748B' }}></i> 1 Tablet, as needed for pain</p>
                     <p style={{ margin: 0, color: '#475569' }}><i className="fas fa-exclamation-triangle" style={{ width: '20px', color: '#F59E0B' }}></i> Do not exceed 3 in 24 hours</p>
                   </div>
                </div>
                
                <div style={{ flex: '1 1 300px' }}>
                   <h4 style={{ color: '#64748B', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1rem' }}>AI Insights & Warnings</h4>
                   <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F59E0B', padding: '1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '1.5rem' }}>
                     <h5 style={{ margin: '0 0 0.5rem 0', color: '#B45309', fontSize: '1.1rem' }}>Dietary Warning</h5>
                     <p style={{ margin: 0, color: '#92400E', fontSize: '0.95rem' }}>Take Amoxicillin with food or milk to avoid stomach upset. Avoid spacing it too closely with antacids.</p>
                   </div>
                   <div style={{ background: '#EFF6FF', borderLeft: '4px solid #3B82F6', padding: '1.5rem', borderRadius: '0 12px 12px 0' }}>
                     <h5 style={{ margin: '0 0 0.5rem 0', color: '#1D4ED8', fontSize: '1.1rem' }}>Duration Note</h5>
                     <p style={{ margin: 0, color: '#1E40AF', fontSize: '0.95rem' }}>Complete the entire course of Amoxicillin even if you feel better. Do not stop early.</p>
                   </div>
                   
                   <button style={{ width: '100%', marginTop: '2rem', background: '#1E293B', color: 'white', padding: '1rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-download"></i> Download Rx Summary
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- FEATURE 3: FIND PHARMACY --- */
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15, { animate: true });
  }, [center, map]);
  return null;
};

const FindPharmacy = () => {
  const pharmacies = [
    { name: 'Apollo Pharmacy', time: 'Open 24/7', dist: '0.8 km', color: '#10B981', lat: 28.6139, lng: 77.2090 },
    { name: 'MedPlus ER', time: 'Closes at 11 PM', dist: '1.2 km', color: '#F59E0B', lat: 28.6200, lng: 77.2150 },
    { name: 'City Wellness Center', time: 'Open 24/7', dist: '2.5 km', color: '#10B981', lat: 28.6250, lng: 77.2000 }
  ];

  const [activePharmacy, setActivePharmacy] = useState(pharmacies[0]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', height: '600px', background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
      <div style={{ background: '#F8FAFC', padding: '2rem', overflowY: 'auto' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fas fa-search" style={{ color: '#10B981' }}></i> Nearby Pharmacies</h3>
        
        {pharmacies.map((p, i) => (
          <div key={i} onClick={() => setActivePharmacy(p)} style={{ background: activePharmacy.name === p.name ? '#EFF6FF' : 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem', border: activePharmacy.name === p.name ? '2px solid #3B82F6' : '1px solid #E5E7EB', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: activePharmacy.name === p.name ? '#1D4ED8' : 'inherit' }}>{p.name}</h4>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#6B7280' }}><i className="fas fa-map-marker-alt"></i> {p.dist} away</p>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: p.color }}>{p.time}</span>
            <i className="fas fa-chevron-right" style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: activePharmacy.name === p.name ? '#3B82F6' : '#D1D5DB' }}></i>
          </div>
        ))}
      </div>
      <div style={{ background: '#E2E8F0', position: 'relative', zIndex: 1 }}>
        <MapContainer center={[activePharmacy.lat, activePharmacy.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={[activePharmacy.lat, activePharmacy.lng]} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {pharmacies.map((p, idx) => (
            <Marker key={idx} position={[p.lat, p.lng]}>
              <Popup>
                <strong>{p.name}</strong><br />
                {p.dist} away - <span style={{ color: p.color }}>{p.time}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

/* --- FEATURE 4: BLOOD DONATION --- */
const BloodDonation = () => (
  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2.5rem', color: '#E63946', marginBottom: '1rem' }}><i className="fas fa-hand-holding-water"></i> Blood Network</h2>
      <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>Every 2 seconds someone needs blood. Connect directly with donors or recipients nearby.</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {/* Request Form */}
      <div style={{ background: 'white', padding: '3rem 2rem', border: '1px solid #FCA5A5', borderRadius: '20px', boxShadow: '0 10px 30px rgba(220,38,38,0.05)' }}>
        <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #FEE2E2', paddingBottom: '1rem', marginBottom: '2rem' }}>Request Blood</h3>
        <label style={{ display:'block', marginBottom:'0.5rem', fontWeight:'500' }}>Blood Group Needed</label>
        <select style={{ width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid #E5E7EB', marginBottom:'1.5rem' }}>
          <option>O Negative (O-)</option>
          <option>O Positive (O+)</option>
          <option>A Negative (A-)</option>
          <option>A Positive (A+)</option>
          <option>B Negative (B-)</option>
          <option>B Positive (B+)</option>
          <option>AB Negative (AB-)</option>
          <option>AB Positive (AB+)</option>
        </select>
        <label style={{ display:'block', marginBottom:'0.5rem', fontWeight:'500' }}>Urgency Level</label>
        <select style={{ width:'100%', padding:'1rem', borderRadius:'8px', border:'1px solid #E5E7EB', marginBottom:'2rem' }}>
          <option>Critical (Within 2 Hours)</option>
          <option>High (Within 12 Hours)</option>
          <option>Standard (Within 24 Hours)</option>
        </select>
        <button style={{ width:'100%', background:'#E63946', color:'white', border:'none', padding:'1rem', borderRadius:'8px', fontWeight:'bold', fontSize:'1.1rem', cursor:'pointer' }}>Broadcast Request</button>
      </div>

      {/* Donor List */}
      <div style={{ background: '#F8FAFC', padding: '3rem 2rem', border: '1px solid #E5E7EB', borderRadius: '20px' }}>
         <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #E5E7EB', paddingBottom: '1rem', marginBottom: '2rem' }}>Local Verified Donors</h3>
         {[
           { name: 'John D.', group: 'O-', verified: true },
           { name: 'Sarah W.', group: 'AB+', verified: true },
           { name: 'Michael T.', group: 'B-', verified: true }
         ].map((d, i) => (
           <div key={i} style={{ background:'white', padding:'1rem', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem', border:'1px solid #E5E7EB' }}>
              <div>
                <strong style={{ display:'block', marginBottom:'0.25rem' }}>{d.name} {d.verified && <i className="fas fa-check-circle" style={{ color:'#10B981', fontSize:'0.8rem' }}></i>}</strong>
                <span style={{ background:'#FEE2E2', color:'#DC2626', padding:'0.2rem 0.5rem', borderRadius:'4px', fontSize:'0.8rem', fontWeight:'bold' }}>{d.group}</span>
              </div>
              <button style={{ background:'white', border:'1px solid #DC2626', color:'#DC2626', padding:'0.5rem 1rem', borderRadius:'50px', cursor:'pointer' }}>Contact</button>
           </div>
         ))}
      </div>
    </div>
  </div>
);

/* --- FEATURE 5: MEDICAL HISTORY --- */
const MedicalHistory = () => (
  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Patient Records</h2>
        <p style={{ color: '#6B7280', margin: 0 }}>ID: #883-911-209 &bull; Last updated: Today</p>
      </div>
      <button style={{ background: '#111827', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <i className="fas fa-download"></i> Export PDF
      </button>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <div style={{ background: '#FEF2F2', padding: '2rem', borderRadius: '16px', border: '1px solid #FCA5A5' }}>
        <h3 style={{ color: '#991B1B', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="fas fa-exclamation-triangle"></i> Critical Alerts</h3>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#991B1B', lineHeight: '1.8' }}>
          <li><strong>Allergy:</strong> Penicillin (Severe)</li>
          <li><strong>Blood Type:</strong> O-</li>
          <li><strong>Condition:</strong> Asthma</li>
        </ul>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
        <div style={{ borderLeft: '2px solid #E5E7EB', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <span style={{ position: 'absolute', left: '-1.95rem', top: '0', background: '#3B82F6', width: '15px', height: '15px', borderRadius: '50%', border: '3px solid white' }}></span>
            <strong style={{ display: 'block' }}>Complete Blood Count (CBC)</strong>
            <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>March 29, 2026 &bull; City Central Labs</span>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>All parameters normal. Iron levels slightly improved.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '-1.95rem', top: '0', background: '#D1D5DB', width: '15px', height: '15px', borderRadius: '50%', border: '3px solid white' }}></span>
            <strong style={{ display: 'block' }}>Emergency Consultation</strong>
            <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>February 14, 2026 &bull; Metro Hospital ER</span>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Treated for mild asthma exacerbation. Prescribed Albuterol inhaler.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default function FeatureDetail() {
  const { id } = useParams();

  const renderFeatureContent = () => {
    switch(id) {
      case '1': return <AIChatBot />;
      case '2': return <PrescriptionAnalyzer />;
      case '3': return <FindPharmacy />;
      case '4': return <BloodDonation />;
      case '5': return <MedicalHistory />;
      default: return (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Under Construction</h2>
          <p>This module is currently being developed for our next release.</p>
        </div>
      );
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#F3F4F6' }}>
      
      {/* Universal Page Header Header */}
      <header className="page-banner" style={{ padding: '80px 0 60px', backgroundImage: "url('https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="container page-banner-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Feature Modules</h1>
          <Link to="/dashboard" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Dynamic Content */}
      <div className="container" style={{ padding: '4rem 2rem' }}>
        {renderFeatureContent()}
      </div>

    </div>
  );
}
