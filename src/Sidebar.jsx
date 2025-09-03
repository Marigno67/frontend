import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ personnages }) {
  const [isPersonnagesMenuOpen, setIsPersonnagesMenuOpen] = useState(false);

  // ... le reste du code de votre composant Sidebar ...

  const togglePersonnagesMenu = () => {
    setIsPersonnagesMenuOpen(!isPersonnagesMenuOpen);
  };

  return (
    <div className="sidebar">
      <div className="menu-item">
        <button onClick={togglePersonnagesMenu}>
          Personnages
          <span className={`arrow ${isPersonnagesMenuOpen ? 'up' : 'down'}`}>▼</span>
        </button>
        {isPersonnagesMenuOpen && (
          <ul className="submenu">
            {personnages.length > 0 ? (
              personnages.map(p => (
                <li key={p.id}>
                  <Link to={`/personnage/${p.id}`} className="sidebar-link">
                    {p.nom}
                  </Link>
                </li>
              ))
            ) : (
              <p>Chargement...</p>
            )}
          </ul>
        )}
      </div>

      <div className="menu-item">
        <Link to="/modes-de-jeu" className="sidebar-link">
          Modes de jeu
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;