import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/AdminSidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const location = useLocation();
  const { isAdmin, signOut } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow pt-[72px]">
        <AdminSidebar />
        <main className="flex-grow bg-gray-50 p-6">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          </div>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
