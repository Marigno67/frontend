import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllPersonnagesPage.css';

function AllPersonnagesPage() {
    const [personnages, setPersonnages] = useState([]); // Liste complète originale
    const [personnagesFiltres, setPersonnagesFiltres] = useState([]); // Liste affichée
    const [elements, setElements] = useState([]); // Liste des éléments pour les filtres
    const [roles, setRoles] = useState([]); // Liste des rôles pour les filtres
    const [elementActif, setElementActif] = useState(null); // Filtre élément actif (null = tous)
    const [roleActif, setRoleActif] = useState(null); // Filtre rôle actif (null = tous)
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
                const [personnagesResponse, elementsResponse, rolesResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/api/personnages`),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/elements`),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/roles`)
                ]);

                const personnagesData = personnagesResponse.data;
                setPersonnages(personnagesData);
                // On applique le tri dès le chargement initial
                setPersonnagesFiltres(trierPersonnages(personnagesData));
                setElements(elementsResponse.data);
                setRoles(rolesResponse.data);

            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const appliquerFiltres = (elementId, roleId) => {
        let listeFiltree = personnages;

        // Filtre par élément
        if (elementId !== null) {
            listeFiltree = listeFiltree.filter(p => p.element && p.element.id === elementId);
        }

        // Filtre par rôle
        if (roleId !== null) {
            listeFiltree = listeFiltree.filter(p => p.role && p.role.id === roleId);
        }

        // On applique le tri sur la liste filtrée avant de l'afficher
        setPersonnagesFiltres(trierPersonnages(listeFiltree));
    };

    const handleFiltreElement = (elementId) => {
        setElementActif(elementId);
        appliquerFiltres(elementId, roleActif);
    };

    const handleFiltreRole = (roleId) => {
        setRoleActif(roleId);
        appliquerFiltres(elementActif, roleId);
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="all-personnages-page-container">
            <h1>Tous les personnages</h1>

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

                <div className="filter-section">
                    <h3>Filtrer par rôle</h3>
                    <div className="role-filters">
                        <button
                            onClick={() => handleFiltreRole(null)}
                            className={`role-filter-btn ${roleActif === null ? 'active' : ''}`}
                        >
                            Tous
                        </button>
                        {roles.map(role => (
                            <button
                                key={role.id}
                                onClick={() => handleFiltreRole(role.id)}
                                className={`role-filter-btn ${roleActif === role.id ? 'active' : ''}`}
                                title={role.nom}
                            >
                                {role.icone ? (
                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/images/roles/${role.icone}`} alt={role.nom} />
                                ) : (
                                    <span>{role.nom}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
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
                    <p className="no-results">Aucun personnage ne correspond aux filtres sélectionnés.</p>
                )}
            </main>
        </div>
    );
}

export default AllPersonnagesPage;