import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import QueryPage from "./components/query";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/query" element={<QueryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
