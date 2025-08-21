// src/components/Logo.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const Logo = () => {
  return (
    <a href="/" className="flex items-center space-x-2 text-lg font-semibold text-black dark:text-white">
      <div className="h-6 w-6 rounded-lg bg-teal-500" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
       HMS
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a href="/" className="flex items-center">
      <div className="h-6 w-6 rounded-lg bg-teal-500" />
    </a>
  );
};