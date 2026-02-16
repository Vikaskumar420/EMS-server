import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path from "path"
import Department from '../models/department.js'
import imagekit from "../config/imagekit.js"



const storage = multer.memoryStorage();   // 👈 change this
const upload = multer({ storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role
    } = req.body;
    console.log("FILE CHECK:", req.file);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "User already registered"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    let imageUrl = "";
    let fileId = "";

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer.toString("base64"),   // 👈 IMPORTANT FIX
        fileName: `user-${Date.now()}`,
        folder: "user-image"
      });
      console.log("File:", req.file);

      imageUrl = uploadResponse.url;
      fileId = uploadResponse.fileId;
    }

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: imageUrl,
      profileImageFileId: fileId
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary
    });

    await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "Employee created"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId', { password: 0 }).populate('department')
    return res.status(200).json({ success: true, employees })
  } catch (error) {
    return res.status(500).json({ success: false, error: "get employees server error" })
  }
}

const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {

    let employee;
    employee = await Employee.findById({ _id: id })
      .populate('userId', { password: 0 })
      .populate('department')
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate('userId', { password: 0 })
        .populate('department');
    }
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found"
      });
    }


    return res.status(200).json({ success: true, employee })
  } catch (error) {
    return res.status(500).json({ success: false, error: "get employee server error" })
  }
}

const updatEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    const employee = await Employee.findById({ _id: id })
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: " employee not found" })
    }

    const user = await User.findById({ _id: employee.userId })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: " user not found" })
    }

    const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { name })
    const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, {
      maritalStatus, designation, salary, department,
    })

    if (!updateEmployee || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: " document not found" })
    }

    res.status(200).json({ success: true, message: 'employee Updated' })

  } catch (error) {
    return res.status(500).json({ success: false, error: "update employee server error" })

  }
}

const getEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id })
    return res.status(200).json({ success: true, employees })
  } catch (error) {
    return res.status(500).json({ success: false, error: "get employeesByDepId server error" })
  }
}



export { addEmployee, upload, getEmployees, getEmployee, updatEmployee, getEmployeesByDepId }