import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './PersonnageDetailsPage.css';

function PersonnageDetailsPage() {
    const { id } = useParams();
    const [personnage, setPersonnage] = useState(null);
    const [buildsAffiches, setBuildsAffiches] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/personnages/${id}`)
            .then(response => response.json())
            .then(data => {
                setPersonnage(data);
            })
            .catch(error => console.error('Erreur:', error));
    }, [id]);

    if (!personnage) {
        return <div>Chargement...</div>;
    }

    const basculerBuilds = () => {
        setBuildsAffiches(!buildsAffiches);
    };

    return (
        <div className="homepage-container">
            <Sidebar personnages={null} />
            <div className="main-content personnage-details-container">
                <Link to="/personnages">Retour à la liste</Link>
                <h2>{personnage.nom}</h2>
                {personnage.image && (
                    <img src={`http://127.0.0.1:8000/uploads/images/${personnage.image}`} alt={personnage.nom} />
                )}
                <div className="personnage-description" dangerouslySetInnerHTML={{ __html: personnage.description }}></div>

                <h3>Builds</h3>
                <button className="bouton-artefacts" onClick={basculerBuilds}>
                    Artefacts
                    <span className={`arrow ${buildsAffiches ? 'up' : 'down'}`}>▼</span>
                </button>

                {buildsAffiches && (
                    <div className="contenu-builds">
                        {personnage.builds && personnage.builds.length > 0 ? (
                            personnage.builds.map(build => (
                                <div key={build.id} className="build-card">
                                    <h4>{build.titre}</h4>
                                    <h5>Mode de jeu : {build.modeDeJeu.nom}</h5>
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
                            ))
                        ) : (
                            <p>Aucun build associé à ce personnage.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PersonnageDetailsPage;