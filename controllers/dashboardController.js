import Department from "../models/department.js";
import Employee from "../models/Employee.js"
import Leave from "../models/leave.js";


const getDashboardData = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalSalaryAgg = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
    ]);
    const totalSalary = totalSalaryAgg[0]?.totalSalary || 0;

    const leaveApplied = await Leave.countDocuments();
    const leaveApproved = await Leave.countDocuments({ status: "Approved" });
    const leavePending = await Leave.countDocuments({ status: "Pending" });
    const leaveRejected = await Leave.countDocuments({ status: "Rejected" });

    return res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalDepartments,
        totalSalary,
        leaveApplied,
        leaveApproved,
        leavePending,
        leaveRejected
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false, error: 'get dashboard data server error'
    });
  }


}



export { getDashboardData }