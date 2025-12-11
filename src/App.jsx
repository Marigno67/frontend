// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AllPersonnagesPage from './AllPersonnagesPage';
import PersonnageDetailsPage from './PersonnageDetailsPage';
import ModesDeJeuPage from './ModesDeJeuPage';
import ModeDeJeuDetailsPage from './ModeDeJeuDetailsPage';
import './App.css';
import backgroundImage from './background.jpg';
import Sidebar from './Sidebar';
import ArtefactsPage from './ArtefactsPage';
import OmbresPage from './OmbresPage';
import ArmesPage from './ArmesPage';
import NoyauxPage from './NoyauxPage';

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
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/personnages" element={<AllPersonnagesPage />} />
              <Route path="/personnage/:id" element={<PersonnageDetailsPage />} />
              <Route path="/armes" element={<ArmesPage />} />
              <Route path="/modes-de-jeu" element={<ModesDeJeuPage />} />
              <Route path="/modes-de-jeu/:id" element={<ModeDeJeuDetailsPage />} />
              <Route path="/artefacts" element={<ArtefactsPage />} />
              <Route path="/noyaux" element={<NoyauxPage />} />
              <Route path="/ombres" element={<OmbresPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;