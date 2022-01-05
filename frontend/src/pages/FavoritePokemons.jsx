import styled from "styled-components";
import CardsWrapper from "../components/CardsWrapper";
import ControlBar from "../components/ControlBar";

function FavoritePokemons() {
    return (
        <Container>
            <ControlBar />
            <CardsWrapper />
        </Container>
    );
}

export default FavoritePokemons;

const Container = styled.div``;
