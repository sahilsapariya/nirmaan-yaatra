import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';

const ProjectRoutes = () => {
return (
<Router>
    <Routes>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
    </Routes>
</Router>
)
}

export default ProjectRoutes