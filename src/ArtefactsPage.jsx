import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArtefactsPage.css';

function ArtefactsPage() {
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/sets-artefacts`);
                const data = response.data;

                // --- LOGIQUE DE TRI MODIFIÉE ---
                const sortedData = data.sort((a, b) => {
                    // 1. Tri primaire : par nombre de pièces maximum
                    const maxPiecesA = Math.max(...a.bonus.map(b => b.nombrePieces), 0);
                    const maxPiecesB = Math.max(...b.bonus.map(b => b.nombrePieces), 0);

                    if (maxPiecesA !== maxPiecesB) {
                        return maxPiecesA - maxPiecesB;
                    }

                    // 2. Tri secondaire : par sous-titre ('gauche' puis 'droite')
                    // (uniquement si le nombre de pièces est égal)
                    const getSubTitleValue = (sousTitre) => {
                        if (sousTitre && sousTitre.toLowerCase() === 'gauche') return 1;
                        if (sousTitre && sousTitre.toLowerCase() === 'droite') return 2;
                        return 3; // Pour les autres cas (null, autre texte)
                    };

                    const subTitleValueA = getSubTitleValue(a.sousTitre);
                    const subTitleValueB = getSubTitleValue(b.sousTitre);
                    
                    return subTitleValueA - subTitleValueB;
                });
                // --- FIN DE LA LOGIQUE DE TRI ---

                setSets(sortedData);

            } catch (error) {
                console.error("Erreur lors de la récupération des sets d'artefacts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSets();
    }, []);


    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="artefacts-page-container">
            <h1>Ensembles d'artefacts</h1>
            <div className="artefacts-grid">
                {sets.map(set => (
                    <div key={set.id} className="artefact-card">
                        <div className="set-image-gallery">
                            {set.images && set.images.map(image => (
                                <img
                                    key={image.id}
                                    src={`${process.env.REACT_APP_API_URL}/uploads/images/${image.path}`}
                                    alt={`${set.nom} - pièce d'équipement`}
                                    className="set-piece-image"
                                />
                            ))}
                        </div>
                        <h3>{set.nom}</h3>
                        {set.sousTitre && <span className="set-subtitle">{set.sousTitre}</span>}
                        <div className="bonuses-section">
                            {set.bonus
                                .sort((a, b) => a.nombrePieces - b.nombrePieces)
                                .map(bonus => (
                                <div key={bonus.id} className="bonus-item">
                                    <h4>{bonus.nombrePieces} Set Effect</h4>
                                    <div dangerouslySetInnerHTML={{ __html: bonus.description }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtefactsPage;