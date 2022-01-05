import { useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { mainContext } from "../context/MainContext";
import { POKEMONS_QUERY } from "./CardsWrapper";

function PokemonIdentity({ id, name, types, isFavorite }) {
    const { pokemonsAmount, serchingPokemon, pokemonsType, getFavoritePokemons } = useContext(mainContext);
    const location = useLocation();

    const [getPokemonFavorite] = useMutation(GET_FAVORITE_POKEMON, {
        variables: { id },
    });
    const [unFavoritePokemon] = useMutation(UN_FAVORITE_POKEMON, {
        variables: { id: id },
        update: (proxy, result) => {
            const data = proxy.readQuery({
                query: POKEMONS_QUERY,
                variables: {
                    limit: pokemonsAmount,
                    offset: 0,
                    search: serchingPokemon,
                    type: pokemonsType,
                    isFavorite: getFavoritePokemons,
                },
            });

            // თუ favorite გვერდზეა მაშინ unlikeს დროს იშლება პოკემონი
            if (location.pathname === "/favorite-pokemons") {
                proxy.writeQuery({
                    query: POKEMONS_QUERY,
                    variables: {
                        limit: pokemonsAmount,
                        offset: 0,
                        search: serchingPokemon,
                        type: pokemonsType,
                        isFavorite: getFavoritePokemons,
                    },
                    data: {
                        pokemons: {
                            edges: [...data.pokemons.edges.filter((pokemon) => pokemon.isFavorite === true)],
                        },
                    },
                });
            }
        },
    });

    const onHeartClick = () => {
        if (isFavorite) {
            unFavoritePokemon();
        } else {
            getPokemonFavorite();
        }
    };

    return (
        <Container>
            <div>
                <h2>{name && name}</h2>
                {types && <p>{types.map((type) => type + " ")}</p>}
            </div>

            <button onClick={onHeartClick}>
                <img src={!isFavorite ? `/images/heart_border.svg` : `/images/heart.svg`} alt={name} />
            </button>
        </Container>
    );
}

const GET_FAVORITE_POKEMON = gql`
    mutation favoritePokemon($id: ID!) {
        favoritePokemon(id: $id) {
            id
            name
            isFavorite
        }
    }
`;

const UN_FAVORITE_POKEMON = gql`
    mutation unFavoritePokemon($id: ID!) {
        unFavoritePokemon(id: $id) {
            id
            name
            isFavorite
        }
    }
`;

export default PokemonIdentity;

const Container = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        text-align: start;
        h2 {
            margin: 0;
        }
        p {
            margin: 0;
        }
    }
    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        z-index: 1;

        display: flex;

        img {
            width: 100%;
            height: 100%;
        }
    }
`;
