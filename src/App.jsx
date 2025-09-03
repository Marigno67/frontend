import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PersonnageDetailsPage from './PersonnageDetailsPage';
import ModesDeJeuPage from './ModesDeJeuPage';
import './App.css';
import backgroundImage from './background.jpg';
import ModeDeJeuDetailsPage from './ModeDeJeuDetailsPage';

function App() {
  const appStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'multiply',
    minHeight: '100vh',
    color: '#f0f0f0',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  };

return (
        <Router>
            <div className="App" style={appStyle}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/personnage/:id" element={<PersonnageDetailsPage />} />
                    <Route path="/modes-de-jeu" element={<ModesDeJeuPage />} />
                    <Route path="/modes-de-jeu/:id" element={<ModeDeJeuDetailsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;