import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ModesDeJeuPage() {
  const [modesDeJeu, setModesDeJeu] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/modes-de-jeu')
      .then(response => response.json())
      .then(data => setModesDeJeu(data))
      .catch(error => console.error('Erreur lors de la récupération des modes de jeu:', error));
  }, []);

  return (
    <div className="main-content">
      <h1>Modes de jeu</h1>
      <Link to="/">Retour à l'accueil</Link>
      <main>
        {modesDeJeu.length > 0 ? (
          <ul>
            {modesDeJeu.map(mode => (
              <li key={mode.id}>
                {/* Modifiez cette ligne pour en faire un lien */}
                <Link to={`/modes-de-jeu/${mode.id}`}>
                  <h2>{mode.nom}</h2>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun mode de jeu trouvé.</p>
        )}
      </main>
    </div>
  );
}

export default ModesDeJeuPage;