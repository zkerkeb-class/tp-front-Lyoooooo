import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import './createPokemon.css';

const CreatePokemon = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: {
            english: '',
            french: '',
            japanese: '',
            chinese: ''
        },
        type: [],
        base: {
            HP: 0,
            Attack: 0,
            Defense: 0,
            SpecialAttack: 0,
            SpecialDefense: 0,
            Speed: 0
        },
        image: ''
    });

    const [typeInput, setTypeInput] = useState('');
    const [loading, setLoading] = useState(false);

    const types = [
        'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
        'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
        'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        if (nameParts[0] === 'name') {
            setFormData({
                ...formData,
                name: {
                    ...formData.name,
                    [nameParts[1]]: value
                }
            });
        } else if (nameParts[0] === 'base') {
            setFormData({
                ...formData,
                base: {
                    ...formData.base,
                    [nameParts[1]]: parseInt(value) || 0
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const toggleType = (type) => {
        if (formData.type.includes(type)) {
            setFormData({
                ...formData,
                type: formData.type.filter(t => t !== type)
            });
        } else if (formData.type.length < 2) {
            setFormData({
                ...formData,
                type: [...formData.type, type]
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.english) {
            alert('Le nom anglais est requis');
            return;
        }

        if (formData.type.length === 0) {
            alert('Sélectionnez au moins un type');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/pokemons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du Pokémon');
            }

            const newPokemon = await response.json();
            alert(`Pokémon ${newPokemon.name.english} créé avec succès!`);
            navigate('/');
        } catch (err) {
            alert('Erreur: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-pokemon-container">
            <Link to="/" className="back-link">← Retour à la liste</Link>

            <div className="create-card">
                <h1>Créer un nouveau Pokémon</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Informations générales</h3>
                        
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom (Anglais) *</label>
                                <input
                                    type="text"
                                    name="name.english"
                                    value={formData.name.english}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Nom (Français)</label>
                                <input
                                    type="text"
                                    name="name.french"
                                    value={formData.name.french}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom (Japonais)</label>
                                <input
                                    type="text"
                                    name="name.japanese"
                                    value={formData.name.japanese}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nom (Chinois)</label>
                                <input
                                    type="text"
                                    name="name.chinese"
                                    value={formData.name.chinese}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="http://localhost:3000/assets/pokemons/..."
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Types *</h3>
                        <div className="types-selector">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    className={`type-btn type-${type.toLowerCase()} ${
                                        formData.type.includes(type) ? 'selected' : ''
                                    }`}
                                    onClick={() => toggleType(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <p className="type-hint">Sélectionnez jusqu'à 2 types</p>
                    </div>

                    <div className="form-section">
                        <h3>Stats de base</h3>
                        <div className="stats-grid">
                            <div className="form-group">
                                <label>HP</label>
                                <input
                                    type="number"
                                    name="base.HP"
                                    value={formData.base.HP}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="300"
                                />
                            </div>
                            <div className="form-group">
                                <label>ATK</label>
                                <input
                                    type="number"
                                    name="base.Attack"
                                    value={formData.base.Attack}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="300"
                                />
                            </div>
                            <div className="form-group">
                                <label>DEF</label>
                                <input
                                    type="number"
                                    name="base.Defense"
                                    value={formData.base.Defense}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="300"
                                />
                            </div>
                            <div className="form-group">
                                <label>SP.ATK</label>
                                <input
                                    type="number"
                                    name="base.SpecialAttack"
                                    value={formData.base.SpecialAttack}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="300"
                                />
                            </div>
                            <div className="form-group">
                                <label>SP.DEF</label>
                                <input
                                    type="number"
                                    name="base.SpecialDefense"
                                    value={formData.base.SpecialDefense}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="300"
                                />
                            </div>
                            <div className="form-group">
                                <label>SPD</label>
                                <input
                                    type="number"
                                    name="base.Speed"
                                    value={formData.base.Speed}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="btn btn-create" disabled={loading}>
                            {loading ? 'Création...' : '✨ Créer Pokémon'}
                        </button>
                        <Link to="/" className="btn btn-cancel">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePokemon;
