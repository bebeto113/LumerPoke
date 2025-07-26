
import { useEffect, useState } from "react";

const PokemonList = ({ pokemon }) => {

    const [detailsPokemon, setDetailsPokemon] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(pokemon.url);
                const data = await response.json();

                setDetailsPokemon(data);

            } catch (error) {
                console.error("Houve um erro ao buscar os detalhes:", error);
            }
        };

        fetchDetails();

    }, [pokemon.url]);

    if (!detailsPokemon) {
        return <div>Carregando Card...</div>
    }

    return (
        <div className="pokemon-card">

            <img src={detailsPokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} width="150" />

            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p>Nº {detailsPokemon.id}</p>

            <div className="details">
                <h4>Características</h4>
                <p>Altura: {detailsPokemon.height / 10} m</p>
                <p>Peso: {detailsPokemon.weight / 10} kg</p>
            </div>

            <div className="habilities">
                <h4>Habilidades</h4>
                <ul>
                    {detailsPokemon.abilities.map(abilityInfo => (
                        <li key={abilityInfo.ability.name}>
                            {abilityInfo.ability.name}
                            {abilityInfo.is_hidden && " (Oculta)"}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="base-statistics">
                <h4>Estatísticas Base</h4>
                <ul>
                    {detailsPokemon.stats.map(statInfo => (
                        <li key={statInfo.stat.name}>
                            {statInfo.stat.name}: {statInfo.base_stat}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default PokemonList; 