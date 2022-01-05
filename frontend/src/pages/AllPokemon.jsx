import styled from "styled-components";

import CardsWrapper from "../components/CardsWrapper";
import ControlBar from "../components/ControlBar";

function AllPokemon() {
    return (
        <Container>
            <ControlBar />
            <CardsWrapper />
        </Container>
    );
}

export default AllPokemon;

const Container = styled.div``;
