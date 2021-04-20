import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { pokemonResponseModel } from "../../models/pokemonResponseModel";
import { getPokemonAxios } from "../../services/pokemonService";
import { Card } from "../components/Card";
import { H1 } from "../components/Typography";

const Pokedex = () => {
  const [loading, setLoading] = useState(false);
  const [
    pokemonResponse,
    setPokemonResponse,
  ] = useState<pokemonResponseModel>();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const history = useHistory();

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const { data } = await getPokemonAxios();
      setPokemonResponse(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  if (loading) return <h2>Loading</h2>;

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
          <Card onClick={() => history.push("/poke-details/" + (index + 1))}>
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
              <H1>{pokemon.name}</H1>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Pokedex;
