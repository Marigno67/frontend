// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Link a été supprimé car plus utilisé ici
import HomePage from './HomePage';
import AllPersonnagesPage from './AllPersonnagesPage';
import PersonnageDetailsPage from './PersonnageDetailsPage';
import ModesDeJeuPage from './ModesDeJeuPage';
import ModeDeJeuDetailsPage from './ModeDeJeuDetailsPage';
import './App.css';
import backgroundImage from './background.jpg';
// L'import de homeIcon est supprimé car il est maintenant dans la Sidebar
import Sidebar from './Sidebar'; // <-- AJOUTER L'IMPORT DE LA SIDEBAR

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
        {/* NOUVELLE STRUCTURE DE MISE EN PAGE */}
        <div className="app-container">
          <Sidebar /> {/* La Sidebar est maintenant ici, en permanence */}
          <main className="main-content"> {/* Le contenu de la page prend le reste de la place */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/personnages" element={<AllPersonnagesPage />} />
              <Route path="/personnage/:id" element={<PersonnageDetailsPage />} />
              <Route path="/modes-de-jeu" element={<ModesDeJeuPage />} />
              <Route path="/modes-de-jeu/:id" element={<ModeDeJeuDetailsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;