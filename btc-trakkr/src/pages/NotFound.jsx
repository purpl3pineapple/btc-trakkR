import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { IconContext } from "react-icons";

const NotFound = () => {
  return (
    <div className="container-fluid">
        <div className="text-center">
            <h1 className="fs-1 fw-bold mb-3">Oops!</h1>
            <p className="fs-3 mb-2">404 - Page Not Found</p>
            <Link to="/" className="btn btn-lg btn-secondary d-inline-flex align-items-center">
                <IconContext.Provider value={{ color: "orange", size: 20 }}>
                    <AiTwotoneHome />
                </IconContext.Provider>
                Back to Home
            </Link>
        </div>
    </div>
  );
};

export default NotFound;