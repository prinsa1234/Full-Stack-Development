import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Charusat from './pages/charusat';
import Depstar from './pages/Depstar';
import CSE from './pages/Cse';
import About from './pages/About';
import Home from './pages/Home';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="container">
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <button className="toggle-button" onClick={toggleSidebar}>
            &#9776;
          </button>
          <nav className="nav-links">
            <Link to="/charusat">Charusat</Link>
            <Link to="/depstar">Depstar</Link>
            <Link to="/cse">CSE</Link>
            <Link to="/about">About Us</Link>
          </nav>
        </div>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/charusat" element={<Charusat/>} />
            <Route path="/depstar" element={<Depstar />} />
            <Route path="/cse" element={<CSE />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
