import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get all notes
router.get('/', authMiddleware, getAllNotes);

// create note
router.post('/', authMiddleware, createNote);

// update note by id
router.put('/:id', authMiddleware, updateNote);

// create note
router.delete('/:id', authMiddleware, deleteNote);

export default router;