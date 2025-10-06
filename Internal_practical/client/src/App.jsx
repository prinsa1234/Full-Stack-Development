import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';   
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo">User Authentication Portal</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link> 
          <Link to="/register" className="nav-link">Sign up</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
      </header>

      <main className="main">
        <div className="card">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} User Authentication Portal · All Rights Reserved
      </footer>
    </div>
  );
}
