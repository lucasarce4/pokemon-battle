import { useState } from "react";
import Pokemon from "./Pokemon";
import Input from "../Input";
import { fetchPokemon, getAbility } from "../../services/fetchPokemonData";
import { IPokemon } from "./IPokemon";

async function fetchPokemonInfo(name: string): Promise<IPokemon> {
  const pokemonData = await fetchPokemon(name);
  const initialIndex = Math.floor(Math.random() * pokemonData.moves.length) - 4;
  const abilities = await Promise.all(
    pokemonData.moves.slice(initialIndex, initialIndex + 4).map(async (moveObj: any) => {
      const data = await getAbility(moveObj.move.url);
      return {
        name: moveObj.move.name,
        strength: data.pp,
      };
    })
  );

  const health = pokemonData.stats.find((statObj: any) => statObj.stat.name === "hp");

  return {
    name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
    img: pokemonData.sprites.front_default,
    abilities: abilities,
    totalHealth: health["base_stat"],
    currentHealth: health["base_stat"],
    dead: false,
    attacked: false,
  };
}

export default function PokemonWrapper() {
  const [pokemonOne, setPokemonOne] = useState<IPokemon | undefined>(undefined);
  const [pokemonTwo, setPokemonTwo] = useState<IPokemon | undefined>(undefined);
  const [showError, setShowError] = useState(false);

  async function setPokemon(
    name: string,
    setPokemonMethod: (value: IPokemon | undefined) => void
  ): Promise<void> {
    setShowError(false);
    const pokemon = await fetchPokemonInfo(name).catch(() => setShowError(true));
    if (pokemon) setPokemonMethod(pokemon);
  }

  function handleDealAttack(pokemonIndex: number, attack: number): void {
    const receivingPokemon = pokemonIndex === 1 ? pokemonTwo : pokemonOne;

    if (!receivingPokemon) return;

    const newPokeData = {
      ...receivingPokemon,
      currentHealth: receivingPokemon.currentHealth - attack,
      dead: receivingPokemon.currentHealth - attack <= 0,
      attacked: true,
    };

    if (pokemonIndex === 1) setPokemonTwo(newPokeData);
    else setPokemonOne(newPokeData);

    setTimeout(() => {
      const restoredPokemon = { ...newPokeData, attacked: false };
      if (pokemonIndex === 1) setPokemonTwo(restoredPokemon);
      else setPokemonOne(restoredPokemon);
    }, 200);
  }

  return (
    <div className="wrapper">
      <div className="input-and-button">
        {showError ? "Invalid pokemon name" : null}
        <Input
          buttonName="Pokemon 1"
          placeholder="Enter first pokemon name"
          setValue={(name: string) => setPokemon(name, setPokemonOne)}
        />
        <Pokemon
          pokemon={pokemonOne}
          onDealAttack={(attack: number) => handleDealAttack(1, attack)}
        ></Pokemon>
      </div>
      <div className="input-and-button">
        <Input
          buttonName="Pokemon 2"
          placeholder="Enter first pokemon name"
          setValue={(name: string) => setPokemon(name, setPokemonTwo)}
        />
        <Pokemon
          pokemon={pokemonTwo}
          onDealAttack={(attack: number) => handleDealAttack(2, attack)}
        ></Pokemon>
      </div>
    </div>
  );
}
