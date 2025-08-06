import { useState } from 'react';
import { api } from '../api';

export default function NoteCard({ note, refresh }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const updateNote = async () => {
    await api.put(`/notes/${note._id}`, { title, content });
    setEdit(false);
    refresh();
  };

  const deleteNote = async () => {
    await api.delete(`/notes/${note._id}`);
    refresh();
  };

  return (
    <div>
      {edit ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <textarea value={content} onChange={e => setContent(e.target.value)} />
          <button onClick={updateNote}>Save</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </>
      )}
      <button onClick={() => setEdit(!edit)}>Edit</button>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
}