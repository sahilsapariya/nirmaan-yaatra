import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./components/pages/Home";


const App = () => {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" exact index element={<Home />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
