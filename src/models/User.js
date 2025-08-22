import mongoose from "mongoose";

// 1- Create User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// 2- Create User Model
const User = mongoose.model("User", userSchema);

export default User;