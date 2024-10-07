import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Footer from "../footer/components/footer"

const Api = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 10; // Número de Pokémon que se muestran por página 

  // Función para obtener la lista de Pokémon
  const fetchPokemonList = async (page) => {
    setLoading(true);
    setError(null);
    const offset = (page - 1) * limit; // Calcula el número de Pokemon que se debe saltar para mostrar nuevos en la página actual
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const results = response.data.results;

      // Mapeo para obtener información de cada Pokémon
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

  // Cargar los Pokémon una vez que se detecta que cambia current page
  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [currentPage]);

  // Función para cambiar de página
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };


  return (
    <>
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
                <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                <p><strong>Type:</strong> {pokemon.types}</p>
                <p><strong>Base Experience:</strong> {pokemon.baseExperience}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
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
      </div>
      <div style={({ display: 'flex', justifyContent: 'center', width: "100%" })}>
        <Footer />
      </div>
    </>
  );
};

export default Api;
