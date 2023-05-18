import { IPokemon } from "../IPokemon";
interface IPokemonProp {
  pokemon: IPokemon | undefined;
  onDealAttack: (attack: number) => void;
}

export default function Pokemon({ pokemon, onDealAttack }: IPokemonProp) {
  return (
    <div className={"pokemon-card " + (pokemon?.dead ? "dead" : "")}>
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
        <img src={pokemon.img} className={"image " + (pokemon.attacked ? "atacked" : "")}></img>
      ) : null}
      <div className="pokemon-abilities">
        {pokemon &&
          pokemon?.abilities.map((ability) => {
            return (
              <button
                key={ability.name}
                onClick={() => onDealAttack(ability.strength)}
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
