import { createContext, useState } from "react";

export const mainContext = createContext();

function MainContext({ children }) {
    const [pokemonsAmount, setPokemonsAmount] = useState(12);
    const [getFavoritePokemons, setGetFavoritePokemons] = useState(false);
    const [serchingPokemon, setSearchingPokemon] = useState("");
    const [pokemonsType, setPokemonsType] = useState("");
    const [cardsLayout, setCardsLayout] = useState("block");

    return (
        <mainContext.Provider
            value={{
                pokemonsAmount,
                setPokemonsAmount,
                getFavoritePokemons,
                setGetFavoritePokemons,
                serchingPokemon,
                setSearchingPokemon,
                pokemonsType,
                setPokemonsType,
                cardsLayout,
                setCardsLayout,
            }}
        >
            {children}
        </mainContext.Provider>
    );
}

export default MainContext;
