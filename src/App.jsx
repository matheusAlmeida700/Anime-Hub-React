import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FavoritesList from "./components/FavoritesList";
import TopList from "./components/TopList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/top" />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/top" element={<TopList />} />
      </Routes>
    </Router>
  );
};

export default App;
