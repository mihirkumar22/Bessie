import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotLoggedIn from './pages/NotLoggedIn';
import ProtectedLayout from './components/ProtectedLayout';
import StatsBar from './pages/StatsBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/not-logged-in" element={<NotLoggedIn />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats-bar" element={<StatsBar />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
