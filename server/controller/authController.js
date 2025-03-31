import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { response } from 'express';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Recieved email:", email)
        console.log("Recieved password:", password)

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        console.log("Stored Password:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result: ", isMatch)
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "Wrong Password" })
        }

        //create tokemn
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY,
            {
                expiresIn: "10d"
            }
        )
        //return response
        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role },
            message: "login successful"
        })
        console.log("User found:", user);
    }
    catch (error) {

        res.status(500).json({ success: false, error: error.message })
    }
}

export { login }


