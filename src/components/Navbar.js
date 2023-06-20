import React from "react";
import { Link } from "react-router-dom";
import "./Navstyle.css";
const Navbar = (props) => {
  return (
    <div>
      {/* In the nav tag in line 9 we earlier used class name "bg-body-tertiary " */}
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyNewsApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-Link categories" to="/">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Link categories" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Link categories" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Link categories" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Link categories" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Link categories" to="/technology">
                  Technology
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-Link categories" to="/business">
                  Business
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
