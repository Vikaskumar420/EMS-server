import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import connectToDb from './db/db.js';
import leaveRouter from './routes/leave.js'
import dasboardRouter from './routes/dashboard.js'
import settingRouter from './routes/setting.js'

dotenv.config();

// Connect to database
connectToDb();

const app = express();

// Middlewares
// app.use(cors({
//   origin: "https://your-frontend-url.vercel.app",
//   credentials: true
// }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ems-frontend-ten-kappa.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/uploads'));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/adminDashboard", dasboardRouter);
app.use("/api/setting", settingRouter);


// Health check route
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: "API is running!" });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV || "development"} mode`);
});
