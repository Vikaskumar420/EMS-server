import Employee from "../models/Employee.js";
import Leave from "../models/leave.js";



const addLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const userId = req.user.id;

    //  Step 1: find employee using userId
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    //   Step 2: create leave with all relations
    const newLeave = new Leave({
      userId,
      employeeId: employee._id,
      department: employee.department,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      message: "Leave added successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Leave add server error"
    });
  }
};


const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    let leave = await Leave.find({ userId: id })
    if (leave.length === 0) {
      leave = await Leave.find({ employeeId: id });
    }
    return res.status(200).json({ success: true, leave })


  } catch (error) {
    return res.status(500).json({ success: false, error: "get leave server erorr" })
  }

};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate({
        path: 'employeeId',
        select: 'employeeId'
      })
      .populate({
        path: 'department',
        select: 'dept_name'
      })
      .populate({
        path: 'userId',
        select: 'name'
      })


    return res.status(200).json({
      success: true,
      leaves
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

const getLeavesDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id)
      .populate({
        path: 'employeeId',
        select: 'employeeId department userId',
        populate: [
          {
            path: 'department',
            select: 'dept_name'
          },
          {
            path: 'userId',
            select: 'name profileImage'
          }
        ]
      });

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found"
      });
    }

    return res.status(200).json({
      success: true,
      leave
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndUpdate({ _id: id }, { status: req.body.status });
    if (!leave) {
      return res.status(404).json({
        success: false,
        error: 'Leave not found '
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      error: 'updateLeave error'
    });
  }
}




export { addLeave, getLeave, getLeaves, getLeavesDetail, updateLeave }