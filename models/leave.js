import mongoose, { Schema } from "mongoose";
import User from "./User.js";
import Employee from "./Employee.js";
import Department from "./department.js";


const leaveSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employeeId: {type: mongoose.Schema.Types.ObjectId,ref: "Employee"},
  department: {type: mongoose.Schema.Types.ObjectId,ref: "Department"},
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;