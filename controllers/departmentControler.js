import Department from '../models/department.js'



const addDepartment = async (req, res) => {
    try {
        const { dept_name, description } = req.body;
        console.log(dept_name);

        const newDept = new Department({
            dept_name,
            description
        });
        await newDept.save();
        return res.status(200).json({ success: true, department: newDept });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ success: false, error: "add department server error" })
    }
}

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({ success: true, departments })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const department = await Department.findById({ _id: id })

        return res.status(200).json({ success: true, department })


    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })

    }
}

const updatDepartment = async (req, res) => {
    const { id } = req.params;
    const { dept_name, description } = req.body;
    try {
        const updatDept = await Department.findByIdAndUpdate({ _id: id }, {
            dept_name,
            description
        })
        return res.status(200).json({ success: true, updatDept })

    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })

    }
}

const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteDept = await Department.findById({ _id: id });
        if (!deleteDept) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }
        await deleteDept.deleteOne();
        return res.status(200).json({ success: true, deleteDept })

    } catch (error) {
        console.log("DELETE DEPARTMENT ERROR:", error);
        return res.status(500).json({ success: false, error: "delete department server error" })
    }
}


export { addDepartment, getDepartments, getDepartment, updatDepartment, deleteDepartment }