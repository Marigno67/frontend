import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoyauxPage.css';

function NoyauxPage() {
  const [ensembles, setEnsembles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/noyaux`)
      .then(response => {
        setEnsembles(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des noyaux:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="noyaux-page-container">
      <h1>Noyaux</h1>

      <div className="noyaux-introduction">
        <p className="noyaux-conseil">
          Le principal quand vous n'avez pas beaucoup de choix, c'est de privilégier les stats avant l'élément
          et une fois que cela est possible, de faire stats + l'élément.
        </p>
      </div>

      <main>
        {ensembles.length > 0 ? (
          ensembles.map(ensemble => (
            <div key={ensemble.id} className="ensemble-section">
              <h2 className="ensemble-titre">{ensemble.nom}</h2>

              {ensemble.noyaux && ensemble.noyaux.length > 0 ? (
                <div className="noyaux-grid">
                  {ensemble.noyaux.map(noyau => (
                    <div key={noyau.id} className="noyau-card">
                      {noyau.image && (
                        <div className="noyau-image-container">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/uploads/images/noyaux/${noyau.image}`}
                            alt={noyau.nom}
                            className="noyau-image"
                          />
                        </div>
                      )}
                      <h3 className="noyau-nom">{noyau.nom}</h3>
                      {noyau.description && (
                        <div
                          className="noyau-description"
                          dangerouslySetInnerHTML={{ __html: noyau.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-noyaux">Aucun noyau dans cet ensemble.</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">Aucun ensemble de noyaux trouvé.</p>
        )}
      </main>
    </div>
  );
}

export default NoyauxPage;
