import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { SiBitcoin } from "react-icons/si";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaDatabase } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import { AiFillThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import sliceBTC from "../../context/BTC-price/btcPrice.slice";

const TrakkrNavbar = () => {

    const { updatePrice } = sliceBTC.actions;

    const { currentPrice } = useSelector(state => state.BTC);

    const dispatch = useDispatch();

    useWebSocket(process.env.REACT_APP_COINCAP_WS_URL, {

        onMessage: msg => {

            try {

                const current_BTC = currentPrice === null 
                ? currentPrice 
                : Number(currentPrice.replace(/,/g, ''));

                const { bitcoin } = JSON.parse(msg.data);

                const increased = current_BTC === null ? current_BTC : Number(bitcoin) > current_BTC;

                const decreased = current_BTC === null ? current_BTC : Number(bitcoin) < current_BTC;

                const dollars = bitcoin
                .split('.')[0]
                .split(/(\d{3})$/g)
                .filter(item => item !== '')
                .join(',');

                const cents = /\.[0-9]+$/.exec(bitcoin)[0];

                const BTC = dollars.concat(cents);

                dispatch(updatePrice({
                    BTC, 
                    increased, 
                    decreased, 
                    loading: false
                }));

            } catch(error){

                console.log({error});
            };
        },

        shouldReconnect: () => true,
    });

    return (
        <Navbar expand="lg" className="shadow-lg bg-body-tertiary">
            <Container fluid className="mx-4 d-flex justify-content-between">
            <Nav className="d-flex flex-row justify-content-evenly">
                <Nav.Item>
                    <Link to="/" className="btn rounded mx-2 text-decoration-none trakkr-nav-link">
                        <BsHouseFill />
                        <span className="ms-1">Home</span>
                    </Link>
                    </Nav.Item>
                </Nav>

                <Navbar.Brand className="d-flex align-items-center fs-2 mx-auto fw-bold text-center text-reset text-decoration-none">
                    <IconContext.Provider value={{ color: "orange", size: 40 }}>
                        <SiBitcoin id="btc-nav-icon" className="d-inline pe-2 bs-orange-500"/>
                    </IconContext.Provider>
                    <span className="fs-1">TrakkR</span>
                </Navbar.Brand>

                <Nav className="d-flex flex-row justify-content-evenly">
                    <Nav.Item id="mempool-nav-link">
                        <Link to="/mempool" className="btn rounded mx-2 text-decoration-none trakkr-nav-link">
                            <FaDatabase />
                            <span className="ms-1">Mempool</span>
                        </Link>
                    </Nav.Item>
                    <Nav.Item id="lightning-network-nav-link">
                        <Link to="/lightning" className="btn rounded mx-2 text-decoration-none trakkr-nav-link">
                            <AiFillThunderbolt />
                            <span className="ms-1">Lightning</span>
                        </Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default TrakkrNavbar;