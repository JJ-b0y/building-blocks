import e from 'express';
import Note from '../src/models/Note.js';

export async function getAllNotes(_, res){  // The underscore (_) is used to indicate that we will never use the first parameter (req) in this function
    try {
        const notes = await Note.find().sort({ createdAt: 1 }); // Fetch all notes from the database, sorted by creation date in ascending order (oldest to newest)
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function createNote(req, res){
    try {
        const { title, content } = req.body;    // Destructure title and content from the request body
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const note = new Note({ title, content });   // Creating a new instance of the Note model established in Note.js

        const savedNote = await note.save();   // Save the new note to the database
        res.status(201).json(savedNote);    // Respond with the saved note and a 201 status code
    } catch (error) {
        console.error("Error in createNote controller:", error);
        res.status(500).json({ message: "Error creating note" });
    }
};

export async function updateNote(req, res){
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }   // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        };

        res.status(200).json({updatedNote});
    } catch (error) {
        console.error("Error in updateNote controller:", error);
        res.status(500).json({ message: "Error updating note" });
    }
};

export async function deleteNote(req, res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        res.status(200).json({ message: "Note deleted successfully!" });

    } catch (error) {
        console.error("Error in deleteNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};