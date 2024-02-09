import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem"
      }}
    >
      <h1>Oops! page not found</h1>
      <button
        onClick={() => navigate("/admin-home")}
        style={{
          padding: "1rem 2rem",
          background: "#14ce00",
          color: "#fff",
          borderRadius: "5px",
          fontSize: "large",
          cursor: "pointer"
        }}
      >
        Back to home
      </button>
    </div>
  );
};

export default Error404;
