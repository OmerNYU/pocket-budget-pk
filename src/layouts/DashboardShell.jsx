import React from 'react';
import Navbar from '../components/ui/Navbar.jsx';
import Sidebar from '../components/ui/Sidebar.jsx';
import Footer from '../components/ui/Footer.jsx';

export default function DashboardShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="px-4">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
