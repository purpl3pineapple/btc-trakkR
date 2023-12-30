import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import TrakkrNavbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "react-bootstrap/Container";
import MempoolPage from "./pages/MempoolPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import LightningNetworkPage from "./pages/LightningNetworkPage";
import "../src/style.scss";


function App() {

  const mempoolBlocks = useSelector((state) => state.mempool.blocks);

  const { newBlockDetected, newest } = mempoolBlocks;

  const newestBlock = mempoolBlocks.loading
    ? null
    : newest;

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
            <Container id="mempool-page" fluid className="d-flex h-auto app-page px-0">
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
      <ToastContainer position="top-center" className="mt-5">
        <Toast
          show={newBlockDetected}
          autohide
          delay={15000}
          bg="info"
        >
          <Toast.Header>
            <strong className="me-auto">New Block Detected!</strong>
            <small>{newestBlock === null ? 'Loading...' : newestBlock.timestamp}</small>
          </Toast.Header>
          <Toast.Body>{newestBlock === null ? 'Loading...' : newestBlock.id}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
