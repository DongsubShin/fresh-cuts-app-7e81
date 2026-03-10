import React from 'react';
import { useDashboardStats, useQueue } from '../../hooks/useDashboard';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: queue, isLoading: queueLoading } = useQueue();

  const statCards = [
    { label: "Today's Revenue", value: `$${stats?.todayRevenue || 0}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Active Queue", value: stats?.activeQueueCount || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Appointments", value: stats?.pendingAppointments || 0, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Total Clients", value: stats?.totalClients || 0, icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Business Overview</h1>
        <p className="text-slate-500">Welcome back, here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bg} ${card.color} p-2 rounded-lg`}>
                <card.icon size={20} />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{card.value}</div>
            <div className="text-sm text-slate-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Current Queue</h2>
            <button className="text-sm text-[#ED1C24] font-medium">Manage Queue</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Service</th>
                  <th className="px-6 py-3 font-semibold">Wait Time</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue?.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.clientName}</td>
                    <td className="px-6 py-4 text-slate-600">{item.serviceName}</td>
                    <td className="px-6 py-4 text-slate-600">{item.estimatedWaitTime} min</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!queue?.length && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">No active clients in queue</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-[#ED1C24] text-white rounded-lg font-semibold hover:bg-[#c4161d] transition-colors">
              Add Walk-In
            </button>
            <button className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
              New Appointment
            </button>
            <button className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};