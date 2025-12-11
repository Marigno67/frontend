import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PersonnageDetailsPage.css';

const PersonnageDetailsPage = () => {
    const { id } = useParams();
    const [personnage, setPersonnage] = useState(null);
    const [ongletActif, setOngletActif] = useState(null);
    const [artefactsAffiches, setArtefactsAffiches] = useState(false);
    const [artefactSelectionne, setArtefactSelectionne] = useState(null);

    // Nouvel état pour la visibilité des statistiques
    const [statsAffiches, setStatsAffiches] = useState(false);
    const [noyauxAffiches, setNoyauxAffiches] = useState(false);
    const [alternativeIndex, setAlternativeIndex] = useState(0);

    useEffect(() => {
        const fetchPersonnage = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/personnages/${id}`);
                setPersonnage(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du personnage :', error);
            }
        };

        fetchPersonnage();
    }, [id]);

    // Logique pour gérer le clic sur les onglets
    const handleOngletClick = (onglet) => {
        // Si on clique sur l'onglet déjà actif, on le ferme
        if (onglet === ongletActif) {
            setOngletActif(null);
            setStatsAffiches(false);
            setArtefactsAffiches(false);
            setNoyauxAffiches(false);
            return;
        }

        setOngletActif(onglet);

        // Logique pour afficher/cacher les sections
        if (onglet === 'Statistiques') {
            setStatsAffiches(true);
            setArtefactsAffiches(false);
            setNoyauxAffiches(false);
        }

        if (onglet === 'Artefacts') {
            setArtefactsAffiches(true);
            if (personnage && personnage.builds && personnage.builds.length > 0) {
                setArtefactSelectionne(personnage.builds[0]);
            }
            setStatsAffiches(false);
            setNoyauxAffiches(false);
        }

        if (onglet === 'Noyaux') {
            setNoyauxAffiches(true);
            setStatsAffiches(false);
            setArtefactsAffiches(false);
        }
    };

    if (!personnage) {
        return <div className="loading">Chargement...</div>;
    }

    const emplacementsGauche = ["Tête", "Torse", "Mains", "Pieds"];
    const emplacementsDroite = ["Cou", "Poignet", "Doigt", "Oreille"];

    const equipementsParEmplacement = artefactSelectionne ? artefactSelectionne.equipements.reduce((acc, equipement) => {
        const emplacement = equipement.emplacement;
        if (!acc[emplacement]) {
            acc[emplacement] = [];
        }
        acc[emplacement].push(equipement);
        return acc;
    }, {}) : {};

    return (
        <div className="personnage-details-page">
            <div className="details-header">
                <img src={`${process.env.REACT_APP_API_URL}/uploads/images/${personnage.image}`} alt={personnage.nom} className="personnage-image" />
                <div className="details-info">
                    <h1>{personnage.nom}</h1>
                    <div dangerouslySetInnerHTML={{ __html: personnage.description }} />
                </div>
            </div>

            <div className="onglets-navigation">
                <button onClick={() => handleOngletClick('Statistiques')} className={ongletActif === 'Statistiques' ? 'active' : ''}>
                    Statistiques à viser
                </button>
                <button onClick={() => handleOngletClick('Artefacts')} className={ongletActif === 'Artefacts' ? 'active' : ''}>
                    Artefacts
                </button>
                <button onClick={() => handleOngletClick('Noyaux')} className={ongletActif === 'Noyaux' ? 'active' : ''}>
                    Noyaux
                </button>
            </div>

            {/* Affichage conditionnel pour les statistiques */}
            {statsAffiches && personnage.statistiques && personnage.statistiques.length > 0 && (
                <div className="stats-container">
                    <h2>Statistiques à viser</h2>
                    <div className="stats-grid">
                        {personnage.statistiques.map(stat => (
                            <div key={stat.id} className="stat-card">
                                <h4>{stat.nom}</h4>
                                <p>{stat.valeur}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Affichage conditionnel pour les artefacts */}
            {artefactsAffiches && personnage.builds && personnage.builds.length > 0 && (
                <div className="builds-container">
                    <div className="build-sidebar">
                        <div className="build-sidebar-title">
                            <h3>Artefacts équipés</h3>
                        </div>
                        {personnage.builds.map(artefact => (
                            <button
                                key={artefact.id}
                                onClick={() => setArtefactSelectionne(artefact)}
                                className={artefactSelectionne && artefactSelectionne.id === artefact.id ? 'active' : ''}
                            >
                                {artefact.modeDeJeu.nom}
                            </button>
                        ))}
                    </div>
                    {artefactSelectionne ? (
                        <div className="build-details-container">
                            <div className="build-details-header">
                                <h2>{artefactSelectionne.titre}</h2>
                                <h4>Mode de jeu: {artefactSelectionne.modeDeJeu.nom}</h4>
                            </div>
                            <div className="equipements-groupes">
                                <div className="groupe-equipements-gauche">
                                    {emplacementsGauche.map(emplacement => {
                                        const equipementsDansEmplacement = equipementsParEmplacement[emplacement] || [];
                                        return (
                                            <div key={emplacement} className="equipement-emplacement-card">
                                                <h4>{emplacement}</h4>
                                                {equipementsDansEmplacement.length > 0 ? (
                                                    equipementsDansEmplacement.map(equipement => (
                                                        <div key={equipement.id} className="equipement-item">
                                                            {equipement.image && <img src={`${process.env.REACT_APP_API_URL}/uploads/images/${equipement.image}`} alt={equipement.nom} />}
                                                            <div className="equipement-details">
                                                                <h5>{equipement.nom}</h5>
                                                                {equipement.description && <p dangerouslySetInnerHTML={{ __html: equipement.description }}></p>}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Aucun équipement défini.</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="groupe-equipements-droite">
                                    {emplacementsDroite.map(emplacement => {
                                        const equipementsDansEmplacement = equipementsParEmplacement[emplacement] || [];
                                        return (
                                            <div key={emplacement} className="equipement-emplacement-card">
                                                <h4>{emplacement}</h4>
                                                {equipementsDansEmplacement.length > 0 ? (
                                                    equipementsDansEmplacement.map(equipement => (
                                                        <div key={equipement.id} className="equipement-item">
                                                            {equipement.image && <img src={`${process.env.REACT_APP_API_URL}/uploads/images/${equipement.image}`} alt={equipement.nom} />}
                                                            <div className="equipement-details">
                                                                <h5>{equipement.nom}</h5>
                                                                {equipement.description && <p dangerouslySetInnerHTML={{ __html: equipement.description }}></p>}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Aucun équipement défini.</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Sélectionnez un Artefact pour voir les détails.</p>
                    )}
                </div>
            )}

            {/* Affichage conditionnel pour les noyaux */}
            {noyauxAffiches && personnage.personnageNoyaux && personnage.personnageNoyaux.length > 0 && (() => {
                const noyauxTries = personnage.personnageNoyaux.sort((a, b) => a.priorite - b.priorite);
                const meilleursChoix = noyauxTries.filter(n => n.priorite === 1);

                // Regrouper les alternatives par niveau de priorité
                const alternativesParNiveau = {};
                noyauxTries.filter(n => n.priorite > 1).forEach(noyau => {
                    if (!alternativesParNiveau[noyau.priorite]) {
                        alternativesParNiveau[noyau.priorite] = [];
                    }
                    alternativesParNiveau[noyau.priorite].push(noyau);
                });

                const niveauxAlternatifs = Object.keys(alternativesParNiveau).sort((a, b) => a - b);

                const handlePrevAlternative = () => {
                    setAlternativeIndex((prev) => (prev > 0 ? prev - 1 : niveauxAlternatifs.length - 1));
                };

                const handleNextAlternative = () => {
                    setAlternativeIndex((prev) => (prev < niveauxAlternatifs.length - 1 ? prev + 1 : 0));
                };

                const niveauActuel = niveauxAlternatifs[alternativeIndex];
                const alternativesAffichees = alternativesParNiveau[niveauActuel] || [];

                return (
                    <div className="noyaux-container">
                        <h2>Noyaux recommandés</h2>
                        <p className="noyaux-description">
                            Les noyaux sont des éléments qui permettent d'améliorer les statistiques de votre personnage.
                            Privilégiez les statistiques plutôt que l'élément lors du choix des noyaux.
                        </p>
                        <div className="noyaux-layout">
                            {/* Colonne gauche : TOUS les Meilleurs choix */}
                            <div className="noyau-meilleur-choix">
                                <span className="priorite-badge priorite-1">Meilleurs choix</span>
                                <div className="noyaux-grid">
                                    {meilleursChoix.map(noyau => (
                                        <div key={noyau.id} className="noyau-card">
                                            {noyau.noyau.image && (
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/uploads/images/noyaux/${noyau.noyau.image}`}
                                                    alt={noyau.noyau.nom}
                                                    className="noyau-image-medium"
                                                />
                                            )}
                                            <h4>{noyau.noyau.nom}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Colonne droite : Alternatives du même niveau avec carousel */}
                            {niveauxAlternatifs.length > 0 && (
                                <div className="noyau-alternatives">
                                    <button
                                        className="carousel-btn carousel-btn-left"
                                        onClick={handlePrevAlternative}
                                        disabled={niveauxAlternatifs.length <= 1}
                                    >
                                        ‹
                                    </button>
                                    <div className="alternative-content">
                                        <span className="priorite-badge priorite-2">
                                            Alternative {niveauActuel - 1}
                                        </span>
                                        <div className="noyaux-grid">
                                            {alternativesAffichees.map(noyau => (
                                                <div key={noyau.id} className="noyau-card">
                                                    {noyau.noyau.image && (
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}/uploads/images/noyaux/${noyau.noyau.image}`}
                                                            alt={noyau.noyau.nom}
                                                            className="noyau-image-medium"
                                                        />
                                                    )}
                                                    <h4>{noyau.noyau.nom}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        className="carousel-btn carousel-btn-right"
                                        onClick={handleNextAlternative}
                                        disabled={niveauxAlternatifs.length <= 1}
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}
        </div>
    );
};

export default PersonnageDetailsPage;