import { useState, useEffect } from 'react';
import { testDriveAPI, vehicleAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import TestDriveModal from '../components/TestDriveModal';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const TestDrives = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestDrive, setSelectedTestDrive] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const [testDrivesRes, vehiclesRes] = await Promise.all([
        testDriveAPI.getAll(params),
        vehicleAPI.getAll({ status: 'in_stock' })
      ]);
      setTestDrives(testDrivesRes.data.data);
      setVehicles(vehiclesRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this test drive?')) {
      try {
        await testDriveAPI.delete(id);
        fetchData();
      } catch (error) {
        alert('Error deleting test drive');
      }
    }
  };

  const handleEdit = (testDrive) => {
    setSelectedTestDrive(testDrive);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedTestDrive(null);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Test Drives</h1>
            <p className="text-gray-600 mt-1">{testDrives.length} test drives found</p>
          </div>
          
          <button onClick={handleAdd} className="btn-primary flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>Schedule Test Drive</span>
          </button>
        </div>

        {/* Filter */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === '' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('scheduled')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'scheduled' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'cancelled' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Test Drives List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : testDrives.length > 0 ? (
          <div className="space-y-4">
            {testDrives.map((testDrive) => (
              <div key={testDrive._id} className="card hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testDrive.customerName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(testDrive.status)}`}>
                        {testDrive.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Vehicle:</span>
                        <p className="font-medium text-gray-900">
                          {testDrive.vehicleId?.make} {testDrive.vehicleId?.model} ({testDrive.vehicleId?.year})
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p className="font-medium text-gray-900">{testDrive.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <p className="font-medium text-gray-900">{testDrive.time}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <p className="font-medium text-gray-900">{testDrive.customerPhone}</p>
                      </div>
                    </div>
                    
                    {testDrive.customerEmail && (
                      <p className="text-sm text-gray-600 mt-2">
                        Email: {testDrive.customerEmail}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2 mt-4 md:mt-0 md:ml-4">
                    <button
                      onClick={() => handleEdit(testDrive)}
                      className="btn-secondary py-2 px-4 text-sm flex items-center space-x-1"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(testDrive._id)}
                      className="btn-danger py-2 px-4 text-sm flex items-center space-x-1"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No test drives found</p>
          </div>
        )}
      </div>

      {showModal && (
        <TestDriveModal
          testDrive={selectedTestDrive}
          vehicles={vehicles}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
};

export default TestDrives;