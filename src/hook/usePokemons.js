import { useState, useEffect } from 'react';

const usePokemons = (page = 1) => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/pokemons?page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch pokemons');
                }
                const data = await response.json();
                setPokemons(data.data);
                setPagination(data.pagination);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [page]);

    return { pokemons, loading, error, pagination };
};

export default usePokemons;
