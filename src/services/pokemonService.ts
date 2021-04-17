import api from "../api/axios";
import { pokemonResponseModel } from "../models/pokemonResponseModel";

export async function getPokemonAxios() {
  return await api.get<pokemonResponseModel>("/");
}
