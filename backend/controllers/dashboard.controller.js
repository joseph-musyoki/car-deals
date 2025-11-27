import Vehicle from "../models/vehicle.model.js";
import TestDrive from "../models/testdrive.model.js";
export const getStats = async(req,res)=>{
    try {
    // Total vehicles
    const totalVehicles = await Vehicle.countDocuments();
    
    // Vehicles by status
    const inStockVehicles = await Vehicle.countDocuments({ status: 'in_stock' });
    const soldVehicles = await Vehicle.countDocuments({ status: 'sold' });
    const reservedVehicles = await Vehicle.countDocuments({ status: 'reserved' });
    
    // Total test drives
    const totalTestDrives = await TestDrive.countDocuments();
    const scheduledTestDrives = await TestDrive.countDocuments({ status: 'scheduled' });
    const completedTestDrives = await TestDrive.countDocuments({ status: 'completed' });
    
    // Total inventory value
    const vehicles = await Vehicle.find({ status: 'in_stock' });
    const totalInventoryValue = vehicles.reduce((sum, vehicle) => sum + vehicle.price, 0);
    
    // Recent test drives
    const recentTestDrives = await TestDrive.find()
      .populate('vehicleId', 'make model year')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Top selling makes
    const soldByMake = await Vehicle.aggregate([
      { $match: { status: 'sold' } },
      { $group: { _id: '$make', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Monthly sales (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlySales = await Vehicle.aggregate([
      {
        $match: {
          status: 'sold',
          updatedAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$updatedAt' },
            month: { $month: '$updatedAt' }
          },
          count: { $sum: 1 },
          totalRevenue: { $sum: '$price' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalVehicles,
          inStockVehicles,
          soldVehicles,
          reservedVehicles,
          totalTestDrives,
          scheduledTestDrives,
          completedTestDrives,
          totalInventoryValue
        },
        recentTestDrives,
        soldByMake,
        monthlySales
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}