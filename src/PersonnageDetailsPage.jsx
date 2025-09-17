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
                                        (() => {
                                            const emplacementsGauche = ["Tête", "Torse", "Mains", "Pieds"];
                                            const emplacementsDroite = ["Cou", "Poignet", "Doigt", "Oreille"];

                                            const equipementsParEmplacement = build.equipements.reduce((acc, equipement) => {
                                                const emplacement = equipement.emplacement;
                                                if (!acc[emplacement]) {
                                                    acc[emplacement] = [];
                                                }
                                                acc[emplacement].push(equipement);
                                                return acc;
                                            }, {});

                                            return (
                                                <div className="equipements-groupes">
                                                    <div className="groupe-equipements-gauche">
                                                        {emplacementsGauche.map(emplacement => {
                                                            const equipementsDansEmplacement = equipementsParEmplacement[emplacement];
                                                            if (equipementsDansEmplacement && equipementsDansEmplacement.length > 0) {
                                                                return (
                                                                    <div key={emplacement}>
                                                                        <h4>{emplacement}</h4>
                                                                        <div className="liste-items-emplacement">
                                                                            {equipementsDansEmplacement.map(equipement => (
                                                                                <div key={equipement.id} className="equipement-item">
                                                                                    {equipement.image && (
                                                                                        <img
                                                                                            src={`http://127.0.0.1:8000/uploads/images/${equipement.image}`}
                                                                                            alt={equipement.nom}
                                                                                        />
                                                                                    )}
                                                                                    <div className="equipement-details">
                                                                                        <p><strong>{equipement.nom}</strong></p>
                                                                                        {equipement.description && <p>{equipement.description}</p>}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </div>

                                                    <div className="groupe-equipements-droite">
                                                        {emplacementsDroite.map(emplacement => {
                                                            const equipementsDansEmplacement = equipementsParEmplacement[emplacement];
                                                            if (equipementsDansEmplacement && equipementsDansEmplacement.length > 0) {
                                                                return (
                                                                    <div key={emplacement}>
                                                                        <h4>{emplacement}</h4>
                                                                        <div className="liste-items-emplacement">
                                                                            {equipementsDansEmplacement.map(equipement => (
                                                                                <div key={equipement.id} className="equipement-item">
                                                                                    {equipement.image && (
                                                                                        <img
                                                                                            src={`http://127.0.0.1:8000/uploads/images/${equipement.image}`}
                                                                                            alt={equipement.nom}
                                                                                        />
                                                                                    )}
                                                                                    <div className="equipement-details">
                                                                                        <p><strong>{equipement.nom}</strong></p>
                                                                                        {equipement.description && <p>{equipement.description}</p>}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })()
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