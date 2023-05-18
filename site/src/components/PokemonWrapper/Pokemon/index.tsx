import { useEffect, useState } from "react";
import { fetchPokemon, getAbility } from "../../../services/fetchPokemonData";
interface IPokemonProp {
  name: string | undefined;
  receiveAttack: number | undefined;
  setAttack: (value: number) => void;
}

interface IAbility {
  name: string;
  strength: number;
}

interface IPokemon {
  name?: string;
  img: string;
  abilities: IAbility[];
  totalHealth: number;
  currentHealth: number;
  dead: boolean;
}

export default function Pokemon({
  name,
  setAttack,
  receiveAttack,
}: IPokemonProp) {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [showError, setShowError] = useState(false);
  const [attacked, setAttacked] = useState(false);

  async function pokemonInfo(data: any | undefined) {
    const initialIndex = Math.floor(Math.random() * data.moves.length) - 4;
    const ability = await Promise.all(
      data.moves
        .slice(initialIndex, initialIndex + 4)
        .map(async (moveObj: any) => {
          const data = await getAbility(moveObj.move.url);
          console.log(data);
          return {
            name: moveObj.move.name,
            strength: data.pp,
          };
        })
    );
    const health = data.stats.find(
      (statObj: any) => statObj.stat.name === "hp"
    );
    const pokemon: IPokemon = {
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      img: data.sprites.front_default,
      abilities: ability,
      totalHealth: health["base_stat"],
      currentHealth: health["base_stat"],
      dead: false,
    };
    setTimeout(() => {
      setPokemon(pokemon);
    }, 0);
  }

  useEffect(() => {
    if (name === "") return;
    (async () => {
      try {
        const pokemonData = await fetchPokemon(name);
        console.log(pokemonData);
        pokemonInfo(pokemonData);
        setShowError(false);
      } catch (e: any) {
        setShowError(true);
        setPokemon(undefined);
      }
    })();
  }, [name]);

  useEffect(() => {
    if (pokemon && !pokemon.dead) {
      const newPokeData = { ...pokemon };
      newPokeData.currentHealth -= receiveAttack!;
      newPokeData.dead = newPokeData.currentHealth <= 0;
      setPokemon(newPokeData);
      setAttacked(true);
      setTimeout(() => {
        setAttacked(false);
      }, 200);
    }
  }, [receiveAttack]);

  function handleAttack(attack: number) {
    setAttack(attack);
  }

  return (
    <div className={"pokemon-card " + (pokemon?.dead ? "dead" : "")}>
      {showError ? "Invalid pokemon name" : null}

      {pokemon ? (
        <div className="pokemon-header">
          <p>{pokemon?.name} </p>
          <p>- HP: </p>
          <p>
            {pokemon?.currentHealth}/{pokemon?.totalHealth}
          </p>
        </div>
      ) : (
        "Search for a Pokemon to start"
      )}

      {pokemon ? (
        <img
          src={pokemon.img}
          className={"image " + (attacked ? "atacked" : "")}
        ></img>
      ) : null}
      <div className="pokemon-abilities">
        {pokemon &&
          pokemon?.abilities.map((ability) => {
            return (
              <button
                key={ability.name}
                onClick={() => handleAttack(ability.strength)}
                className="ability-button"
              >
                {ability.name} - {ability.strength}
              </button>
            );
          })}
      </div>
    </div>
  );
}
