// src/layouts/AdminLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-realtor-gold"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow pt-[72px]">
        <AdminSidebar />
        <main className="flex-grow bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
