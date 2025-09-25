import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OmbresPage.css';

function OmbresPage() {
    const [ombres, setOmbres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOmbres = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/ombres`);
                const sortedData = response.data.sort((a, b) => a.nom.localeCompare(b.nom));
                setOmbres(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des ombres:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOmbres();
    }, []);

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="ombres-page-container">
            <h1>Registre des Ombres</h1>
            <div className="ombres-grid">
                {ombres.map(ombre => (
                    <div key={ombre.id} className="ombre-card">
                        {ombre.image && (
                            <img 
                                src={`${process.env.REACT_APP_API_URL}/uploads/images/${ombre.image}`} 
                                alt={ombre.nom} 
                                className="ombre-image"
                            />
                        )}
                        <div className="ombre-info">
                            <h2>{ombre.nom}</h2>
                            {ombre.description && <div className="ombre-description" dangerouslySetInnerHTML={{ __html: ombre.description }} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OmbresPage;