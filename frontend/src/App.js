import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllPokemon from "./pages/AllPokemon";
import FavoritePokemons from "./pages/FavoritePokemons";
import AboutPokemon from "./pages/AboutPokemon";

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AllPokemon />} />
                    <Route path="/favorite-pokemons" element={<FavoritePokemons />} />
                    <Route path="/about-pokemon/:name" element={<AboutPokemon />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
const Container = styled.div``;
