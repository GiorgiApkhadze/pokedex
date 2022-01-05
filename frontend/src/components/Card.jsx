import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { mainContext } from "../context/MainContext";
import PokemonIdentity from "./PokemonIdentity";

function Card({ pokemon }) {
    const { cardsLayout } = useContext(mainContext);

    return (
        <Container>
            <div id={cardsLayout === "row" ? "rowLayoutCard" : "blockLayoutCard"}>
                <Link to={`/about-pokemon/${pokemon && pokemon.name}`}>
                    <img
                        className="pokemonImg"
                        src={pokemon && pokemon.image}
                        alt={pokemon && pokemon.name}
                    />
                </Link>
                <div className="identityWrapper">
                    <PokemonIdentity
                        id={pokemon && pokemon.id}
                        name={pokemon && pokemon.name}
                        types={pokemon && pokemon.types}
                        isFavorite={pokemon && pokemon.isFavorite}
                    />
                </div>
            </div>
        </Container>
    );
}

export default Card;

const Container = styled.div`
    #blockLayoutCard {
        height: 315px;
        padding: 0;
        border: 1px solid #c5c5c5;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        a {
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;

            .pokemonImg {
                width: 100%;
                max-height: 235px;
                object-fit: contain;
            }
        }

        .identityWrapper {
            width: 100%;
            padding: 10px;
            background-color: #f1f1f1;
        }
    }

    #rowLayoutCard {
        height: 75px;
        padding: 0;
        border: 1px solid #c5c5c5;

        display: flex;
        justify-content: center;
        align-items: center;

        a {
            height: 100%;

            .pokemonImg {
                width: 100%;
                height: 100%;
            }
        }

        .identityWrapper {
            width: 100%;
            padding: 10px;
            background-color: #f1f1f1;
        }
    }
`;
