import React from 'react';
import './footer.css';
import pokemonLogo from './pokemon-logo.png'; // Asegúrate de tener la imagen del logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
      <ul>
          <li>Universidad Iberoamericana Puebla</li>
          <li>Diseño de Software</li>
          <li>Otoño 2024</li>
        </ul>
      </div>
      <div className="footer-center">
        <img src={pokemonLogo} alt="Pokémon Logo" className="footer-logo" />
        <p>&copy; 2024 Pokémon API.</p>
        <p>All rights reserved.</p>
      </div>
      <div className="footer-right">
        <ul>
          <li>Bernardo Bojalil Lorenzini</li>
          <li>Antía Cores Barrón</li>
          <li>Antonio Vázquez Montalban</li>
          <li>Josua Alejandro Zamarron Ramírez</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;