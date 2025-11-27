import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicle from '../models/Vehicle.js';

dotenv.config();

const sampleVehicles = [
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 28000,
    color: 'Silver',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    description: 'Brand new Toyota Camry with advanced safety features'
  },
  {
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 25000,
    color: 'Blue',
    mileage: 15000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    description: 'Low mileage Honda Civic in excellent condition'
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    price: 45000,
    color: 'White',
    mileage: 5000,
    transmission: 'automatic',
    fuelType: 'electric',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    description: 'Electric Tesla Model 3 with autopilot'
  },
  {
    make: 'Ford',
    model: 'Mustang',
    year: 2023,
    price: 55000,
    color: 'Red',
    mileage: 8000,
    transmission: 'manual',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5f5b3c43e?w=800',
    description: 'Powerful Ford Mustang GT with manual transmission'
  },
  {
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    price: 48000,
    color: 'Black',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    description: 'Luxury BMW 3 Series with premium interior'
  },
  {
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 52000,
    color: 'Silver',
    mileage: 12000,
    transmission: 'automatic',
    fuelType: 'diesel',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    description: 'Elegant Mercedes-Benz C-Class sedan'
  },
  {
    make: 'Audi',
    model: 'A4',
    year: 2024,
    price: 46000,
    color: 'Gray',
    mileage: 3000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    description: 'Sophisticated Audi A4 with Quattro AWD'
  },
  {
    make: 'Nissan',
    model: 'Altima',
    year: 2023,
    price: 27000,
    color: 'White',
    mileage: 20000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    description: 'Reliable Nissan Altima family sedan'
  },
  {
    make: 'Chevrolet',
    model: 'Malibu',
    year: 2023,
    price: 26000,
    color: 'Blue',
    mileage: 18000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'sold',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    description: 'Spacious Chevrolet Malibu with modern tech'
  },
  {
    make: 'Hyundai',
    model: 'Sonata',
    year: 2024,
    price: 29000,
    color: 'Red',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'hybrid',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800',
    description: 'Fuel-efficient Hyundai Sonata Hybrid'
  },
  {
    make: 'Kia',
    model: 'Optima',
    year: 2023,
    price: 24000,
    color: 'Black',
    mileage: 22000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    description: 'Stylish Kia Optima with great warranty'
  },
  {
    make: 'Mazda',
    model: 'Mazda6',
    year: 2023,
    price: 28000,
    color: 'Gray',
    mileage: 16000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'reserved',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
    description: 'Sporty Mazda6 with premium sound system'
  },
  {
    make: 'Volkswagen',
    model: 'Passat',
    year: 2024,
    price: 30000,
    color: 'White',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800',
    description: 'German engineering in VW Passat'
  },
  {
    make: 'Subaru',
    model: 'Legacy',
    year: 2023,
    price: 27000,
    color: 'Blue',
    mileage: 14000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800',
    description: 'All-wheel drive Subaru Legacy'
  },
  {
    make: 'Lexus',
    model: 'ES 350',
    year: 2024,
    price: 48000,
    color: 'Pearl White',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
    description: 'Luxury Lexus ES with premium comfort'
  },
  {
    make: 'Acura',
    model: 'TLX',
    year: 2023,
    price: 42000,
    color: 'Silver',
    mileage: 10000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    description: 'Performance-oriented Acura TLX'
  },
  {
    make: 'Volvo',
    model: 'S60',
    year: 2024,
    price: 44000,
    color: 'Blue',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'hybrid',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
    description: 'Safety-focused Volvo S60 Recharge'
  },
  {
    make: 'Jaguar',
    model: 'XF',
    year: 2023,
    price: 50000,
    color: 'British Racing Green',
    mileage: 8000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    description: 'Elegant British luxury in Jaguar XF'
  },
  {
    make: 'Genesis',
    model: 'G80',
    year: 2024,
    price: 54000,
    color: 'Black',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1617531653520-bd466ee81179?w=800',
    description: 'Premium Genesis G80 luxury sedan'
  },
  {
    make: 'Cadillac',
    model: 'CT5',
    year: 2023,
    price: 46000,
    color: 'Red',
    mileage: 12000,
    transmission: 'automatic',
    fuelType: 'petrol',
    status: 'sold',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    description: 'American luxury in Cadillac CT5'
  }
];

const seedVehicles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing vehicles
    await Vehicle.deleteMany({});
    console.log('Cleared existing vehicles');

    // Insert sample vehicles
    await Vehicle.insertMany(sampleVehicles);
    console.log('✅ Successfully seeded 20 vehicles');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedVehicles();