import { useEffect, useState } from 'react'
import PokemonList from './components/PokemonList';

import './App.css'

function App() {

  const [pokemons, setPokemons] = useState([])

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResult, setSearchResult] = useState(null);

  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm) {

      setSearchResult(null);
      setError('');
      return;
    }

    setError('');
    setSearchResult(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

      if (!response.ok) {

        throw new Error('Pokémon não encontrado!');
      }

      const data = await response.json();
      setSearchResult(data);

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {

    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');

        const data = await response.json();

        setPokemons(data.results);

      } catch (error) {
        console.error("Houve um erro ao buscar os Pokémon:", error);
      }
    };

    fetchPokemons();

  }, []);

  return (
    <div className="container">
      <h1>LumerPoke</h1>

      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Procure por nome ou número" value={searchTerm} onChange={e => setSearchTerm(e.target.value.toLowerCase())} />
        <button type="submit">Buscar</button>
      </form>

      <div className="pokemon-display">
        {error && <p className="error-message">{error}</p>}

        {searchResult ? ( 
          <PokemonList key={searchResult.name} pokemon={{ name: searchResult.name, url: `https://pokeapi.co/api/v2/pokemon/${searchResult.id}/` }} />
        ) :
          (
            !error && pokemons.map(pokemon =>
            <PokemonList key={pokemon.name} pokemon={pokemon} /> )
          )}
      </div>

    </div>
  )
}

export default App
