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
    <div className="App vh-100">
      <Router>
        <Routes>
          <Route path="/" element={
            <Container fluid id="home" className="d-flex flex-column align-items-between p-0 h-100">
              <TrakkrNavbar />
                <HomePage />
              <Footer />
            </Container>
          }/>
          <Route path="/mempool" element={
            <Container fluid className="d-flex flex-column align-items-between p-0 h-100">
              <TrakkrNavbar />
              <MempoolPage />
              <Footer />
            </Container>
          }/>
          <Route path="/lightning" element={
            <Container fluid className="d-flex flex-column align-items-between p-0 h-100">
              <TrakkrNavbar />
              <LightningNetworkPage />
              <Footer />
            </Container>
          }/>
          <Route path="/*" element={
            <Container fluid className="d-flex flex-column align-items-between p-0 h-100">
              <TrakkrNavbar />
              <NotFound />
              <Footer />
            </Container>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
