import { useState, useEffect } from 'react';

const usePokemon = (pokemonId) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!pokemonId) {
            setLoading(false);
            return;
        }

        const fetchPokemon = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/pokemons/${pokemonId}`);
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
                const data = await response.json();
                setPokemonData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [pokemonId]);

    return { pokemonData, loading, error };
};

export default usePokemon;