import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllPersonnagesPage() {
  const [personnages, setPersonnages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/personnages')
      .then(response => response.json())
      .then(data => {
        // Logique de tri pour mettre Sung Jinwoo en premier
        const sungJinwoo = data.find(p => p.nom === "Sung Jinwoo");
        const autresPersonnages = data.filter(p => p.nom !== "Sung Jinwoo");
        
        autresPersonnages.sort((a, b) => {
          if (a.nom < b.nom) {
            return -1;
          }
          if (a.nom > b.nom) {
            return 1;
          }
          return 0;
        });

        // Fusion des deux listes pour avoir Sung Jinwoo en premier
        if (sungJinwoo) {
          setPersonnages([sungJinwoo, ...autresPersonnages]);
        } else {
          setPersonnages(autresPersonnages);
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des personnages:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="main-content">
      <h1>Tous les personnages</h1>
      <main>
        {personnages.length > 0 ? (
          <ul className="personnage-grid">
            {personnages.map(personnage => (
              <li key={personnage.id} className="personnage-card">
                <Link to={`/personnage/${personnage.id}`} className="personnage-card-link">
                  {personnage.image && (
                    <img
                      src={`http://127.0.0.1:8000/uploads/images/${personnage.image}`}
                      alt={personnage.nom}
                    />
                  )}
                  <h3>{personnage.nom}</h3>
                </Link>
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

export default AllPersonnagesPage;