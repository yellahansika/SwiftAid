import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header className="hero">
        <div className="container hero-content">
          <div className="hero-badge" style={{ background: 'rgba(17, 24, 39, 0.6)', border: '1px solid rgba(230, 57, 70, 0.6)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center' }}>
            <i className="fas fa-circle" style={{ fontSize: '8px', marginRight: '8px', color: '#E63946' }}></i>
            Emergency Response Platform
          </div>
          <h1>Swift<span style={{ color: '#E63946' }}>Aid</span> – <br />Emergency Made Easy</h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', marginBottom: '2.5rem' }}>Faster medical intervention. Better survival outcomes.</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/sos" className="btn btn-emergency">
              <i className="fas fa-bell" style={{ marginRight: '10px' }}></i> Activate Emergency Mode
            </Link>
            <Link to="/dashboard" className="btn btn-outline" style={{ color: 'white', borderColor: 'white', padding: '1.25rem 2.5rem', fontSize: '1.25rem', borderRadius: '50px' }}>
              Explore Features
            </Link>
          </div>
        </div>
      </header>


    </div>
  );
}

export default Home;
