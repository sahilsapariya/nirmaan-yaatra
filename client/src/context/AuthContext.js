import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../config";

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
      navigate("/admin-home");
    } else {
      alert("Something went wrong while logging in the user!");
    }
  };

  let logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
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
