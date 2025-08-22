import mongoose from "mongoose";

// 1- Create a Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true }); // timestamps : to automatically add createdAt and updatedAt

// 2- Create a Model
const Note = mongoose.model("Note", noteSchema);

export default Note;