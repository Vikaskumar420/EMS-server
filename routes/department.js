import express from 'express'
import middleware from '../middleware/authMiddleware.js'
import { addDepartment,getDepartments,getDepartment,updatDepartment,deleteDepartment } from '../controllers/departmentControler.js';

const router = express.Router();

router.post("/add", middleware, addDepartment)
router.get("/", middleware, getDepartments)
router.get("/:id", middleware, getDepartment)
router.put("/:id", middleware, updatDepartment)
router.delete("/:id", middleware, deleteDepartment)






export default router