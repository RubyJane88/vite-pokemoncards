import React, { useEffect } from "react";
import { useParams } from "react-router";
import { H1 } from "../components/Typography";
import { getPokemonDetailAxios } from "../../services/pokemonService";

const PokeDetail = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    await getPokemonDetailAxios(id);
  };

  return (
    <div>
      <h1> Poke Details Work! </h1>
      <H1> {id} </H1>
    </div>
  );
};

export default PokeDetail;
