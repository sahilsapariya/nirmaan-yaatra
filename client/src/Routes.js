import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import AdminHome from './components/pages/AdminHome';

const ProjectRoutes = () => {
return (
<Router>
    <Routes>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="admin-home" element={<AdminHome />} />
    </Routes>
</Router>
)
}

export default ProjectRoutes