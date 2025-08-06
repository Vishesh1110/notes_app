import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { api } from './api';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/me').then(res => setUser(res.data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
    </Routes>
  );
}