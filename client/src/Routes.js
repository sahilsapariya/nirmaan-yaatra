import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import AdminHome from "./components/pages/AdminHome";
import AddSite from "./components/pages/AddSite";


import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const ProjectRoutes = () => {
<<<<<<< Updated upstream
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
=======
return (
<Router>
  <AuthProvider>
    <Routes>
      <Route path="/sign-up" element={ <ProtectedRoute>
        <SignUp />
        </ProtectedRoute>
        }
        />
        <Route path="/sign-in" exact element={<SignIn />} />
        <Route path="/admin-home" element={ <ProtectedRoute>
          <AdminHome />
          </ProtectedRoute>
          }
>>>>>>> Stashed changes
          />

          <Route path="/*" element={<SignIn />} />

          <Route path="/add-site" excat element={<AddSite />} />
    </Routes>
  </AuthProvider>
</Router>
);
};

export default ProjectRoutes;