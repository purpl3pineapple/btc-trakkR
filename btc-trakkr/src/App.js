import { BrowserRouter as Router } from "react-router-dom";
import TrakkrNavbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Router>
        <Container fluid className="d-flex flex-column align-items-between p-0 vh-100">
          <TrakkrNavbar />
          <Container fluid id="main" className="pb-5"> Content </Container>
          <Footer />
        </Container>
      </Router>
    </div>
  );
}

export default App;
