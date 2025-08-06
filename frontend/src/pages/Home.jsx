import { useEffect, useState } from 'react';
import { api } from '../api';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';

export default function Home({ user }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    const res = await api.get('/notes');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    await api.post('/notes', { title, content });
    fetchNotes();
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <Navbar user={user} />
      <h2>Your Notes</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={createNote}>Add Note</button>
      {notes.map(note => (
        <NoteCard key={note._id} note={note} refresh={fetchNotes} />
      ))}
    </div>
  );
}