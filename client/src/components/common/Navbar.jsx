import React, { useState } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./../styles/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onContractorTape } from "../../features/global/globalSlice";
import PopupContractorCard from "./PopupContractorCard";

const Navbar = ({
  siteId,
  billButton,
  addSite,
  assignContractor,
  addContractor,
  specialization,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let isSitePage = location.pathname.includes("/site/");

  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isProfileDropdownActive, setIsProfileDropdownActive] = useState(false);

  const handleProfileClick = () => {
    setIsProfileDropdownActive(!isProfileDropdownActive);
  };

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
          {billButton && (
            <>
              <div className="navbar__button">
                <button
                  className="navbar__add_site_button"
                  onClick={() =>
                    navigate(`/site/${siteId}/${specialization}/add-bill`)
                  }
                >
                  <ControlPointIcon />
                  <span className="button_text">Add Bill</span>
                </button>
              </div>
              <div className="navbar__button">
                <button
                  className="navbar__add_site_button"
                  onClick={() =>
                    navigate(`/site/${siteId}/${specialization}/add-task`)
                  }
                >
                  <ControlPointIcon />
                  <span className="button_text">Add Task</span>
                </button>
              </div>
            </>
          )}

          {addSite && (
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

          {assignContractor && (
            <div className="navbar__button">
              <button
                className="navbar__add_site_button"
                onClick={() => navigate("/assign-contractor")}
              >
                <ControlPointIcon />
                <span className="button_text">Assign Contractor</span>
              </button>
            </div>
          )}

          {addContractor && (
            <div className="navbar__button">
              <button
                className="navbar__add_site_button"
                onClick={() => navigate(`/site/${siteId}/add-contractor`)}
              >
                <ControlPointIcon />
                <span className="button_text">Add Contractor</span>
              </button>
            </div>
          )}

          <div className="navbar__profile">
            <button
              className="navbar__profile_button"
              onClick={handleProfileClick}
            >
              <AccountCircleIcon />
            </button>
            {isProfileDropdownActive && (
              <div className="profile-dropdown">
                <button onClick={() => dispatch(onContractorTape())}>
                  My Profile
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/profiles/${
                        JSON.parse(localStorage.getItem("user")).id
                      }/edit`
                    )
                  }
                >
                  Edit Profile
                </button>
                <button onClick={() => navigate("/sign-in")}>Logout</button>
              </div>
            )}
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
