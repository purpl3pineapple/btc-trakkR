import PropTypes from "prop-types";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { SiBitcoin } from "react-icons/si";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaDatabase } from "react-icons/fa";

const TrakkrNavbar = ({ title }) => {
  return (
    <Navbar expand="lg" className="mb-5 shadow-lg bg-body-tertiary">
        <Container fluid className="mx-4 d-flex justify-content-between">
            <Navbar.Brand>
                <Link to="/" className="fs-4 fw-bold text-center text-reset text-decoration-none">
                    <IconContext.Provider value={{ color: "orange", size: 40 }}>
                        <SiBitcoin id="btc-nav-icon" className="d-inline pe-2"/>
                    </IconContext.Provider>
                    {title}
                </Link>
            </Navbar.Brand>

            <Nav className="d-flex flex-row justify-content-evenly">
                <Nav.Item className="mx-2">
                    <Link className="btn btn-info" to="/mempool">
                        <FaDatabase /> Mempool
                    </Link>
                </Nav.Item>
            </Nav>
        </Container>
    </Navbar>
  );
};

TrakkrNavbar.defaultProps = {
    title: "TrakkR"
};

TrakkrNavbar.propTypes = {
    title: PropTypes.string
};

export default TrakkrNavbar;