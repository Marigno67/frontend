import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArmesPage.css';

function ArmesPage() {
    const [armes, setArmes] = useState([]);
    const [armesFiltrees, setArmesFiltrees] = useState([]);
    const [elements, setElements] = useState([]);
    const [elementActif, setElementActif] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [armesResponse, elementsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/api/armes`),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/elements`)
                ]);

                const armesData = armesResponse.data;
                setArmes(armesData);
                setArmesFiltrees(armesData);
                setElements(elementsResponse.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const appliquerFiltre = (elementId) => {
        let listeFiltree = armes;

        if (elementId !== null) {
            listeFiltree = listeFiltree.filter(a => a.element && a.element.id === elementId);
        }

        setArmesFiltrees(listeFiltree);
    };

    const handleFiltreElement = (elementId) => {
        setElementActif(elementId);
        appliquerFiltre(elementId);
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="armes-page-container">
            <h1>Les Armes de Sung</h1>

            <div className="filters-container">
                <div className="filter-section">
                    <h3>Filtrer par élément</h3>
                    <div className="element-filters">
                        <button
                            onClick={() => handleFiltreElement(null)}
                            className={`element-filter-btn ${elementActif === null ? 'active' : ''}`}
                        >
                            Tous
                        </button>
                        {elements.map(element => (
                            <button
                                key={element.id}
                                onClick={() => handleFiltreElement(element.id)}
                                className={`element-filter-btn ${elementActif === element.id ? 'active' : ''}`}
                                title={element.nom}
                            >
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/images/elements/${element.icone}`} alt={element.nom} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main>
                {armesFiltrees.length > 0 ? (
                    <ul className="armes-grid">
                        {armesFiltrees.map(arme => (
                            <li key={arme.id} className="arme-card">
                                {arme.image && (
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/uploads/images/armes/${arme.image}`}
                                        alt={arme.nom}
                                    />
                                )}
                                <h3>{arme.nom}</h3>
                                {arme.element && (
                                    <div className="arme-element">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/uploads/images/elements/${arme.element.icone}`}
                                            alt={arme.element.nom}
                                            title={arme.element.nom}
                                        />
                                        <span>{arme.element.nom}</span>
                                    </div>
                                )}
                                {arme.description && (
                                    <div
                                        className="arme-description"
                                        dangerouslySetInnerHTML={{ __html: arme.description }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">Aucune arme ne correspond au filtre sélectionné.</p>
                )}
            </main>
        </div>
    );
}

export default ArmesPage;
