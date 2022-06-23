import styled from "styled-components"

const Container = styled.div`
    top: 56px;
    position: absolute;
    text-align: center;
    height: 150px;
    width: 100%;
`

const NoRowsOverlay = () => (
    <Container className="d-flex align-items-center justify-content-center">
        <h3>No experiments available</h3>
    </Container>
)

export default NoRowsOverlay
