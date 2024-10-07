import React, { useState } from 'react';
import './navbar.css';

const Navbar = ({ setPokemon }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setPokemon(value); // Llamamos a la función pasada como prop para filtrar en el componente padre
  };

  return (
    <nav className="navbar">
      <div>
        <img
          src="https://www.freeiconspng.com/thumbs/pikachu-transparent/pikachu-png-transparent-0.png"
          alt="Pikachu"
        />
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
      <div className="navbar-links">
        <a href="https://www.iberopuebla.mx/" target="_blank" rel="noopener noreferrer">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
