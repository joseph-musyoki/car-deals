import Vehicle from "../models/vehicle.model.js"
export const getVehicles = async(req,res)=>{
      try {
        const { status, make, model, minPrice, maxPrice } = req.query;
    
        let query = {};
    
        if (status) query.status = status;
        if (make) query.make = new RegExp(make, 'i');
        if (model) query.model = new RegExp(model, 'i');
        if (minPrice || maxPrice) {
            query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
    
        res.json({
            success: true,
            count: vehicles.length,
            data: vehicles
        });
  } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
export const getVehicle = async(req,res)=>{
      try {
        const vehicle = await Vehicle.findById(req.params.id);
    
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
    
            res.json({
            success: true,
            data: vehicle
        });
  } catch (error) {
            res.status(500).json({ message: error.message });
  }
    
}
export const createVehicle = async(req,res)=>{
    try {
        const vehicle = await Vehicle.create(req.body);
    
            res.status(201).json({
            success: true,
            data: vehicle
        });
  } catch (error) {
        res.status(400).json({ message: error.message });
  }
}; 
export const updateVehicle = async(req,res)=>{
      try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
        { new: true, runValidators: true }
        );
    
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
    
            res.json({
            success: true,
            data: vehicle
        });
  } catch (error) {
        res.status(400).json({ message: error.message });
  }
}
export const deleteVehicle = async(req,res)=>{
      try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
    
        res.json({
        success: true,
        message: 'Vehicle deleted successfully'
        });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
}