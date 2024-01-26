import React, { useState } from "react";
import "../styles/SignUp.css";
import buldingImage from "../../assets/images/img_construction.png";

const SignUp = () => {
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <div className="signup__container">
        <div className="signup__inner_container">
          <div className="signup__building_image">
            <img src={buldingImage} alt="Background" />
          </div>
          <div className="signup__form_division">
            <div className="logo_header">
              <i class="fa-solid fa-user"></i>
              <h1>Nirmaanyatra</h1>
            </div>
            <div className="signup__building_input_form">
              <h1 className="signup__container_heading">Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="signup__container_input_field"
                  placeholder="Username"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="signup__container_input_field"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="signup__container_input_field"
                  placeholder="Password"
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
};
export default SignUp;
