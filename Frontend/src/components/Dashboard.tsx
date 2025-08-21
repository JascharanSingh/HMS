// src/components/Dashboard.jsx
import React from 'react';

export const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl font-bold text-black dark:text-white">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300">Overview of your hospital's activity.</p>
      {/* Your dashboard content, charts, and tables will go here */}
    </div>
  );
};