import express from 'express'
import { login, verify, updateProfileImage } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import { upload } from '../controllers/employeeController.js';


const router = express.Router();

router.post("/login", login);
router.get("/verify", authMiddleware, verify);
router.put("/update-profile-image/:id",authMiddleware, upload.single("profileImage"), updateProfileImage)

export default router;