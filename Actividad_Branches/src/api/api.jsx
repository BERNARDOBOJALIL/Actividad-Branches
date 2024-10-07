import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Footer from "../footer/components/footer";
import Navbar from "../navbar/navbar";

const Api = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // Estado para el filtro de búsqueda
  const limit = 10;

  // Función para obtener la lista de Pokémon
  const fetchPokemonList = async (page) => {
    setLoading(true);
    setError(null);
    const offset = (page - 1) * limit;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const results = response.data.results;

      // Obtener información detallada de cada Pokémon
      const pokemonDataPromises = results.map(async (pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return {
          id: pokemonDetails.data.id,
          name: pokemonDetails.data.name,
          image: pokemonDetails.data.sprites.front_default,
          height: pokemonDetails.data.height,
          weight: pokemonDetails.data.weight,
          types: pokemonDetails.data.types.map((typeInfo) => typeInfo.type.name).join(', '),
          baseExperience: pokemonDetails.data.base_experience,
        };
      });

      const detailedPokemonData = await Promise.all(pokemonDataPromises);
      setPokemonList(detailedPokemonData);

    } catch (err) {
      setError('Error al cargar los datos de Pokémon');
    }
    setLoading(false);
  };

  // Función para obtener un Pokémon por nombre
  const fetchPokemonByName = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const pokemonDetails = response.data;

      const detailedPokemonData = [{
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        image: pokemonDetails.sprites.front_default,
        height: pokemonDetails.height / 10,
        weight: pokemonDetails.weight / 10,
        types: pokemonDetails.types.map((typeInfo) => typeInfo.type.name).join(', '),
        baseExperience: pokemonDetails.base_experience,
      }];
      
      setPokemonList(detailedPokemonData);
    } catch (err) {
      setError('');
    }
    setLoading(false);
  };

  // Cargar los Pokémon cuando cambie currentPage o si no hay búsqueda activa
  useEffect(() => {
    if (!search) {
      fetchPokemonList(currentPage);
    }
  }, [currentPage, search]);

  // Ejecutar búsqueda de Pokémon por nombre si hay un término de búsqueda
  useEffect(() => {
    if (search) {
      fetchPokemonByName(search);
    } else {
      fetchPokemonList(currentPage);
    }
  }, [search]);

  // Función para cambiar de página
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <>
      {/* Pasar setSearch al Navbar para la barra de búsqueda */}
      <Navbar setPokemon={setSearch} />
      <div className="app-container">
        <h1 style={{ color: '#ffcd0d' }}>Pokémon</h1>
        {loading && <p className="loading">Cargando...</p>}
        {error && <p className="error">{error}</p>}

        <div className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id} className="card">
              <img src={pokemon.image} alt={pokemon.name} />
              <div className="card-body">
                <h3>{pokemon.name.toUpperCase()}</h3>
                <p><strong>Height:</strong> {pokemon.height} m</p>
                <p><strong>Weight:</strong> {pokemon.weight} kg</p>
                <p><strong>Type:</strong> {pokemon.types}</p>
                <p><strong>Base Experience:</strong> {pokemon.baseExperience}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {!search && ( // La paginación solo se muestra si no hay una búsqueda activa
          <div className="pagination">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span style={{ color: 'black' }}>Página {currentPage}</span>
            <button
              onClick={() => handlePageChange(1)}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
      <div style={({ display: 'flex', justifyContent: 'center', width: "100%" })}>
        <Footer />
      </div>
    </>
  );
};

export default Api;
