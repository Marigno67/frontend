import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PersonnageDetailsPage() {
  const { id } = useParams();
  const [personnage, setPersonnage] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/personnages/${id}`)
      .then(response => response.json())
      .then(data => setPersonnage(data))
      .catch(error => console.error('Erreur:', error));
  }, [id]);

  if (!personnage) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <a href="/">Retour à la liste</a>
      <h2>{personnage.nom}</h2>
      {personnage.image && (
        <img src={`http://127.0.0.1:8000/uploads/images/${personnage.image}`} alt={personnage.nom} />
      )}
      <div dangerouslySetInnerHTML={{ __html: personnage.description }}></div>
      
      <h3>Builds</h3>
      {personnage.builds.length > 0 ? (
        <ul>
          {personnage.builds.map(build => (
            <li key={build.id}>
              <h4>{build.titre}</h4>
              <p>Mode de jeu: {build.modeDeJeu.nom}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun build disponible pour ce personnage.</p>
      )}
    </div>
  );
}

export default PersonnageDetailsPage;