import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Dashboard } from './components/Dashboard';
import { Appointments } from './components/Appointments';
import './App.css'; // Ensure your styles are imported

// Create dummy components for other pages for now
const Doctors = () => <div className="p-10 text-2xl font-bold">Doctors Page</div>;
const Patients = () => <div className="p-10 text-2xl font-bold">Patients Page</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="patients" element={<Patients />} />
        {/* Define other nested routes here */}
      </Route>
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}

export default App;