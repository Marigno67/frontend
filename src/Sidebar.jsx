import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import homeIcon from './iconeAccueil.png';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-home-link">
          <img src={homeIcon} alt="Accueil" className="sidebar-home-icon" />
        </Link>
      </div>
      
      <div className="menu-item">
        <Link to="/personnages" className="sidebar-link">
          Personnages
        </Link>
      </div>

      <div className="menu-item">
        <Link to="/modes-de-jeu" className="sidebar-link">
          Modes de jeu
        </Link>
      </div>

      <div className="menu-item">
        <Link to="/artefacts" className="sidebar-link">
          Artefacts
        </Link>
      </div>
      
    </div>
  );
}

export default Sidebar;