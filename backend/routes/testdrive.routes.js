import express from 'express'
import { getTestDrives, getTestDrive, createTestDrive, updateTestDrive, deleteTestDrive } from '../controllers/testdrive.controller.js';
import { protectRoute, staffOnly } from '../middleware/auth.js';
const router = express.Router();

router.get('/', protectRoute, staffOnly, getTestDrives);
router.get('/:id', protectRoute, staffOnly, getTestDrive);
router.post('/', protectRoute, staffOnly, createTestDrive);
router.put('/:id', protectRoute, staffOnly, updateTestDrive);
router.delete('/:id', protectRoute, staffOnly, deleteTestDrive);

export default router