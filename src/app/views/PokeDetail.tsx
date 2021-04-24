import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { H1, P } from "../components/Typography";
import { getPokemonDetailAxios } from "../../services/pokemonService";
import { pokemonDetailResponseModel } from "../../models/pokemonDetailResponseModel";
import { BorderBox } from "../components/BorderBox";
import {Card} from "../components/Card";
import {Link} from "react-router-dom";

const PokeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [
    pokemonDetail,
    setPokemonDetail,
  ] = useState<pokemonDetailResponseModel>();

  //two useEffects will run at first render. This useEffect will not re-render.

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

    /* put the id in the dependency array to re-render the component
       will run the first time alongside the first useEffect => fetchPokemonDetails
    */
    useEffect(() => {
        getPokemonDetailAxios(id)
            .then(({data}) => setPokemonDetail(data))
            .catch(({message}) => console.log(message));

        //was verifying what's inside the past types api
        //console.log("PASTYPES:", JSON.stringify(pokemonDetail?.past_types))
    }, [id]);


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

              <div style={{display:"flex", justifyContent:"space-around",
                  flexDirection:"row", alignItems:"center", padding:"3rem" }}>
                  {/*not show the "Back button" if there's no more */}
                  {id == "1" ? null : <div>
                      <Link style={{backgroundColor: "darkorange",
                          padding:"1rem",
                          borderRadius:"5px",
                          color:"white"}}
                            to={'/poke-details/' + (parseInt(id) - 1  )}
                      > Back </Link>
                  </div> }


                  <div style={{ justifyItems: "center", display: "grid"}}>
                      <H1>{pokemonDetail?.name}</H1>
                  </div>

                  <div>

                      <Link style={{backgroundColor:"darkolivegreen",
                          color:"white", padding:"1rem", margin: "2rem",
                          borderRadius:"5px"}}
                       to={'/poke-details/' + (parseInt(id) + 1 )}
                      >
                       Next
                      </Link>


                  </div>

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
                {/*if id is true = render img  */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {id && (
                    <img
                      height={"80%"}
                      width={"80%"}
                      src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
                      alt="picture"
                    />
                  )}
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
                  <P>Base Experience: </P>
                    {pokemonDetail?.base_experience }
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
                    {pokemonDetail?.abilities.map((ability) => (
                      <div key={ability.ability.name}>{ability.ability.name}</div>
                    ))}
                  </div>
                  <div>
                    <h2> Height</h2>
                    {pokemonDetail?.height}
                  </div>
                </div>
              </div>


              <div style={{marginLeft: "3rem"}}>
                 <div> <H1> STATS </H1></div>
               <div style={{marginTop:"2rem"}}>
                   {pokemonDetail?.stats.map((stat) => (
                       <span key={stat.stat.name}>  {` 
                       ${stat.base_stat} 
                     ${stat.effort}`} </span>
                   ))}
               </div>

              </div>

              <div>
                <H1>Moves </H1>
                {pokemonDetail?.moves?.map((v) => (
                  <span key={ v.move.url}>{v.move.name} , </span>
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
