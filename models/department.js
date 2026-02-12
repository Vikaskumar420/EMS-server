import mongoose from 'mongoose'
import Employee from './Employee.js'
import Salary from './salary.js'
import Leave from './leave.js'
import User from './User.js'

const departmentSchema = new mongoose.Schema({
    dept_name:{type: String, required:true},
    description:{type: String,},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
});

departmentSchema.pre("deleteOne", {document: true, query: false}, async function() {
    try {
        const employees = await Employee.find({department: this._id});
        const empIds = employees.map(emp => emp._id);
        const userIds = employees.map(emp => emp.userId);

        await Employee.deleteMany({department: this._id});
        await Leave.deleteMany({employeeId: {$in: empIds}});
        await Salary.deleteMany({employeeId: {$in: empIds}});
        await User.deleteMany({ _id: { $in: userIds } });
    } catch (error) {
        console.log(error);
        
    }
})

const Department = mongoose.model("Department",departmentSchema);
export default Department;