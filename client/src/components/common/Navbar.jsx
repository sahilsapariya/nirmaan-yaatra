import React from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./../styles/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let isSitePage = location.pathname === "/site/DDU";

  return (
    <>
      <div className="navbar__Heading">
        <div className="navbar__logo_Name">Niramaanyatra</div>
        <div className="navbar__navigation">
          {isSitePage && (
            <div className="navbar__button">
              <button
                className="navbar__add_site_button"
                onClick={() => navigate("/add-contractor")}
              >
                <ControlPointIcon />
                <span className="button_text">Add Contractor</span>
              </button>
            </div>
          )}

          <div className="navbar__button">
            <button
              className="navbar__add_site_button"
              onClick={() => navigate("/add-site")}
            >
              <ControlPointIcon />
              <span className="button_text">Add Site</span>
            </button>
          </div>
          <div className="navbar__profile">
            <button className="navbar__profile_button">
              <AccountCircleIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
