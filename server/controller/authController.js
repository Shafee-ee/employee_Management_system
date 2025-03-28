import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(404).json({ success: false, error: "Wrong Password" })
        }

        //create tokemn
        const token = jwt.sign({ _id: user._id, role: user }, process.env.JWT_KEY,
            {
                expiresIn: "10d"
            }
        )
        //return response
        res.status(200).json({ success: true, token, user: { _id: user._id, name: user.name, role: user.role }, message: "login successful" })
    }
    catch (error) {
        console.log(error)
    }
}

export { login }


