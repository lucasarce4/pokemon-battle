import { useState } from "react";
import Pokemon from "./Pokemon";
import Input from "../Input";
export default function PokemonWrapper() {
  const [pokemonOne, setPokemonOne] = useState<string>("");
  const [pokemonTwo, setPokemonTwo] = useState<string>("");
  const [attackPokeOne, setAttackPokeOne] = useState<number>(0);
  const [attackPokeTwo, setAttackPokeTwo] = useState<number>(0);

  return (
    <div className="wrapper">
      <div className="input-and-button">
        <Input
          buttonName="Pokemon 1"
          placeholder="Enter first pokemon name"
          setValue={setPokemonOne}
        />
        <Pokemon
          name={pokemonOne}
          setAttack={setAttackPokeOne}
          receiveAttack={attackPokeTwo}
        ></Pokemon>
      </div>
      <div className="input-and-button">
        <Input
          buttonName="Pokemon 2"
          placeholder="Enter first pokemon name"
          setValue={setPokemonTwo}
        />
        <Pokemon
          name={pokemonTwo}
          setAttack={setAttackPokeTwo}
          receiveAttack={attackPokeOne}
        ></Pokemon>
      </div>
    </div>
  );
}
