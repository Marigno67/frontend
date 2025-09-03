import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ModeDeJeuDetailsPage() {
    const { id } = useParams();
    const [modeDeJeu, setModeDeJeu] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/modes-de-jeu/${id}`)
            .then(response => response.json())
            .then(data => setModeDeJeu(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    if (!modeDeJeu) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="main-content">
            <h1>{modeDeJeu.nom}</h1>
            <Link to="/modes-de-jeu">Retour à la liste des modes de jeu</Link>
            
            <h3>Builds associés</h3>
            {modeDeJeu.builds.length > 0 ? (
                <ul>
                    {modeDeJeu.builds.map(build => (
                        <li key={build.id}>
                            <h4>{build.titre}</h4>
                            <p>Personnage : {build.personnage.nom}</p>
                            <Link to={`/personnage/${build.personnage.id}`}>Voir le personnage</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun build associé à ce mode de jeu.</p>
            )}
        </div>
    );
}

export default ModeDeJeuDetailsPage;