import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ModesDeJeuPage.css';

function ModesDeJeuPage() {
  const [modesDeJeu, setModesDeJeu] = useState([]);
  const [modeSelectionne, setModeSelectionne] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/modes-de-jeu`)
      .then(response => response.json())
      .then(data => {
        setModesDeJeu(data);
        if (data.length > 0) {
          setModeSelectionne(data[0].id); // Sélectionne le premier mode par défaut
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des modes de jeu:', error));
  }, []);

  const handleSelection = (e) => {
    setModeSelectionne(parseInt(e.target.value));
  };

  const modeActif = modesDeJeu.find(mode => mode.id === modeSelectionne);

  return (
    <div className="main-content">
      <h1>Modes de jeu</h1>
      <Link to="/">Retour à l'accueil</Link>
      <main>
        {modesDeJeu.length > 0 ? (
          <div className="modes-dropdown-container">
            <label htmlFor="modes-select">Sélectionner un mode de jeu :</label>
            <select id="modes-select" value={modeSelectionne || ''} onChange={handleSelection}>
              {modesDeJeu.map(mode => (
                <option key={mode.id} value={mode.id}>
                  {mode.nom}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Aucun mode de jeu trouvé.</p>
        )}
      </main>
      
      {modeActif && (
        <div className="mode-details-card">
          <h2>{modeActif.nom}</h2>
          <p>Détails du mode...</p>
        </div>
      )}
    </div>
  );
}

export default ModesDeJeuPage;