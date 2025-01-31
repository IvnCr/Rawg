import { useState } from "react";
import './index.css';
import './App.css';  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GameDetails from "./components/GameDetails";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ContactPage from "./pages/ContactPage";
import AllGamesPage from "./pages/AllGamesPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import PromotionPage from "./pages/PromotionPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/games/:id" element={<GameDetailsPage />} />
            <Route path="/games" element={<AllGamesPage />} />
            <Route path="/promotions" element={<PromotionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;