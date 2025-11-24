import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllPersonnagesPage.css';

function AllPersonnagesPage() {
    const [personnages, setPersonnages] = useState([]); // Liste complète originale
    const [personnagesFiltres, setPersonnagesFiltres] = useState([]); // Liste affichée
    const [elements, setElements] = useState([]); // Liste des éléments pour les filtres
    const [elementActif, setElementActif] = useState(null); // Filtre actif (null = tous)
    const [loading, setLoading] = useState(true);

    // Fonction de tri réutilisable
    const trierPersonnages = (liste) => {
        const sungJinwoo = liste.find(p => p.nom === "Sung Jinwoo");
        let autresPersonnages = liste.filter(p => p.nom !== "Sung Jinwoo");

        // Tri alphabétique simple
        autresPersonnages.sort((a, b) => a.nom.localeCompare(b.nom));

        // On retourne la liste avec Sung Jinwoo en premier s'il a été trouvé
        return sungJinwoo ? [sungJinwoo, ...autresPersonnages] : autresPersonnages;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [personnagesResponse, elementsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/api/personnages`),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/elements`)
                ]);

                const personnagesData = personnagesResponse.data;
                setPersonnages(personnagesData);
                // On applique le tri dès le chargement initial
                setPersonnagesFiltres(trierPersonnages(personnagesData));
                setElements(elementsResponse.data);

            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFiltre = (elementId) => {
        setElementActif(elementId);
        let listeFiltree;

        if (elementId === null) {
            listeFiltree = personnages; // Si on clique sur "Tous", on prend la liste complète
        } else {
            // On filtre la liste originale
            listeFiltree = personnages.filter(p => p.element && p.element.id === elementId);
        }

        // On applique le tri sur la liste filtrée avant de l'afficher
        setPersonnagesFiltres(trierPersonnages(listeFiltree));
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="all-personnages-page-container">
            <h1>Tous les personnages</h1>

            <div className="element-filters">
                <button 
                    onClick={() => handleFiltre(null)} 
                    className={`element-filter-btn ${elementActif === null ? 'active' : ''}`}
                >
                    Tous
                </button>
                {elements.map(element => (
                    <button 
                        key={element.id} 
                        onClick={() => handleFiltre(element.id)}
                        className={`element-filter-btn ${elementActif === element.id ? 'active' : ''}`}
                        title={element.nom}
                    >
                        <img src={`${process.env.REACT_APP_API_URL}/uploads/images/elements/${element.icone}`} alt={element.nom} />
                    </button>
                ))}
            </div>

            <main>
                {personnagesFiltres.length > 0 ? (
                    <ul className="personnage-grid">
                        {personnagesFiltres.map(personnage => (
                            <li key={personnage.id} className="personnage-card">
                                <Link to={`/personnage/${personnage.id}`} className="personnage-card-link">
                                    {personnage.image && (
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/uploads/images/${personnage.image}`}
                                            alt={personnage.nom}
                                        />
                                    )}
                                    <h3>{personnage.nom}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">Aucun personnage ne correspond à cet élément.</p>
                )}
            </main>
        </div>
    );
}

export default AllPersonnagesPage;