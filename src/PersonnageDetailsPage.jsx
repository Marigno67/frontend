import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PersonnageDetailsPage.css';

const PersonnageDetailsPage = () => {
    const { id } = useParams();
    const [personnage, setPersonnage] = useState(null);
    
    // MODIFIÉ : Renommage des variables et de l'onglet actif par défaut
    const [ongletActif, setOngletActif] = useState('Artefacts');
    const [artefactsAffiches, setArtefactsAffiches] = useState(false);
    const [artefactSelectionne, setArtefactSelectionne] = useState(null);

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

    if (!personnage) {
        return <div className="loading">Chargement...</div>;
    }

    const emplacementsGauche = ["Tête", "Torse", "Mains", "Pieds"];
    const emplacementsDroite = ["Cou", "Poignet", "Doigt", "Oreille"];

    // MODIFIÉ : Utilisation de la nouvelle variable 'artefactSelectionne'
    const equipementsParEmplacement = artefactSelectionne ? artefactSelectionne.equipements.reduce((acc, equipement) => {
        const emplacement = equipement.emplacement;
        if (!acc[emplacement]) {
            acc[emplacement] = [];
        }
        acc[emplacement].push(equipement);
        return acc;
    }, {}) : {};

    const handleOngletClick = (onglet) => {
        setOngletActif(onglet);
        
        // MODIFIÉ : Logique adaptée pour 'Artefacts'
        if (onglet === 'Artefacts') {
            if (artefactsAffiches) {
                setArtefactsAffiches(false);
            } else if (personnage.builds && personnage.builds.length > 0) {
                setArtefactsAffiches(true);
                setArtefactSelectionne(personnage.builds[0]);
            }
        }
    };

    return (
        <div className="personnage-details-page">
            <div className="details-header">
                <img src={`${process.env.REACT_APP_API_URL}/uploads/images/${personnage.image}`} alt={personnage.nom} className="personnage-image" />
                <div className="details-info">
                    <h1>{personnage.nom}</h1>
                    <p>{personnage.description}</p>
                </div>
            </div>

            <div className="onglets-navigation">
                {/* MODIFIÉ : Texte du bouton et condition d'activation */}
                <button onClick={() => handleOngletClick('Artefacts')} className={ongletActif === 'Artefacts' ? 'active' : ''}>
                    Artefacts
                </button>
            </div>

            {/* MODIFIÉ : Condition d'affichage et boucle sur les données */}
            {artefactsAffiches && personnage.builds && personnage.builds.length > 0 && (
                <div className="builds-container">
                    <div className="build-sidebar">
                        <div className="build-sidebar-title">
                            {/* MODIFIÉ : Titre */}
                            <h3>Artefacts équipés</h3>
                        </div>
                        {/* Note : personnage.builds vient de l'API, mais on l'appelle 'artefact' dans notre code */}
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
                                {/* ... le reste du code pour afficher les équipements ne change pas ... */}
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
                         // MODIFIÉ : Message
                        <p>Sélectionnez un Artefact pour voir les détails.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PersonnageDetailsPage;