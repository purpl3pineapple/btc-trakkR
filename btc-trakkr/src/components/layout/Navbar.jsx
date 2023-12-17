import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { SiBitcoin } from "react-icons/si";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaDatabase } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import { AiFillThunderbolt } from "react-icons/ai";

const TrakkrNavbar = () => {
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