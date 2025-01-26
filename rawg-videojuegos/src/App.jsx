import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AllGamesPage from "./pages/AllGamesPage";
import GameDetailsPage from "./pages/GameDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage />} />

        {/* Página con todos los juegos */}
        <Route path="/games" element={<AllGamesPage />} />

        {/* Página con los detalles de un juego específico */}
        <Route path="/games/:id" element={<GameDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
