// controllers/notesController.js
const Note = require('../models/Note');

// Get notes for logged-in user
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new note
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Delete note by ID
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Update note by ID
exports.updateNote = async (req, res) => { 
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
}