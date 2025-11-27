import TestDrive from "../models/testdrive.model.js";
export const getTestDrives = async(req,res)=>{
      try {
        const { status, date } = req.query;
    
        let query = {};
            if (status) query.status = status;
            if (date) query.date = date;

        const testDrives = await TestDrive.find(query)
            .populate('vehicleId', 'make model year')
            .populate('createdBy', 'name email')
            .sort({ date: -1, time: -1 });
    
        res.json({
        success: true,
        count: testDrives.length,
        data: testDrives
        });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
}
export const getTestDrive = async(req,res)=>{
      try {
    const testDrive = await TestDrive.findById(req.params.id)
      .populate('vehicleId')
      .populate('createdBy', 'name email');
    
    if (!testDrive) {
      return res.status(404).json({ message: 'Test drive not found' });
    }
    
    res.json({
      success: true,
      data: testDrive
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const createTestDrive = async(req,res)=>{
    try {
        const testDrive = await TestDrive.create({
            ...req.body,
            createdBy: req.user._id
        });
    
        const populatedTestDrive = await TestDrive.findById(testDrive._id)
            .populate('vehicleId', 'make model year')
            .populate('createdBy', 'name email');
    
            res.status(201).json({
            success: true,
            data: populatedTestDrive
        });
    } catch (error) {
            res.status(400).json({ message: error.message });
    }
}
export const updateTestDrive = async(req,res)=>{
      try {
        const testDrive = await TestDrive.findByIdAndUpdate(
            req.params.id,
            req.body,
        { new: true, runValidators: true }
        )
        .populate('vehicleId', 'make model year')
        .populate('createdBy', 'name email');
    
        if (!testDrive) {
            return res.status(404).json({ message: 'Test drive not found' });
        }
    
        res.json({
        success: true,
        data: testDrive
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}
export const deleteTestDrive = async(req,res)=>{
      try {
        const testDrive = await TestDrive.findByIdAndDelete(req.params.id);
    
        if (!testDrive) {
            return res.status(404).json({ message: 'Test drive not found' });
        }
            res.json({
            success: true,
            message: 'Test drive deleted successfully'
        });
        } catch (error) {
            res.status(500).json({ message: error.message });
    }
}