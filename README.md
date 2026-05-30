# SwiftAid – Full-Stack Emergency Response Platform

SwiftAid is a professional Full-Stack Application designed to eliminate preventable delays in emergency medical response through intuitive technology. It utilizes React (Vite) for the frontend and Node.js (Express) for the backend.

## Features & Modules

- **Dynamic Dispatch Dashboard (`/dashboard`)**: A professional Command Center layout utilizing interactive OpenStreetMap (via React Leaflet). All actionable tools are housed in a sleek Glassmorphism Sidebar, leaving 100% of the screen dedicated to a high-resolution, interactive hospital map with custom live markers.
- **Dedicated Ambulance Tracker (`/track`)**: Dual-pane live tracking featuring Paramdic & Vehicle ID details, a live dropping ETA countdown timer, and a targeted map showing active route lines between the patient and ambulance coordinates.
- **Emergency SOS Protocol (`/sos`)**: Active countdown sequence immediately routing dispatch alerts to the nearest Trauma Center.
- **5 Custom React Feature Modules (`/features/:id`)**:
  1. **AI Chat Bot**: Live medical assistance bubble interface
  2. **Prescription Scanner**: Drag & drop Rx upload terminal
  3. **Find Pharmacy**: Locator list view synced with local data
  4. **Blood Network**: Dynamic Request/Donate Blood dispatch forms
  5. **Medical History**: Secure Patient Records dashboard with PDF export bounds

## Tech Stack
- Frontend: React 18, Vite, React Router DOM, Vanilla CSS Flex/Grid
- Mapping: Leaflet, React Leaflet (Raw instantiation for React 18 stability)
- Backend: Node.js, Express (API endpoints proxying to frontend)

## How to Run Locally

You must run the Backend and Frontend servers concurrently in two separate terminal windows.

### 1. Run the Backend API
```bash
cd backend
npm install
npm start
```
*(Runs on port 5000)*

### 2. Run the Frontend React UI
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on port 5173)*

Open your browser and navigate to `http://localhost:5173`. Click "Explore Features" or "Activate Emergency Mode" to test the dynamic navigation!
