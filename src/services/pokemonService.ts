import api from "../api/axios";
import { pokemonResponseModel } from "../models/pokemonResponseModel";

export async function getPokemonAxios() {
  return await api.get<pokemonResponseModel>("/");
}

export async function getPokemonDetailAxios(id: string) {
  return await api.get<any>("/" + id);
}
