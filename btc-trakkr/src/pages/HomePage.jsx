import Card from "react-bootstrap/Card";
import BitcoinPrice from "../components/BitcoinPrice";

const HomePage = () => {

    return (
        <main id="main" className="container-fluid mt-5 d-flex justify-content-center flex-grow-1 pb-5">
            <Card id="btc-price-display" className="text-center w-50 bg-dark" style={{ 
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
        </main>
    );
};

export default HomePage;