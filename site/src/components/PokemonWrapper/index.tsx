import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import Input from "../Input";
export default function PokemonWrapper() {
  const [pokemonOne, setPokemonOne] = useState<string>();
  const [pokemonTwo, setPokemonTwo] = useState<string>();

  return (
    <div>
      <div>
        <Input
          buttonName="Pokemon 1"
          placeholder="Enter first pokemon name"
          setValue={setPokemonOne}
        />
        <Pokemon name={pokemonOne}></Pokemon>
      </div>
      <div>
        <Input
          buttonName="Pokemon 2"
          placeholder="Enter first pokemon name"
          setValue={setPokemonTwo}
        />
        <Pokemon name={pokemonTwo}></Pokemon>
      </div>
    </div>
  );
}
