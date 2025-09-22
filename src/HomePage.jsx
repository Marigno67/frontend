import React, { useState, useEffect } from 'react';

function HomePage() {
  const [personnages, setPersonnages] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/personnages`)
      .then(response => response.json())
      .then(data => setPersonnages(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  return (
    <div className="homepage-container homepage-custom-background">
      <div className="main-content">
        <h1>Bienvenue sur le site des builds de Solo Leveling !</h1>
        <main>
          <p>
            Ce site a été conçu pour vous aider à optimiser vos personnages et à
            créer les meilleurs builds pour chaque mode de jeu.
          </p>
          <p>
            Solo Leveling est une œuvre de fiction qui suit les aventures de Sung
            Jinwoo, le chasseur le plus faible de l'humanité, qui se transforme
            en une puissance inégalée grâce à un système mystérieux. Explorez
            son histoire, ses builds, et ses équipements pour maîtriser chaque défi.
          </p>
          <p>
            Utilisez le menu sur la gauche pour naviguer entre les différents
            personnages et découvrir leurs builds.
          </p>
        </main>
      </div>
    </div>
  );
}

export default HomePage;