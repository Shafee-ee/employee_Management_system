import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅Database connecred successfully")
    }
    catch (error) {
        console.log("❌Database connection failed", error);
    }
}

export default connectToDatabase