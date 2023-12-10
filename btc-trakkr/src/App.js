import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TrakkrNavbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "react-bootstrap/Container";
import MempoolPage from "./pages/MempoolPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import { BtcPriceProvider } from "./context/BTC-price/btc-price-context";
import "../src/style.scss";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={
            <Container fluid className="d-flex flex-column align-items-between p-0 vh-100" style={{
              backgroundImage: `url(/images/raining-btc.jpg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
              <TrakkrNavbar />
              <BtcPriceProvider>
                <HomePage />
              </BtcPriceProvider>
              <Footer />
            </Container>
          }/>
          <Route path="/mempool" element={
            <Container fluid className="d-flex flex-column align-items-between p-0 vh-100">
              <TrakkrNavbar />
              <MempoolPage />
              <Footer />
            </Container>
          }/>
          <Route path="/*" element={
            <Container fluid className="d-flex flex-column align-items-between p-0 vh-100">
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
