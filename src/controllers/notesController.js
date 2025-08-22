import mongoose from "mongoose";
import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const userId = req.user.id;

        const sort = req.query.sort === "desc" ? -1 : 1;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const [notes, count] = await Promise.all([
            Note.find({ userId: userId })
                .sort({ createdAt: sort })
                .select('-__v').skip(skip).limit(limit),
            Note.countDocuments({ userId })
        ]);

        res.status(200).json({
            notes,
            count
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        const newNote = new Note({ title, description, userId });
        await newNote.save();

        res.status(201).send({ message: "Note created successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}

export async function updateNote(req, res) {
    try {
        const noteId = req.params.id;
        const { title, description } = req.body;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).send({ message: "Invalid note ID format" });
        }

        const updatedNote = await Note.findOneAndUpdate({
            _id: noteId,
            userId: userId
        }, { title, description }, { new: true });

        if (!updatedNote) {
            return res.status(404).send({ message: "Note not found" });
        }

        res.status(200).send(updatedNote);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}

export async function deleteNote(req, res) {
    try {
        const noteId = req.params.id;
        const userId = req.user.id;

        const deletedNote = await Note.findOneAndDelete({
            _id: noteId,
            userId: userId
        });

        if (!deletedNote) {
            res.status(404).send({ message: "Note not found" });
        }

        res.status(200).send({ message: "Note deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error!" });
    }
}