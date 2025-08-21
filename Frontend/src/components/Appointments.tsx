// src/components/Appointments.jsx

import React, { useState } from 'react';
import { Plus, Edit, Trash2, MoreVertical } from 'lucide-react';
import clsx from 'clsx';

// Mock data to simulate real appointments
const mockAppointments = [
  {
    id: 'APT001',
    patient: {
      name: 'Liam Johnson',
      avatar: 'https://i.pravatar.cc/150?u=liamjohnson',
    },
    doctor: 'Dr. Ava Williams',
    department: 'Cardiology',
    date: '2025-08-22',
    time: '10:30 AM',
    status: 'Confirmed',
  },
  {
    id: 'APT002',
    patient: {
      name: 'Olivia Smith',
      avatar: 'https://i.pravatar.cc/150?u=oliviasmith',
    },
    doctor: 'Dr. Noah Brown',
    department: 'Neurology',
    date: '2025-08-22',
    time: '11:00 AM',
    status: 'Completed',
  },
  {
    id: 'APT003',
    patient: {
      name: 'Emma Garcia',
      avatar: 'https://i.pravatar.cc/150?u=emmagarcia',
    },
    doctor: 'Dr. James Miller',
    department: 'Dermatology',
    date: '2025-08-23',
    time: '09:00 AM',
    status: 'Confirmed',
  },
  {
    id: 'APT004',
    patient: {
      name: 'William Davis',
      avatar: 'https://i.pravatar.cc/150?u=williamdavis',
    },
    doctor: 'Dr. Sophia Wilson',
    department: 'Pediatrics',
    date: '2025-08-23',
    time: '02:00 PM',
    status: 'Cancelled',
  },
   {
    id: 'APT005',
    patient: {
      name: 'Isabella Martinez',
      avatar: 'https://i.pravatar.cc/150?u=isabellamartinez',
    },
    doctor: 'Dr. Ava Williams',
    department: 'Cardiology',
    date: '2025-08-24',
    time: '01:15 PM',
    status: 'Confirmed',
  },
];

// A reusable component for status badges
const StatusBadge = ({ status }) => {
  const baseClasses = 'px-2.5 py-0.5 text-xs font-medium rounded-full';
  const statusClasses = {
    Confirmed: 'bg-green-100 text-green-800',
    Completed: 'bg-blue-100 text-blue-800',
    Cancelled: 'bg-red-100 text-red-800',
  };
  return (
    <span className={clsx(baseClasses, statusClasses[status])}>
      {status}
    </span>
  );
};

export const Appointments = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const tabs = ['Upcoming', 'Past', 'Cancelled'];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Appointments
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all patient appointments in one place.
          </p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
          <Plus size={18} />
          Add Appointment
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Patient Name</th>
                <th scope="col" className="px-6 py-3">Doctor</th>
                <th scope="col" className="px-6 py-3">Date & Time</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAppointments.map((apt) => (
                <tr key={apt.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.patient.avatar}
                        alt={apt.patient.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">{apt.patient.name}</div>
                        <div className="text-xs text-gray-500">{apt.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div>{apt.doctor}</div>
                      <div className="text-xs text-gray-500">{apt.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div>
                      <div>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <div className="text-xs text-gray-500">{apt.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};