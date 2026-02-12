import express from 'express'
import middleware from '../middleware/authMiddleware.js'
import { addSalary,getMySalary,getSalary } from '../controllers/salaryController.js';

const router = express.Router();

router.post("/add", middleware, addSalary)
router.get("/:id", middleware, getSalary)
router.get("/mySalary/:id", middleware, getMySalary)






export default router