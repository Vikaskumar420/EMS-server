import User from "./models/User.js"
import bcrypt from 'bcrypt'
import connectedToDb from "./db/db.js";
const userRegister = async () => {
    connectedToDb();
    try {
        const hashpassword = await bcrypt.hash('admin', 10);
        const newUser = new User({
            name: "admin",
            email: "admin@gmail.com",
            password: hashpassword,
            role: 'admin'
        })
        newUser.save()
    } catch (error) {
        console.log(error);

    }
}

userRegister();