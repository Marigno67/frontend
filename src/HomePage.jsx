import React from 'react';

function HomePage() {

  return (
    <div>
      <h1>Le Codex des Chasseurs : Votre Interface Système</h1>
      <main>
        <p style={{ fontSize: '1.1em', color: '#ccc' }}>
          Chasseur, bienvenue. Au-delà du voile de notre monde, les portails s'ouvrent et déversent des créatures imprégnées de mana. Dans cette lutte pour la survie, seuls les plus préparés peuvent espérer gravir les échelons et survivre aux donjons les plus impitoyables.
        </p>
        <p>
          Considérez ce site comme votre interface personnelle avec le Système, une archive compilée pour vous fournir les informations cruciales nécessaires à votre progression. Chaque donnée, chaque statistique est une clé pour débloquer votre véritable potentiel.
        </p>
        
        <hr style={{ borderColor: '#444', margin: '30px 0' }} />

        <div>
            <h4><strong>Registre des Chasseurs</strong></h4>
            <p>Consultez les dossiers de tous les combattants connus, de l'insignifiant rang E au légendaire rang S. Analysez leurs forces, leurs faiblesses et les stratégies qui les ont menés au sommet.</p>
        </div>

        <div>
            <h4><strong>Trésor des Artefacts</strong></h4>
            <p>Accédez à une base de données complète des ensembles d'artefacts découverts dans les donjons les plus périlleux. Étudiez les bonus de set, visualisez chaque pièce et assemblez l'équipement qui fera de vous une force inarrêtable.</p>
        </div>

        <div>
            <h4><strong>Optimisation Systémique</strong></h4>
            <p>La puissance brute ne suffit pas. Découvrez ici les builds optimisés, l'allocation de statistiques à prioriser pour chaque classe de chasseur et les synergies d'équipement qui transforment un simple combattant en monarque.</p>
        </div>
        
        <hr style={{ borderColor: '#444', margin: '30px 0' }} />

        <p style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold' }}>
          Le chemin pour devenir le plus puissant est semé d'embûches. Ne laissez rien au hasard.
          <br />
          Étudiez, préparez-vous, et levez-vous.
        </p>
      </main>
    </div>
  );
}

export default HomePage;