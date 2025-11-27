import express from 'express';
import { protectRoute, AdminOnly } from '../middleware/auth.js';
import {  } from '../middleware/auth.js';
import { getVehicle, getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicle.controller.js';

const router = express.Router();

router.get('/', getVehicles);
router.get('/:id', getVehicle);
router.post('/', protectRoute, AdminOnly, createVehicle);
router.put('/:id', protectRoute, AdminOnly, updateVehicle);
router.delete('/:id', protectRoute, AdminOnly, deleteVehicle);


export default router