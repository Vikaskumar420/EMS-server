import express from 'express'
import middleware from '../middleware/authMiddleware.js'
import { getDashboardData } from '../controllers/dashboardController.js';


const router = express.Router();

router.get('/summaryData', middleware, getDashboardData)


export default router;