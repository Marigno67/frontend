import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ModeDeJeuDetailsPage() {
    const { id } = useParams();
    const [modeDeJeu, setModeDeJeu] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/modes-de-jeu/${id}`)
            .then(response => response.json())
            .then(data => setModeDeJeu(data))
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    if (!modeDeJeu) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>{modeDeJeu.nom}</h1>
            <Link to="/modes-de-jeu">Retour à la liste des modes de jeu</Link>
            
            <h3>Builds associés</h3>
            {modeDeJeu.builds && modeDeJeu.builds.length > 0 ? (
                <div className="builds-grid">
                    {modeDeJeu.builds.map(build => (
                        <div className="build-card" key={build.id}>
                            <h4>{build.titre}</h4>
                            <p>
                                Personnage : <Link to={`/personnage/${build.personnage.id}`}>{build.personnage.nom}</Link>
                            </p>
                            {build.personnage && build.personnage.image && (
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/images/${build.personnage.image}`}
                                    alt={build.personnage.nom}
                                    className="personnage-image-small"
                                />
                            )}
                            
                            <h5>Équipements</h5>
                            {build.equipements && build.equipements.length > 0 ? (
                                <ul>
                                    {build.equipements.map(equipement => (
                                        <li key={equipement.id}>{equipement.nom}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun équipement défini.</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun build associé à ce mode de jeu.</p>
            )}
        </div>
    );
}

export default ModeDeJeuDetailsPage;