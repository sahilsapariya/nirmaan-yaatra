import React, { useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./../styles/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let isSitePage = location.pathname.includes("/site/");

  const [isNavbarActive, setIsNavbarActive] = useState(false);

  return (
    <>
      <div className="navbar__Heading">
        <div
          className="navbar__logo_Name"
          onClick={() => navigate("/admin-home")}
        >
          Niramaanyatra
        </div>
        <div className="navbar__navigation">
          {isSitePage ? (
            <>
              <div className="navbar__button">
                <button
                  className="navbar__add_site_button"
                  onClick={() => navigate("/assign-contractor")}
                >
                  <ControlPointIcon />
                  <span className="button_text">Assign Contractor</span>
                </button>
              </div>
              <div className="navbar__button">
                <button
                  className="navbar__add_site_button"
                  onClick={() => navigate(`/add-contractor`)}
                >
                  <ControlPointIcon />
                  <span className="button_text">Add Contractor</span>
                </button>
              </div>
            </>
          ) : (
            <div className="navbar__button">
              <button
                className="navbar__add_site_button"
                onClick={() => navigate("/add-site")}
              >
                <ControlPointIcon />
                <span className="button_text">Add Site</span>
              </button>
            </div>
          )}

          <div className="navbar__profile">
            <button className="navbar__profile_button">
              <AccountCircleIcon />
            </button>
          </div>

          <div className="navbar__icon">
            {!isNavbarActive ? (
              <MenuIcon onClick={() => setIsNavbarActive(!isNavbarActive)} />
            ) : (
              <CloseIcon onClick={() => setIsNavbarActive(!isNavbarActive)} />
            )}
          </div>
        </div>
      </div>

      {isNavbarActive && (
        <div className="navbar_home_screen">
          <div className="menu_items">
            <button onClick={() => navigate("/add-site")}>Add site</button>
            <button onClick={() => navigate("/add-contractor")}>
              Add contractor
            </button>
            <button onClick={() => navigate("/assign-contractor")}>
              Assign contractor
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
