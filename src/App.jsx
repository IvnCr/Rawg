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
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";

function App() {
  return (
    <Router>
      <AnimatedBackground/>
      <Header />
      <div className="min-h-screen flex flex-col w-full rounded-lg mt-2">
        <main className="flex-grow p-4">
          <Routes key={window.location.pathname}>
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