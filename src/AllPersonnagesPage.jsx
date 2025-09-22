import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllPersonnagesPage.css';

function AllPersonnagesPage() {
  const [personnages, setPersonnages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/personnages`)
      .then(response => response.json())
      .then(data => {
        // Logique de tri pour mettre Sung Jinwoo en premier
        const sungJinwoo = data.find(p => p.nom === "Sung Jinwoo");
        const autresPersonnages = data.filter(p => p.nom !== "Sung Jinwoo");
        
        // Tri alphabétique des autres personnages
        autresPersonnages.sort((a, b) => a.nom.localeCompare(b.nom));
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
      <div className="all-personnages-page-container">
        <h1>Tous les personnages</h1>
        <main>
          {personnages.length > 0 ? (
            <ul className="personnage-grid">
              {personnages.map(personnage => (
                <li key={personnage.id} className="personnage-card">
                  <Link to={`/personnage/${personnage.id}`} className="personnage-card-link">
                    {personnage.image && (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/images/${personnage.image}`}
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
    </div>
  );
}

export default AllPersonnagesPage;