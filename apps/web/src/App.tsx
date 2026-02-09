/**
 * App Component
 * 
 * Main application with routing.
 * Free version - no pricing page.
 */

import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { EditorPage } from './pages/EditorPage';
import { Navbar } from './components/Navbar';

function App() {
    return (
        <div className="min-h-screen bg-graphite-900 text-white">
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/editor" element={<EditorPage />} />
            </Routes>
        </div>
    );
}

export default App;
