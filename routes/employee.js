import express from 'express'
import middleware from '../middleware/authMiddleware.js'
import { addEmployee, upload,getEmployees,getEmployee,updatEmployee,getEmployeesByDepId} from '../controllers/employeeController.js';

const router = express.Router();

router.post("/add", middleware, upload.single('image'), addEmployee)
router.get("/", middleware, getEmployees)
router.get("/:id", middleware, getEmployee)
router.put("/:id", middleware, updatEmployee)
router.get("/department/:id", middleware, getEmployeesByDepId)






export default router