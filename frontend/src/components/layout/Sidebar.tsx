import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Contact2, 
  BarChart3, 
  Percent, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin', group: 'Main' },
    { label: 'Queue Management', icon: Users, path: '/admin/queue', group: 'Main' },
    { label: 'Client CRM', icon: Contact2, path: '/admin/clients', group: 'Main' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics', group: 'Business' },
    { label: 'Commission', icon: Percent, path: '/admin/commission', group: 'Business' },
  ];

  return (
    <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <span className="text-[#1E3A5F] font-bold text-xl">Fresh Cuts</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">Main</div>
        {navItems.filter(i => i.group === 'Main').map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
              isActive ? "bg-slate-100 text-[#ED1C24]" : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}

        <div className="pt-6 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">Business</div>
        {navItems.filter(i => i.group === 'Business').map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
              isActive ? "bg-slate-100 text-[#ED1C24]" : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-slate-600 hover:bg-slate-50 rounded-md text-sm font-medium">
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
};