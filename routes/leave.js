import express from 'express'
import middleware from '../middleware/authMiddleware.js'
import { addLeave,getLeave, getLeaves, getLeavesDetail, updateLeave } from '../controllers/leaveController.js';

const router = express.Router();

router.post("/add", middleware, addLeave);
router.get("/:id", middleware, getLeave);
router.get("/", middleware, getLeaves);
router.get("/detail/:id", middleware, getLeavesDetail);
router.put("/:id", middleware, updateLeave);





export default router