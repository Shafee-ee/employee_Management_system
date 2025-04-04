
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleWare from '../middleware/authMiddleWare'


const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization ? split(' ')[1];
        if (!token) {
            res.status(404).json({ success: false, error: "Token not provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (!decoded) {
            res.status(404).json({ success: false, error: "Token not provided" })
        }

        const user = await User.findById({ _id: decoded._id }).select('-password')


        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }

        req.user = user;
        next();//move to the next middleware
    }
    catch (error) {

        return res.status(500).json({ success: false, error: "server busy.." })


    }
}

export default verifyUser;