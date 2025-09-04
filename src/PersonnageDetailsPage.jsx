import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function PersonnageDetailsPage() {
  const { id } = useParams();
  const [personnage, setPersonnage] = useState(null);
  const [ongletActif, setOngletActif] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/personnages/${id}`)
      .then(response => response.json())
      .then(data => {
        setPersonnage(data);
        if (data.builds.length > 0) {
          setOngletActif(data.builds[0].modeDeJeu.nom);
        }
      })
      .catch(error => console.error('Erreur:', error));
  }, [id]);

  if (!personnage) {
    return <div>Chargement...</div>;
  }
  
  const buildsParMode = personnage.builds.reduce((acc, build) => {
    const modeDeJeuNom = build.modeDeJeu.nom;
    if (!acc[modeDeJeuNom]) {
      acc[modeDeJeuNom] = [];
    }
    acc[modeDeJeuNom].push(build);
    return acc;
  }, {});

  return (
    <div className="homepage-container">
      <Sidebar personnages={null} />
      <div className="main-content">
        <Link to="/personnages">Retour à la liste</Link>
        <h2>{personnage.nom}</h2>
        {personnage.image && (
          <img src={`http://127.0.0.1:8000/uploads/images/${personnage.image}`} alt={personnage.nom} />
        )}
        <div dangerouslySetInnerHTML={{ __html: personnage.description }}></div>
        
        <h3>Builds</h3>
        <div className="onglets">
          {Object.keys(buildsParMode).map(modeNom => (
            <button
              key={modeNom}
              className={ongletActif === modeNom ? 'onglet-actif' : ''}
              onClick={() => setOngletActif(modeNom)}
            >
              {modeNom}
            </button>
          ))}
        </div>
        
        <div className="contenu-onglet">
          {ongletActif && buildsParMode[ongletActif] && (
            buildsParMode[ongletActif].map(build => (
              <div key={build.id} className="build-card">
                <h4>{build.titre}</h4>
                <h5>Équipements</h5>
                {build.equipements.length > 0 ? (
                  <ul>
                    {build.equipements.map(equipement => (
                      <li key={equipement.id}>{equipement.nom}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Aucun équipement défini.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonnageDetailsPage;