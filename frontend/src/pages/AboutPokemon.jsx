import { useLocation } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

import Card from "../components/Card";
import PokemonIdentity from "../components/PokemonIdentity";
import PlayAudioBtn from "../components/PlayAudioBtn";

function AboutPokemon() {
    const location = useLocation();
    //linkდან იღებს პოკემონის სახელს
    const pokemonName = location.pathname.split("/");

    const { data } = useQuery(GET_POKEMON_BY_NAME_QUERY, {
        variables: { name: pokemonName[2] },
    });

    const CPvalue = data && Math.round(data.pokemonByName.maxCP / 3);
    const HPvalue = data && Math.round(data.pokemonByName.maxHP / 2);

    // თუ მონაცემები არსებობს დააბრუნებს Containerს თუ არადა რეაქტის ცარიელ ფრაგმენტს
    return data ? (
        <Container>
            <div className="aboutPokemon">
                <div className="pokemonImgWrapper">
                    <img src={data.pokemonByName.image} alt={data.pokemonByName.name} />
                    <PlayAudioBtn audioUrl={data.pokemonByName.sound} />
                </div>

                <div className="informationWrapper">
                    <PokemonIdentity
                        id={data.pokemonByName.id}
                        name={data.pokemonByName.name}
                        types={data.pokemonByName.types}
                        isFavorite={data.pokemonByName.isFavorite}
                    />

                    <div id="progresBars">
                        <div>
                            <progress id="CP" value={CPvalue} max={data.pokemonByName.maxCP} />
                            <label htmlFor="CP">CP: {CPvalue}</label>
                        </div>
                        <div>
                            <progress id="HP" value={HPvalue} max={data.pokemonByName.maxHP} />
                            <label htmlFor="HP">HP: {HPvalue}</label>
                        </div>
                    </div>
                </div>

                <div className="pokemonSizes">
                    <div>
                        <h3>Weight</h3>
                        <p>
                            {data.pokemonByName.weight.minimum} - {data.pokemonByName.weight.maximum}
                        </p>
                    </div>
                    <div>
                        <h3>Height</h3>
                        <p>
                            {data.pokemonByName.height.minimum} - {data.pokemonByName.height.maximum}
                        </p>
                    </div>
                </div>
            </div>

            <h3>Evolutions</h3>

            <div id="evolutionExamples">
                {data.pokemonByName.evolutions.map((pokemon) => (
                    <Card key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </Container>
    ) : (
        <></>
    );
}

const GET_POKEMON_BY_NAME_QUERY = gql`
    query pokemonByName($name: String!) {
        pokemonByName(name: $name) {
            id
            image
            sound
            name
            types
            isFavorite
            weight {
                minimum
                maximum
            }
            height {
                minimum
                maximum
            }
            maxCP
            maxHP
            evolutions {
                id
                image
                name
                isFavorite
            }
        }
    }
`;

export default AboutPokemon;

const Container = styled.div`
    padding: 10px;

    .aboutPokemon {
        border: 1px solid #c5c5c5;

        .pokemonImgWrapper {
            height: 300px;
            text-align: center;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .informationWrapper {
            width: 100%;
            padding: 10px;
            background-color: #f1f1f1;

            #progresBars {
                margin-top: 10px;

                div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    progress {
                        width: 90%;
                        -webkit-appearance: none;
                        appearance: none;
                        height: 10px;
                        border-radius: 10px;
                    }
                    label {
                    }
                }
            }
        }

        .pokemonSizes {
            padding-top: 10px;
            /* margin-bottom: 10px; */
            background-color: #f1f1f1;

            display: flex;
            align-items: center;

            div {
                width: 50%;
                padding: 20px 20px 20px;
                border: 1px solid #c5c5c5;
                text-align: center;

                h3 {
                    margin: 0;
                }
                p {
                    margin: 0;
                }
            }
        }
    }

    #evolutionExamples {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
`;
