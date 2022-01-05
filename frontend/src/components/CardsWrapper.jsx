import { useContext, useEffect, useCallback, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { mainContext } from "../context/MainContext";
import Card from "./Card";

function CardsWrapper() {
    const location = useLocation();
    const loader = useRef();
    const {
        pokemonsAmount,
        setPokemonsAmount,
        getFavoritePokemons,
        serchingPokemon,
        pokemonsType,
        cardsLayout,
    } = useContext(mainContext);
    //graphQL
    const { data, refetch } = useQuery(POKEMONS_QUERY, {
        variables: {
            limit: pokemonsAmount,
            offset: 0,
            search: serchingPokemon,
            type: pokemonsType,
            isFavorite: getFavoritePokemons,
        },
    });

    //infinite scroll
    // FIXME როცა კიდევ ტვირთავს პოკემონებს ხელახალ fetchს აკეთებს და გვერდის თავში გვაგდებს
    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                setPokemonsAmount((prev) => prev + 12);
            }
        },
        [setPokemonsAmount]
    );

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 1,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <Container>
            <div id={cardsLayout === "row" ? "rowLayout" : "blockLayout"}>
                {data && data.pokemons.edges.map((pokemon) => <Card key={pokemon.id} pokemon={pokemon} />)}
            </div>
            <div ref={loader} />
        </Container>
    );
}

export const POKEMONS_QUERY = gql`
    query pokemons($limit: Int, $offset: Int, $search: String, $type: String, $isFavorite: Boolean) {
        pokemons(
            query: {
                limit: $limit
                offset: $offset
                search: $search
                filter: { type: $type, isFavorite: $isFavorite }
            }
        ) {
            edges {
                id
                image
                name
                types
                isFavorite
            }
        }
    }
`;

export default CardsWrapper;

const Container = styled.div`
    #rowLayout {
        width: 100%;
        padding: 10px;

        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 10px;
    }

    #blockLayout {
        width: 100%;
        padding: 10px;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
`;
