import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PersonnageDetailsPage.css';
import Sidebar from './Sidebar';

const PersonnageDetailsPage = () => {
    const { id } = useParams();
    const [personnage, setPersonnage] = useState(null);
    const [ongletActif, setOngletActif] = useState('Builds');
    const [buildsAffiches, setBuildsAffiches] = useState(false);
    const [buildSelectionne, setBuildSelectionne] = useState(null);

    useEffect(() => {
        const fetchPersonnage = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/personnages/${id}`);
                const data = response.data;
                setPersonnage(data);
                if (data.builds && data.builds.length > 0) {
                    setBuildsAffiches(true);
                    setBuildSelectionne(data.builds[0]);
                }
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

    const equipementsParEmplacement = buildSelectionne ? buildSelectionne.equipements.reduce((acc, equipement) => {
        const emplacement = equipement.emplacement;
        if (!acc[emplacement]) {
            acc[emplacement] = [];
        }
        acc[emplacement].push(equipement);
        return acc;
    }, {}) : {};

    const handleOngletClick = (onglet) => {
        setOngletActif(onglet);
        if (onglet === 'Builds' && personnage.builds && personnage.builds.length > 0) {
            setBuildsAffiches(true);
            setBuildSelectionne(personnage.builds[0]);
        } else {
            setBuildsAffiches(false);
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
                <button onClick={() => handleOngletClick('Builds')} className={ongletActif === 'Builds' ? 'active' : ''}>
                    Builds
                </button>
            </div>

            {ongletActif === 'Builds' && personnage.builds && personnage.builds.length > 0 && (
                <div className="builds-container">
                    <div className="build-sidebar">
                        <div className="build-sidebar-title">
                            <h3>Équipements du build</h3>
                        </div>
                        {personnage.builds.map(build => (
                            <button
                                key={build.id}
                                onClick={() => setBuildSelectionne(build)}
                                className={buildSelectionne && buildSelectionne.id === build.id ? 'active' : ''}
                            >
                                {build.modeDeJeu.nom}
                            </button>
                        ))}
                    </div>
                    {buildSelectionne ? (
                        <div className="build-details-container">
                            <div className="build-details-header">
                                <h2>{buildSelectionne.titre}</h2>
                                <h4>Mode de jeu: {buildSelectionne.modeDeJeu.nom}</h4>
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
                                                            {equipement.image && <img src={`http://127.0.0.1:8000/uploads/images/${equipement.image}`} alt={equipement.nom} />}
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
                        <p>Sélectionnez un build pour voir les détails.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PersonnageDetailsPage;