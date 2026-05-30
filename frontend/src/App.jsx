import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TrackAmbulance from './pages/TrackAmbulance';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import FeatureDetail from './pages/FeatureDetail';
import EmergencySOS from './pages/EmergencySOS';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/track" element={<TrackAmbulance />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/:id" element={<FeatureDetail />} />
          <Route path="/sos" element={<EmergencySOS />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
