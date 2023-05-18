export async function fetchPokemon(name: string | undefined) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (e: any) {
    throw new Error("Error");
  }
}

export async function getAbility(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e: any) {
    throw new Error("Error");
  }
}
