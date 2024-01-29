import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import AdminHome from "./components/pages/AdminHome";

import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const ProjectRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route
            path="/admin-home"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default ProjectRoutes;
