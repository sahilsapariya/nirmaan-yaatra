import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../config";
import { clearState } from "../app/store";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseurl}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();

    if (data) {
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));

      const response2 = await fetch(`${baseurl}/api/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
        },
      });

      let data2 = await response2.json();

      if (data2) {
        localStorage.setItem("user", JSON.stringify(data2));
      }

      navigate("/home");
      window.location.reload();
    } else {
      alert("Something went wrong while logging in the user!");
    }
  };

  let logoutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    setAuthTokens(null);
    setUser(null);
    dispatch(clearState());

    navigate("/sign-in");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
