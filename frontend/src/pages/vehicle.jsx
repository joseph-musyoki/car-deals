import { useState, useEffect } from 'react';
import { vehicleAPI } from '../utils/api';
import { useAuth } from "../Context/AuthContext.jsx";
import Navbar from '../components/Navbar';
import VehicleModal from '../components/VehicleModal';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filters, setFilters] = useState({ status: '', make: '', model: '' });
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.make) params.make = filters.make;
      if (filters.model) params.model = filters.model;
      
      const response = await vehicleAPI.getAll(params);
      setVehicles(response.data.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleAPI.delete(id);
        fetchVehicles();
      } catch (error) {
        alert('Error deleting vehicle');
      }
    }
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedVehicle(null);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-700';
      case 'sold': return 'bg-red-100 text-red-700';
      case 'reserved': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Inventory</h1>
            <p className="text-gray-600 mt-1">{vehicles.length} vehicles found</p>
          </div>
          
          {isAdmin() && (
            <button onClick={handleAdd} className="btn-primary flex items-center space-x-2">
              <PlusIcon className="h-5 w-5" />
              <span>Add Vehicle</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="input-field"
              >
                <option value="">All Status</option>
                <option value="in_stock">In Stock</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
              <input
                type="text"
                value={filters.make}
                onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                placeholder="Search by make..."
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                placeholder="Search by model..."
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className="card hover:shadow-lg transition-shadow">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-500">{vehicle.year}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-gray-900">KES{vehicle.price.toLocaleString()}</span>
                  </div>
                  {vehicle.color && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Color:</span>
                      <span className="text-gray-900">{vehicle.color}</span>
                    </div>
                  )}
                  {vehicle.transmission && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transmission:</span>
                      <span className="text-gray-900 capitalize">{vehicle.transmission}</span>
                    </div>
                  )}
                </div>
                
                {isAdmin() && (
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className="flex-1 btn-danger text-sm py-2 flex items-center justify-center space-x-1"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No vehicles found</p>
          </div>
        )}
      </div>

      {showModal && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchVehicles();
          }}
        />
      )}
    </div>
  );
};

export default Vehicles;