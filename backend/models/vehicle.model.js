import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Make is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['in_stock', 'sold', 'reserved'],
    default: 'in_stock'
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=No+Image'
  },
  description: {
    type: String,
    default: ''
  },
  mileage: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: ''
  },
  transmission: {
    type: String,
    enum: ['automatic', 'manual'],
    default: 'automatic'
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    default: 'petrol'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
VehicleSchema.index({ make: 1, model: 1, year: 1 });

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
export default Vehicle