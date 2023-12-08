import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TrakkrNavbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "react-bootstrap/Container";
import MempoolPage from "./pages/MempoolPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Container fluid className="d-flex flex-column align-items-between p-0 vh-100">
          <TrakkrNavbar />
          <Container fluid id="main" className="d-flex justify-content-center h-100 pb-5">
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/mempool" element={<MempoolPage />}/>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Container>
      </Router>
    </div>
  );
}

export default App;
