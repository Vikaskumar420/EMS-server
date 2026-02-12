import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    try {
        const { email, password } = req.body;



        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found!" })
        }
        // check for password is matched or not
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(404).json({ success: false, error: "wrong password!" })
        }
        // generate the token 
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "10d" });
        return res
            .status(200)
            .json({ success: true, token, user: { _id: user._id, name: user.name, role: user.role } })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })

    }
}

const verify = (req, res) => {
    return res.
        status(200)
        .json({
            success: true,
            user: req.user
        })
}


export { login, verify }