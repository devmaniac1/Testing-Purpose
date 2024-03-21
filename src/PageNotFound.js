
import { Link } from "react-router-dom";
import "./PageNotFound.css";
import ErrorAstro from "../src/images/ErrorAstro.png"

function PageNotFound() {
  return (
    <div className="container">
      <div className="image-container">
        </div> 
      <div className="error">
        <h1>OOPS!</h1>
        <p>Error 404: Page Not Found</p>
      </div>
      <div className="return-button">
        <Link to="/">
          <button>Back to home</button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
