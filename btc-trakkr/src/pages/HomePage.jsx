import Card from "react-bootstrap/Card";
import BitcoinPrice from "../components/layout/data-streams/BitcoinPrice";

const HomePage = () => {

    return (
        <Card className="text-center w-50 bg-secondary" style={{ maxHeight: "250px" }}>
            <Card.Header id="btc-price-card-header">Current BTC Price:</Card.Header>
            <Card.Body className="bg-dark">
                <BitcoinPrice />
            </Card.Body>
        </Card>
    );
};

export default HomePage;