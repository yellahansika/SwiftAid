export default function Footer() {
  return (
    <footer style={{ background: 'white', padding: '3rem 2rem', borderTop: '1px solid #E5E7EB', textAlign: 'center', color: '#6B7280' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <h3 style={{ color: '#111827', margin: 0 }}>Swift<span style={{color: '#E63946'}}>Aid</span></h3>
        <p>Emergency Made Easy. Experience faster intervention directly from your pocket.</p>
        <p style={{ fontSize: '0.875rem' }}>&copy; 2026 SwiftAid. All rights reserved.</p>
      </div>
    </footer>
  );
}
