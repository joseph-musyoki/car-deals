/*import { useState, useEffect } from 'react';
import { vehicleAPI } from '../utils/api';
import { XMarkIcon } from '@heroicons/react/24/outline';

const VehicleModal = ({ vehicle, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    status: 'in_stock',
    image: '',
    color: '',
    transmission: 'automatic',
    fuelType: 'petrol',
    mileage: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (vehicle) {
        await vehicleAPI.update(vehicle._id, formData);
      } else {
        await vehicleAPI.create(formData);
      }
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
              <input
                type="text"
                name="make"
                required
                value={formData.make}
                onChange={handleChange}
                className="input-field"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
              <input
                type="text"
                name="model"
                required
                value={formData.model}
                onChange={handleChange}
                className="input-field"
                placeholder="Camry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
              <input
                type="number"
                name="year"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="25000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="input-field"
                placeholder="Silver"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
              <input
                type="number"
                name="mileage"
                min="0"
                value={formData.mileage}
                onChange={handleChange}
                className="input-field"
                placeholder="15000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                <option value="in_stock">In Stock</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange} className="input-field">
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="input-field">
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com/car.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="input-field"
                placeholder="Additional details about the vehicle..."
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="flex-1 btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary disabled:opacity-50">
              {loading ? 'Saving...' : vehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;*/
import { useState, useEffect } from 'react';
import { vehicleAPI } from '../utils/api';
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const VehicleModal = ({ vehicle, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    status: 'in_stock',
    image: '',
    color: '',
    transmission: 'automatic',
    fuelType: 'petrol',
    mileage: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
      setImagePreview(vehicle.image);
    }
  }, [vehicle]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return formData.image;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', selectedFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/upload',
        uploadFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.imageUrl;
    } catch (error) {
      throw new Error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let imageUrl = formData.image;
      
      // Upload image if a new file is selected
      if (selectedFile) {
        imageUrl = await handleImageUpload();
      }

      const dataToSubmit = { ...formData, image: imageUrl };

      if (vehicle) {
        await vehicleAPI.update(vehicle._id, dataToSubmit);
      } else {
        await vehicleAPI.create(dataToSubmit);
      }
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
              <input
                type="text"
                name="make"
                required
                value={formData.make}
                onChange={handleChange}
                className="input-field"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
              <input
                type="text"
                name="model"
                required
                value={formData.model}
                onChange={handleChange}
                className="input-field"
                placeholder="Camry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
              <input
                type="number"
                name="year"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="25000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="input-field"
                placeholder="Silver"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
              <input
                type="number"
                name="mileage"
                min="0"
                value={formData.mileage}
                onChange={handleChange}
                className="input-field"
                placeholder="15000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                <option value="in_stock">In Stock</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange} className="input-field">
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="input-field">
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Image</label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* File Upload */}
              <div className="flex items-center space-x-3">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors">
                    <CloudArrowUpIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : 'Choose image or drag here'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Or use URL */}
              <div className="mt-3">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Or paste image URL"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="input-field"
                placeholder="Additional details about the vehicle..."
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="flex-1 btn-secondary" disabled={loading || uploading}>
              Cancel
            </button>
            <button type="submit" disabled={loading || uploading} className="flex-1 btn-primary disabled:opacity-50">
              {uploading ? 'Uploading...' : loading ? 'Saving...' : vehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;