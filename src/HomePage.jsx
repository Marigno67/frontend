import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

function HomePage() {
  const [personnages, setPersonnages] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/personnages')
      .then(response => response.json())
      .then(data => setPersonnages(data))
      .catch(error => console.error('Erreur:', error));
  }, []);

  return (
    <div className="homepage-container homepage-custom-background">
      <Sidebar personnages={personnages} />
      <div className="main-content">
      </div>
    </div>
  );
}

export default HomePage;