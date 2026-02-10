import { useState } from 'react';
import './App.css'
import Pokelist from './components/pokelist'
import PokeCard from './components/pokeCard'
import { Link } from 'react-router'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResult(null);
      setError('');
      return;
    }

    setSearching(true);
    setError('');
    setSearchResult(null);

    try {
      const response = await fetch(`http://localhost:3000/api/pokemons/search/${searchQuery}`);
      
      if (!response.ok) {
        throw new Error('Pokémon non trouvé');
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      setError(err.message);
      setSearchResult(null);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    setError('');
  };

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">🔴 Pokédex</h1>
        <div className="header-actions">
          <Link to="/create" className="btn-create-header">✨ Créer Pokémon</Link>
        </div>
      </header>

      <div className="app-container">
        {/* Search Section */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Rechercher un Pokémon par nom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn" disabled={searching}>
              {searching ? '⏳' : '🔍'}
            </button>
          </form>

          {searchResult && (
            <div className="search-result">
              <button className="close-search" onClick={clearSearch}>✕</button>
              <div className="search-result-card-container">
                <PokeCard pokemon={searchResult} />
              </div>
            </div>
          )}

          {error && (
            <div className="search-error">
              ❌ {error}
            </div>
          )}
        </div>

        {/* Pokemon List */}
        {!searchResult && <Pokelist />}
      </div>
    </div>
  )
}

export default App

