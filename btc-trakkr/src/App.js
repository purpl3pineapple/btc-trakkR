import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TrakkrNavbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "react-bootstrap/Container";
import MempoolPage from "./pages/MempoolPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import RainingBTC from "./images/raining-btc.jpg";
import "../src/style.scss";
import LightningNetworkPage from "./pages/LightningNetworkPage";


function App() {
  return (
    <div className="App d-flex flex-column position-relative">
      <Router>
        <Routes>
          <Route path="/" element={<>
            <TrakkrNavbar />
            <Container fluid id="home" className="d-flex flex-grow-1 flex-column align-items-between p-0 h-100">
              <HomePage />
            </Container>
            <Footer />
          </>}/>
          <Route path="/mempool" element={<>
            <TrakkrNavbar />
            <Container fluid className="d-flex flex-grow-1 flex-column align-items-between p-0 h-100">
              <MempoolPage />
            </Container>
            <Footer />
          </>}/>
          <Route path="/lightning" element={<>
            <TrakkrNavbar />
            <Container fluid className="d-flex flex-grow-1 flex-column align-items-between p-0 h-100">
              <LightningNetworkPage />
            </Container>
            <Footer />
          </>}/>
          <Route path="/*" element={<>
            <TrakkrNavbar />
            <Container fluid className="d-flex flex-grow-1 flex-column align-items-between p-0 h-100">
              <NotFound />
            </Container>
            <Footer />
          </>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
