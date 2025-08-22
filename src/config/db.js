import mongoose from "mongoose";

export async function connectDB() {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined");
        }

        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to Database");
    }
    catch (error) {
        console.log("Error: Connecting to Database ", error);
        process.exit(1); // 1 means exit with failure
    }
}