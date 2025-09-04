import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
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
    </div>
  );
}

export default Sidebar;