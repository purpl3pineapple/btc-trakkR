import Card from "react-bootstrap/Card";
import BitcoinPrice from "../components/BitcoinPrice";
import Container from "react-bootstrap/Container";

const HomePage = () => {

    return (
        <Container fluid id="main" className="d-flex justify-content-center h-100 pb-5">
            <Card id="btc-price-display" className="text-center w-50 bg-secondary" style={{ 
                    maxHeight: "250px" 
                }}>
                <Card.Header id="btc-price-header" className="fs-4 fw-bold">
                    Current BTC Price:
                </Card.Header>
                <Card.Body id="btc-price-body" className="bg-dark">
                    <Card.Text id="btc-price-wrap" className="mh-100 py-5">
                        <BitcoinPrice />
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default HomePage;