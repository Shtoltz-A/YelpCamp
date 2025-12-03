import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    }
};

const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB closed")
    } catch (error) {
        console.error("Error closing MongoDB: ", error);
        process.exit(1);
    }
};

export default {connectDB, closeDB};