import { useState } from "react";
import PokeCard from "../pokeCard";
import usePokemons from "../../hook/usePokemons";

import './index.css';

const PokeList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { pokemons, loading, error, pagination } = usePokemons(currentPage);

    if (loading) {
        return <p>Chargement...</p>
    }

    if (error) {
        return <p>Erreur: {error}</p>
    }

    return (
        <div className="poke-list-container">
            <h2>Liste des Pokémon</h2>
            <ul className="poke-list">
                {pokemons.map((pokemon) => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </ul>
            
            {/* Pagination */}
            <div className="pagination">
                <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    ← Précédent
                </button>
                
                <span className="page-info">
                    Page {pagination.currentPage} sur {pagination.totalPages}
                </span>
                
                <button 
                    disabled={currentPage === pagination.totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Suivant →
                </button>
            </div>
        </div>
    );
};

export default PokeList;

