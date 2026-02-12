import express from 'express'
import middleware from '../middleware/authMiddleware.js'
import { changePassword } from '../controllers/settingControllers.js';

const router = express.Router();

router.put("/change-password", middleware, changePassword)






export default router