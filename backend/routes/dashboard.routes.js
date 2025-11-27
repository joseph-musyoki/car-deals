import express from 'express'
import { getStats } from './../controllers/dashboard.controller.js';
import { protectRoute, staffOnly } from './../middleware/auth.js';

const router = express.Router()

router.get('/stats', protectRoute, staffOnly, getStats);

export default router

