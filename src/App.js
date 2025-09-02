import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [personnages, setPersonnages] = useState([]);
  const [personnageOuvert, setPersonnageOuvert] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/personnages')
      .then(response => response.json())
      .then(data => setPersonnages(data))
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  const basculerDescription = (id) => {
    setPersonnageOuvert(personnageOuvert === id ? null : id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personnages</h1>
      </header>
      <main>
        {personnages.length > 0 ? (
          <ul>
            {personnages.map(personnage => (
              <li key={personnage.id}>
                <h2 onClick={() => basculerDescription(personnage.id)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {personnage.nom}
                  <span style={{ fontSize: '0.8em', marginLeft: '10px' }}>
                    {personnageOuvert === personnage.id ? '▲' : '▼'}
                  </span>
                </h2>
                {personnage.image && (
                  <img
                    src={`http://127.0.0.1:8000/uploads/images/${personnage.image}`}
                    alt={personnage.nom}
                  />
                )}
                {personnageOuvert === personnage.id && (
                  <div dangerouslySetInnerHTML={{ __html: personnage.description }}></div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun personnage trouvé.</p>
        )}
      </main>
    </div>
  );
}

export default App;