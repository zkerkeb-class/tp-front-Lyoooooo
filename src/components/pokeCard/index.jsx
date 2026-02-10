import { Link } from "react-router";
import './index.css';

const PokeCard = ({ pokemon }) => {
    if (!pokemon) {
        return <p>Chargement du Pokémon...</p>;
    }

    // Get the primary type for styling
    const primaryType = pokemon.type?.[0]?.toLowerCase() || 'normal';

    return (
        <Link to={`/pokemonDetails/${pokemon.id}`}>
            <div className="poke-card">
                <div className={`poke-card-header poke-type-${primaryType}`}>
                    <h3 className="poke-title">{pokemon.name?.english || pokemon.name}</h3>
                    <p className="poke-subtitle">{pokemon.name?.french}</p>
                </div>
                <div className="poke-image-background">
                    <img 
                        src={pokemon.image} 
                        alt={pokemon.name?.english}
                        className="poke-image"
                    />
                </div>
                <div className="poke-stats">
                    <div className="poke-stat-row">
                        <span className="stat-label">HP</span>
                        <span className="stat-value">{pokemon.base?.HP}</span>
                    </div>
                    <div className="poke-stat-row">
                        <span className="stat-label">ATK</span>
                        <span className="stat-value">{pokemon.base?.Attack}</span>
                    </div>
                    <div className="poke-stat-row">
                        <span className="stat-label">DEF</span>
                        <span className="stat-value">{pokemon.base?.Defense}</span>
                    </div>
                </div>
                <div className="poke-types">
                    {pokemon.type?.map((type, index) => (
                        <span key={index} className={`type-badge type-${type.toLowerCase()}`}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

export default PokeCard;