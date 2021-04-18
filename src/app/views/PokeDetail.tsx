import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { H1 } from "../components/Typography";
import { getPokemonDetailAxios } from "../../services/pokemonService";
import { pokemonDetailResponseModel } from "../../models/pokemonDetailResponseModel";
import { Card } from "../components/Card";

const PokeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [
    pokemondetail,
    setPokemonDetail,
  ] = useState<pokemonDetailResponseModel>();

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const { data } = await getPokemonDetailAxios(id);
      setPokemonDetail(data);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };
  //if loading is true = render the h1
  if (loading) return <h1>Loading</h1>;

  return (
    <Card>
      <div>
        {/*if id is true = render img  */}
        <div>
          {id && (
            <img
              height={"35%"}
              width={"60%"}
              src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
              alt="picture"
            />
          )}
        </div>

        <div>
          {pokemondetail?.abilities.map((ability) => (
            <div>{ability.ability.name}</div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PokeDetail;
