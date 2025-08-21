// src/components/Navbar.jsx

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { Logo, LogoIcon } from '../components/Logo';

// You can replace this with your actual logo SVG or component



export const Navbar = () => {
  const iconButtonClasses = clsx(
    'relative',
    'flex',
    'items-center',
    'justify-center',
    'h-10',
    'w-10',
    'rounded-full',
    'text-gray-500',
    'hover:bg-gray-100',
    'hover:text-gray-700',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-teal-500'
  );
   

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white shadow-sm px-4 sm:px-6 py-3"
    >
      <div className="flex items-center justify-between">
        
        {/* Left Section: Logo and Brand */}
        <div className="flex items-center space-x-3">
           <div className="mt-2 px-2">
                <Logo/>
              </div>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Anything"
              className="block w-full bg-gray-100 border border-transparent rounded-lg py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white sm:text-sm transition"
            />
          </div>
        </div>

        {/* Right Section: Icons and User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className={iconButtonClasses} aria-label="Settings">
            <Settings className="h-6 w-6" />
          </button>

          <button className={iconButtonClasses} aria-label="Notifications">
            <Bell className="h-6 w-6" />
            {/* Notification dot */}
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          
          <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="relative">
              <img
                src="/dragons.JPG" // Placeholder image
                alt="User profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-transparent"
              />
              {/* Status dot */}
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
            </div>
            <ChevronDown className="h-5 w-5 text-gray-500 hidden sm:block" />
          </div>
        </div>
        
      </div>
    </motion.nav>
  );
};