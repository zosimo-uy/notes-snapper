import { useState, useEffect } from 'react';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';
import NotesDeleted from './NotesDeleted';

function NotesApp() {

  // * Initial state declaration of notes object and also providing the key for the localStorage item
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    return storedNotes;
  });

  // * Storage for the temporary deleted notes
  const [archive, setArchive] = useState([])

  // * Filtering the notes to be mapped on the note item that aren't deleted
  const visibleNotes = notes.filter((note) => !note.deleted);

  // * Imperical creation of Notes by creating this Function
  const createNote = (title, content, category) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      category,
      createdDate: new Date().toISOString(), // Store as ISO string
      updatedAt: null,
      delete: false,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // * Temporary/Soft Deleting the notes Logical
  const softDeleteNote = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          deleted: true, // Set the 'deleted' property to true
        };
      }
      return note;
    });

    const noteToArchive = updatedNotes.find((note) => note.id === id);
  
    if (noteToArchive) {
      setArchive([...archive, noteToArchive]);
    }
    setNotes(updatedNotes);
  };

  // * Updating the notes logical
  const updateNote = (id, updatedTitle, updatedContent, updatedCategory) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: updatedTitle,
          content: updatedContent,
          category: updatedCategory,
          updatedAt: new Date().toISOString(), // Add updatedAt property
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  // * Restoring the notes logical
  const restoreNote = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          deleted: false, // Set the 'deleted' property back to false
        };
      }
      return note;
    });
    setNotes(updatedNotes);

    setArchive((prevArchive) => prevArchive.filter((note) => note.id !== id));
  };

  //? useEffect to render only once notes is updated on localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // ! permanently deleting the note from the archive state
  const deletePermanently = (id) => {
    const updatedNotes = archive.filter((note) => note.id !== id)
    setArchive(updatedNotes)
  }

  return (
    <div>
      <NoteForm onCreate={createNote} />
      <div className='row'>
        <div className='col-6'>
          {visibleNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={softDeleteNote}
              onUpdate={updateNote}
            />
            ))
          }
        </div>
        <div className='col-6'>
        <NotesDeleted 
          deletedNotes={archive}
          restoreNote={restoreNote}
          deletePermanentlyNote={deletePermanently}
        />
        </div>
      </div>
    </div>
  );
}

export default NotesApp;
