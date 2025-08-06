const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const Note = require('../models/Note');

router.get('/', authenticate, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
});

router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({
    userId: req.user.id,
    title,
    content
  });
  res.json(note);
});

router.delete('/:id', authenticate, async (req, res) => {
  await Note.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.sendStatus(200);
});

router.put('/:id', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const updated = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title, content },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;