import { useEffect, useState } from "react";

interface IPokemonProp {
  name: string | undefined;
}

interface IAbility {
  name: string;
  strength: number;
}

interface IPokemon {
  name?: string;
  img: string;
  abilities: IAbility[];
  health: number;
}

export default function Pokemon({ name }: IPokemonProp) {
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [showError, setShowError] = useState(false);
  function pokemonInfo(data: any | undefined) {
    const ability = data.abilities.map((abilityObj: any) => {
      return {
        name: abilityObj.ability.name,
        strength: Math.floor(Math.random() * 20) + 1,
      };
    });
    const pokemon: IPokemon = {
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      img: data.sprites.front_default,
      abilities: ability,
      health: Math.floor(Math.random() * 30) + 15,
    };
    setPokemon(pokemon);
  }
  useEffect(() => {
    if (name === undefined) return;
    (async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        pokemonInfo(data);
        setShowError(false);
      } catch (e: any) {
        setShowError(true);
        setPokemon(undefined);
      }
    })();
  }, [name]);
  return (
    <div>
      {showError ? "Invalid pokemon name" : null}
      <p>
        {pokemon ? pokemon.name : "Add a Pokemon to start"} - HP{" "}
        {pokemon?.health}
      </p>
      {pokemon ? <img src={pokemon.img}></img> : null}
      <div>
        {pokemon &&
          pokemon?.abilities.map((ability) => {
            return (
              <button key={ability.name}>
                {ability.name} - {ability.strength}
              </button>
            );
          })}
      </div>
    </div>
  );
}
