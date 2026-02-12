import Employee from "../models/Employee.js";
import Salary from "../models/salary.js";


const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const totalSalary =
            Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

        const newSalary = new Salary({
            employeeId,
            userId: employee.userId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: "salary add server error" });
    }
};

// This is for admin
const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');

        return res.status(200).json({ success: true, salary });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Salary get server error" })
    }

}


// This is for employee
const getMySalary = async (req, res) => {
    try {
        const userId = req.user._id;
        const salary = await Salary.find({ userId })
            .populate("employeeId", "employeeId");
        return res.status(200).json({ success: true, salary });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Salary get server error" })
    }

}




export { addSalary, getSalary, getMySalary }