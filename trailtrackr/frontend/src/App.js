import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/DashBoard';
import HomePage from './components/HomePage';
import MainPage from './components/MainPage';
import MapPage from './components/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/mainpage' element={<MainPage/>} />
        <Route path='/map' element={<MapPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
