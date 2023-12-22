import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SiBitcoin } from "react-icons/si";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaDatabase } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";

const TrakkrNavbar = () => {

    return (
        <Navbar expand="md" sticky="top" className="shadow-lg bg-body-tertiary">
            <span className="ps-3 me-4">
                <Navbar.Brand className="d-flex align-items-center fs-2 me-auto fw-bold text-center text-reset text-decoration-none">
                    <Link to="/" className="text-decoration-none text-reset" role="button" tabIndex="0">
                        <IconContext.Provider value={{ color: "orange", size: 40 }}>
                            <SiBitcoin id="btc-nav-icon" className="d-inline pe-2 bs-orange-500"/>
                        </IconContext.Provider>
                        <span className="fs-1">TrakkR</span>
                    </Link>
                </Navbar.Brand>
            </span>
            <Navbar.Toggle aria-controls="trakkr-nav" />
            <Navbar.Collapse id="trakkr-nav">
                <Nav className="me-auto">
                    <Link id="mempool-nav-link" to="/mempool" role="button" tabIndex="0" className="nav-link mx-2 fw-bold trakkr-nav-link">
                        <FaDatabase />
                        <span className="ms-1">Mempool</span>
                    </Link>
                    <Link id="lightning-network-nav-link" to="/lightning" role="button" tabIndex="0" className="nav-link mx-2 fw-bold trakkr-nav-link">
                        <AiFillThunderbolt />
                        <span className="ms-1">Lightning</span>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TrakkrNavbar;