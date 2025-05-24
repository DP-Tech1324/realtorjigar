// src/components/AdminSidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Building,
  Users,
  Upload,
  MessageSquare,
  BarChart3,
  Megaphone
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const links = [
    { to: '/admin', label: 'Dashboard', icon: Home },
    { to: '/manage-properties', label: 'Properties', icon: Building },
    { to: '/admin/images', label: 'Images', icon: Upload },
    { to: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/marketing', label: 'Marketing', icon: Megaphone },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r hidden lg:block">
      <div className="h-full p-4 space-y-6">
        <div className="text-xl font-bold text-realtor-navy mb-4">Admin Menu</div>
        <ul className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  'flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-realtor-gold/10 transition-colors',
                  location.pathname.startsWith(to)
                    ? 'bg-realtor-gold/20 text-realtor-navy font-semibold'
                    : 'text-gray-700'
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
