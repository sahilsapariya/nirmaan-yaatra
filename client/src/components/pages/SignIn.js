import React, { useContext } from "react";
import "../styles/Auth.scss";
import buldingImage from "../../assets/images/img_construction.png";
import AuthContext from "../../context/AuthContext";

function SignIn() {
  let { loginUser } = useContext(AuthContext);

  return (
    <>
      <div className="signup__container">
        <div className="signup__inner_container">
          <div className="signup__building_image">
            <img src={buldingImage} alt="Background" />
          </div>
          <div className="signup__form_division">
            <div className="logo_header">
              <i className="fa-solid fa-user"></i>
              <h1>Nirmaanyatra</h1>
            </div>

            <div className="signup__building_input_form">
              <h1 className="signup__container_heading">Sign In</h1>
              <form onSubmit={loginUser} method="POST">
                <input
                  type="text"
                  name="username"
                  className="signup__container_input_field"
                  placeholder="admin"
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="signup__container_input_field"
                  placeholder="admin@123"
                  required
                />
                <button className="button_property" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
