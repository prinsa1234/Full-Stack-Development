import logo from './logo.svg';
import './App.css';
import React from 'react';
import Time from './time';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';

function App() {
  return(
  <BrowserRouter>
  <Routes> 
     <Route path="/" element={<Time />} />
        <Route path="/time" element={<Time />} />
     </Routes>

   </BrowserRouter>
  );
}

export default App;
