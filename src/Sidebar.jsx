import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import homeIcon from './iconeAccueil.png';

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Bouton burger - visible uniquement en mobile */}
      <button className="burger-button" onClick={toggleMenu} aria-label="Menu">
        <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-home-link" onClick={closeMenu}>
            <img src={homeIcon} alt="Accueil" className="sidebar-home-icon" />
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/personnages" className="sidebar-link" onClick={closeMenu}>
            Personnages
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/modes-de-jeu" className="sidebar-link" onClick={closeMenu}>
            Modes de jeu
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/artefacts" className="sidebar-link" onClick={closeMenu}>
            Artefacts
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/ombres" className="sidebar-link" onClick={closeMenu}>
            Ombres
          </Link>
        </div>
      </div>

      {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
      {isMenuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}
    </>
  );
}

export default Sidebar;
