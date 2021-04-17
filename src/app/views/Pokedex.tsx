import React, { useEffect, useState } from "react";
import { pokemonResponseModel } from "../../models/pokemonResponseModel";
import { getPokemonAxios } from "../../services/pokemonService";
import { Card } from "../components/Card";
import { Img } from "../components/Image";
import { PokeName } from "../components/Typography";

const Pokedex = () => {
  const [
    pokemonResponse,
    setPokemonResponse,
  ] = useState<pokemonResponseModel>();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    const { data } = await getPokemonAxios();

    setPokemonResponse(data);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "32% 32% 32%",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {pokemonResponse?.results.map((pokemon, index) => (
        <div key={pokemon.name}>
          <Card onClick={() => alert(pokemon.name)}>
            <Card>
              <img
                height={"35%"}
                width={"60%"}
                src={`https://pokeres.bastionbot.org/images/pokemon/${
                  index + 1
                }.png`}
              />
            </Card>
            <div>
              <PokeName>{pokemon.name}</PokeName>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Pokedex;
