import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';

const ProjectRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUp />} />
            </Routes>
        </Router>
    )
}

export default ProjectRoutes