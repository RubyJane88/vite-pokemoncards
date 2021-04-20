import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { H1, P } from "../components/Typography";
import { getPokemonDetailAxios } from "../../services/pokemonService";
import { pokemonDetailResponseModel } from "../../models/pokemonDetailResponseModel";
import { Card } from "../components/Card";
import { BorderBox } from "../components/BorderBox";

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
    <div style={{ background: "gray" }}>
      <div style={{ margin: "auto 10rem" }}>
        <BorderBox>
          <div>
            <div style={{ justifyItems: "center", display: "grid" }}>
              <H1>{`${pokemondetail?.name} #00${pokemondetail?.id} `}</H1>
            </div>

            {/*BIG DIV */}
            <div
              style={{
                display: "grid",
                background: "lightgray",
                gridTemplateColumns: "30rem 30rem",
                gridTemplateRows: "30rem 30rem",
                margin: "2rem",
                padding: "2rem",
              }}
            >
              <Card>
                <div>
                  {/*if id is true = render img  */}
                  <div>
                    {id && (
                      <img
                        height={"40%"}
                        width={"60%"}
                        src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
                        alt="picture"
                      />
                    )}
                  </div>
                </div>
              </Card>

              <div
                style={{
                  gridTemplateRows: "20rem 10rem 20rem",
                  gridTemplateColumns: "20rem 10rem 20rem",
                  padding: "2rem",
                }}
              >
                <div>
                  <P>
                    Pokémon is short for “Pocket Monsters", the original
                    Japanese name. The franchise has its roots in a gaming
                    magazine in the early 1980s in Japan—Game Freak, started by
                    Satoshi Tajiri and Ken Sugimori.
                  </P>
                </div>
                <div>
                  <P>Location Area Encounters: </P>
                  {pokemondetail?.location_area_encounters.length}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 200px",
                    gridTemplateRows: "150px 150px",
                  }}
                >
                  <div>
                    <h2>Abilities</h2>
                    {pokemondetail?.abilities.map((ability) => (
                      <div>{ability.ability.name}</div>
                    ))}
                  </div>
                  <div>
                    <h2> Height</h2>
                    {pokemondetail?.height}
                  </div>
                </div>
              </div>

              <div>
                <Card>
                  <H1> STATS </H1>
                  {pokemondetail?.stats.map((stat) => (
                    <span> {`${stat.base_stat} ${stat.effort}`} </span>
                  ))}
                </Card>
              </div>

              <div>
                <h2>Moves </h2>
                {pokemondetail?.moves?.map((v) => (
                  <span key={v.move.name}>{v.move.name} , </span>
                ))}
              </div>
            </div>
          </div>
        </BorderBox>
      </div>
    </div>
  );
};

export default PokeDetail;
