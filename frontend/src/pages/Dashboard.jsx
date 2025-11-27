import { useState, useEffect } from 'react';
import { dashboardAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import {
  TruckIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Vehicles',
      value: stats?.summary.totalVehicles || 0,
      icon: TruckIcon,
      color: 'bg-blue-500',
      subtext: `${stats?.summary.inStockVehicles || 0} in stock`
    },
    {
      title: 'Vehicles Sold',
      value: stats?.summary.soldVehicles || 0,
      icon: ChartBarIcon,
      color: 'bg-green-500',
      subtext: `${stats?.summary.reservedVehicles || 0} reserved`
    },
    {
      title: 'Test Drives',
      value: stats?.summary.totalTestDrives || 0,
      icon: ClipboardDocumentCheckIcon,
      color: 'bg-purple-500',
      subtext: `${stats?.summary.scheduledTestDrives || 0} scheduled`
    },
    {
      title: 'Inventory Value',
      value: `KES${(stats?.summary.totalInventoryValue || 0).toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
      subtext: 'Total value'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Test Drives */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Drives</h3>
            <div className="space-y-3">
              {stats?.recentTestDrives?.length > 0 ? (
                stats.recentTestDrives.map((testDrive) => (
                  <div key={testDrive._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{testDrive.customerName}</p>
                      <p className="text-sm text-gray-500">
                        {testDrive.vehicleId?.make} {testDrive.vehicleId?.model}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">{testDrive.date}</p>
                      <p className="text-xs text-gray-500">{testDrive.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No test drives scheduled</p>
              )}
            </div>
          </div>

          {/* Top Selling Makes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Makes</h3>
            <div className="space-y-3">
              {stats?.soldByMake?.length > 0 ? (
                stats.soldByMake.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{item._id}</span>
                    <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                      {item.count} sold
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No sales data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Sales Chart */}
        {stats?.monthlySales?.length > 0 && (
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={(item) => `${item._id.month}/${item._id.year}`}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" name="Vehicles Sold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;