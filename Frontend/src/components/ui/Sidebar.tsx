import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { IconChevronLeft } from '@tabler/icons-react';

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export const Sidebar = ({ open, setOpen, children }: SidebarProps) => {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-lg dark:bg-neutral-900 md:relative md:translate-x-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    <div className="hidden md:flex items-center justify-center ml-1">
  <button
    onClick={() => setOpen(!open)}
    className="p-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full border dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
  >
    <motion.div animate={{ rotate: open ? 0 : 180 }}>
      <IconChevronLeft size={16} />
    </motion.div>
  </button>
</div>
    </>
  );
};

type SidebarBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const SidebarBody = ({ children, className }: SidebarBodyProps) => {
  return (
    <div className={clsx("flex h-full flex-col p-4", className)}>
      {children}
    </div>
  );
};

type SidebarLinkProps = {
  link: {
    href: string;
    icon?: React.ReactNode;
    label: string;
  };
};

export const SidebarLink = ({ link }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === link.href;

  return (
    <Link
      to={link.href}
      className={clsx(
        "flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-neutral-600 transition-colors duration-200 hover:bg-teal-50 hover:text-teal-600 dark:text-neutral-300 dark:hover:bg-teal-900/50 dark:hover:text-teal-400",
        isActive && "bg-teal-100 font-semibold text-teal-700 dark:bg-teal-900/60 dark:text-teal-300"
      )}
    >
      {link.icon}
      <span className="text-sm">{link.label}</span>
    </Link>
  );
};