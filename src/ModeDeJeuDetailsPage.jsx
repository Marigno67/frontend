import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function ModeDeJeuDetailsPage() {
    const { id } = useParams();
    const [modeDeJeu, setModeDeJeu] = useState(null);
    const [personnages, setPersonnages] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/modes-de-jeu/${id}`)
            .then(response => response.json())
            .then(data => setModeDeJeu(data))
            .catch(error => console.error('Erreur:', error));

        fetch('http://127.0.0.1:8000/api/personnages')
            .then(response => response.json())
            .then(data => setPersonnages(data))
            .catch(error => console.error('Erreur lors de la récupération des personnages:', error));
    }, [id]);

    if (!modeDeJeu) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="homepage-container">
            <Sidebar personnages={personnages} />
            <div className="main-content">
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
                                        src={`http://127.0.0.1:8000/uploads/images/${build.personnage.image}`}
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
        </div>
    );
}

export default ModeDeJeuDetailsPage;