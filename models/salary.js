import mongoose, { Schema } from "mongoose";
import Employee from "./Employee.js";
import User from "./User.js";


const salarySchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number },
    deductions: { type: Number },
    netSalary: { type: Number },
    payDate: { type: Date, required: true },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() },

});

const Salary = mongoose.model('Salary',salarySchema);
export default Salary