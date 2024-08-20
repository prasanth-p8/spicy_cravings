import { Link } from "react-router-dom";

import "./index.scss";

function NotFound() {
  return (
    <div className="not-found-main-container">
      <div className="not-found-sub-container">
        <img
          src="https://res.cloudinary.com/dlefoxknm/image/upload/v1723305853/NotFoundImg_nnbrbo.jpg"
          alt="not found"
          className="not-found-image"
        />
        <h1>Whoops, nothing delicious to find here.</h1>
        <p>
          Seems like the page you were trying to find is no longer available.
        </p>
        <Link to="/">
          <button className="button">GO HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
