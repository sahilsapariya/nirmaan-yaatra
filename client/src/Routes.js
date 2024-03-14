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
import EditSite from "./components/pages/EditSite";
import AddTask from "./components/pages/AddTask";

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
            exact
            element={
              <ProtectedRoute>
                <AddSite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:siteId/add-contractor"
            exact
            element={
              <ProtectedRoute>
                <AddContractor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:siteId/:specialization/add-bill"
            exact
            element={
              <ProtectedRoute>
                <AddBill />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:siteId/:specialization/add-task"
            exact
            element={
              <ProtectedRoute>
                <AddTask />
              </ProtectedRoute>
            }
          />
          <Route path="/bill-page" element={<BillPage />} />
          <Route path="/profiles/:userId/edit" element={<EditProfile />} />
          <Route path="/site/:siteId/edit-site" element={<EditSite />} />

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default ProjectRoutes;
