import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Spacecrafts from '../pages/Spacecrafts';
import Spacecraft from '../pages/Spacecraft';
import Construction from '../pages/Construction';
import Planets from '../pages/Planets';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/spacecrafts" element={<Spacecrafts />} />
    <Route path="/spacecrafts/new" element={<Construction />} />
    <Route path="/spacecrafts/:id" element={<Spacecraft />} />
    <Route path="/planets" element={<Planets />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
