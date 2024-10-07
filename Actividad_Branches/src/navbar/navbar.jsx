import React from 'react';
import './navbar.css';
import pikachu from '../assets/pikachu.png';

const Navbar = ({ setPokemon }) => {

    const handleSearchChange = (event) => {
        setPokemon(event.target.value);
    };

    return (
        <nav className="navbar">
            <div >
                <img src={pikachu} alt="Pikachu" />
            </div>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    onChange={handleSearchChange}
                />
            </div>
            <div className="navbar-links">
                <a href="/contact">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
