import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/Sidebar';
import { Navbar } from '../components/Navbar';

import {
  IconLayoutDashboard,
  IconUsers,
  IconBuildingHospital,
  IconStethoscope,
  IconSettings,
  IconCalendarEvent
} from "@tabler/icons-react";

export default function MainLayout() {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconLayoutDashboard className="h-5 w-5" /> },
    { label: "Appointments", href: "/appointments", icon: <IconCalendarEvent className="h-5 w-5" /> },
    { label: "Doctors", href: "/doctors", icon: <IconStethoscope className="h-5 w-5" /> },
    { label: "Departments", href: "/departments", icon: <IconBuildingHospital className="h-5 w-5" /> },
    { label: "Patients", href: "/patients", icon: <IconUsers className="h-5 w-5" /> },
  ];
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50 dark:bg-neutral-800">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between">
            <div className="flex flex-1 flex-col">
             
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Settings",
                  href: "/settings",
                  icon: <IconSettings className="h-5 w-5" />,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}