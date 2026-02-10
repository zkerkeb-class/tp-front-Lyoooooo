import { Link, useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import usePokemon from '../hook/usePokemon';
import './pokemonDetails.css';

const PokemonDetails = () => { 
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { pokemonData, loading, error } = usePokemon(id);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editData, setEditData] = useState(pokemonData || {});
    const [isPlayingSound, setIsPlayingSound] = useState(false);

    if (pokemonData && JSON.stringify(editData) === '{}') {
        setEditData(pokemonData);
    }

    if (loading) {
        return <p className="loading">Chargement des détails du Pokémon...</p>;
    }

    if (error || !pokemonData) {
        return <p className="error">Erreur: {error || 'Pokémon non trouvé'}</p>;
    }

    const playCry = async () => {
        setIsPlayingSound(true);
        try {
            // URL du cri depuis PokéAPI
            const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
            const audio = new Audio(cryUrl);
            audio.play().catch(() => {
                // Fallback: essayer l'ancien format
                const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/other/${id}.ogg`;
                const audioFallback = new Audio(fallbackUrl);
                audioFallback.play();
            });
            audio.onended = () => setIsPlayingSound(false);
            audio.onerror = () => {
                alert('Son non disponible pour ce Pokémon');
                setIsPlayingSound(false);
            };
        } catch (err) {
            console.error('Erreur lors de la lecture du son:', err);
            setIsPlayingSound(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        if (nameParts[0] === 'name') {
            setEditData({
                ...editData,
                name: {
                    ...editData.name,
                    [nameParts[1]]: value
                }
            });
        } else if (nameParts[0] === 'base') {
            setEditData({
                ...editData,
                base: {
                    ...editData.base,
                    [nameParts[1]]: parseInt(value) || 0
                }
            });
        }
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });

            if (!response.ok) {
                throw new Error('Failed to update pokemon');
            }

            setIsEditing(false);
            navigate('/');
            setTimeout(() => navigate(`/pokemonDetails/${id}`), 100);
        } catch (err) {
            alert('Erreur lors de la mise à jour: ' + err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete pokemon');
            }

            alert('Pokémon supprimé avec succès!');
            navigate('/');
        } catch (err) {
            alert('Erreur lors de la suppression: ' + err.message);
        }
    };

    const primaryType = pokemonData.type?.[0]?.toLowerCase() || 'normal';

    return (
        <div className="pokemon-details-container">
            <Link to="/" className="back-link">← Retour à la liste</Link>

            <div className={`details-card poke-type-${primaryType}`}>
                <div className="details-header">
                    <h1>{pokemonData.name?.english}</h1>
                    <p className="french-name">{pokemonData.name?.french}</p>
                </div>

                <div className="details-content">
                    <div className="image-section">
                        <img 
                            src={pokemonData.image} 
                            alt={pokemonData.name?.english}
                            className="large-pokemon-image"
                        />
                    </div>

                    <div className="info-section">
                        <div className="info-group">
                            <h3>Types</h3>
                            <div className="types-list">
                                {pokemonData.type?.map((type, index) => (
                                    <span key={index} className={`type-badge type-${type.toLowerCase()}`}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {isEditing ? (
                            <div className="edit-section">
                                <h3>Modifier les informations</h3>
                                
                                <div className="edit-form">
                                    <div className="form-group">
                                        <label>Nom (Anglais)</label>
                                        <input 
                                            type="text" 
                                            name="name.english"
                                            value={editData.name?.english || ''}
                                            onChange={handleEditChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nom (Français)</label>
                                        <input 
                                            type="text" 
                                            name="name.french"
                                            value={editData.name?.french || ''}
                                            onChange={handleEditChange}
                                        />
                                    </div>

                                    <h4>Stats de base</h4>
                                    <div className="stats-grid">
                                        <div className="form-group">
                                            <label>HP</label>
                                            <input 
                                                type="number" 
                                                name="base.HP"
                                                value={editData.base?.HP || 0}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>ATK</label>
                                            <input 
                                                type="number" 
                                                name="base.Attack"
                                                value={editData.base?.Attack || 0}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>DEF</label>
                                            <input 
                                                type="number" 
                                                name="base.Defense"
                                                value={editData.base?.Defense || 0}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>SP.ATK</label>
                                            <input 
                                                type="number" 
                                                name="base.SpecialAttack"
                                                value={editData.base?.SpecialAttack || 0}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>SP.DEF</label>
                                            <input 
                                                type="number" 
                                                name="base.SpecialDefense"
                                                value={editData.base?.SpecialDefense || 0}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>SPD</label>
                                            <input 
                                                type="number" 
                                                name="base.Speed"
                                                value={editData.base?.Speed || 0}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="edit-buttons">
                                    <button className="btn btn-save" onClick={handleSaveEdit}>Enregistrer</button>
                                    <button className="btn btn-cancel" onClick={() => {
                                        setIsEditing(false);
                                        setEditData(pokemonData);
                                    }}>Annuler</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="info-group">
                                    <h3>Stats de base</h3>
                                    <div className="stats-display">
                                        <div className="stat-item">
                                            <span className="stat-name">HP</span>
                                            <div className="stat-bar">
                                                <div className="stat-fill" style={{ width: `${(pokemonData.base?.HP / 150) * 100}%` }}></div>
                                            </div>
                                            <span className="stat-value">{pokemonData.base?.HP}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-name">ATK</span>
                                            <div className="stat-bar">
                                                <div className="stat-fill" style={{ width: `${(pokemonData.base?.Attack / 150) * 100}%` }}></div>
                                            </div>
                                            <span className="stat-value">{pokemonData.base?.Attack}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-name">DEF</span>
                                            <div className="stat-bar">
                                                <div className="stat-fill" style={{ width: `${(pokemonData.base?.Defense / 150) * 100}%` }}></div>
                                            </div>
                                            <span className="stat-value">{pokemonData.base?.Defense}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-name">SP.ATK</span>
                                            <div className="stat-bar">
                                                <div className="stat-fill" style={{ width: `${(pokemonData.base?.SpecialAttack / 150) * 100}%` }}></div>
                                            </div>
                                            <span className="stat-value">{pokemonData.base?.SpecialAttack}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-name">SP.DEF</span>
                                            <div className="stat-bar">
                                                <div className="stat-fill" style={{ width: `${(pokemonData.base?.SpecialDefense / 150) * 100}%` }}></div>
                                            </div>
                                            <span className="stat-value">{pokemonData.base?.SpecialDefense}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-name">SPD</span>
                                            <div className="stat-bar">
                                                <div className="stat-fill" style={{ width: `${(pokemonData.base?.Speed / 150) * 100}%` }}></div>
                                            </div>
                                            <span className="stat-value">{pokemonData.base?.Speed}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button className="btn btn-sound" onClick={playCry} disabled={isPlayingSound}>
                                        {isPlayingSound ? '⏸️ Lecture...' : '🔊 Écouter le cri'}
                                    </button>
                                    <button className="btn btn-edit" onClick={() => setIsEditing(true)}>✏️ Modifier</button>
                                    <button className="btn btn-delete" onClick={() => setShowDeleteModal(true)}>🗑️ Supprimer</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Confirmer la suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer <strong>{pokemonData.name?.english}</strong>?</p>
                        <p className="warning">Cette action est irréversible.</p>
                        <div className="modal-buttons">
                            <button className="btn btn-delete" onClick={handleDelete}>Supprimer</button>
                            <button className="btn btn-cancel" onClick={() => setShowDeleteModal(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonDetails;