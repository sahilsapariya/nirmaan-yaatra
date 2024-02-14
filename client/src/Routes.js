import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import AdminHome from "./components/pages/AdminHome";
import AddSite from "./components/pages/AddSite";
import AddContractor from "./components/pages/AddContractor";
import AddBill from "./components/pages/AddBill";

import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Site from "./components/pages/Site";
import SiteDetail from "./components/pages/SiteDetail";
import Error404 from "./components/pages/Error404";
import BillPage from "./components/pages/BillPage";
import EditProfile from "./components/pages/EditProfile";

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
          <Route
            path="/site/:siteId"
            element={
              <ProtectedRoute>
                <Site />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:siteId/site-detail/:specialization"
            element={
              <ProtectedRoute>
                <SiteDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-site"
            excat
            element={
              <ProtectedRoute>
                <AddSite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-contractor"
            excat
            element={
              <ProtectedRoute>
                <AddContractor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-bill"
            excat
            element={
              <ProtectedRoute>
                <AddBill />
              </ProtectedRoute>
            }
          />
          <Route path="/bill-page" element={<BillPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default ProjectRoutes;
