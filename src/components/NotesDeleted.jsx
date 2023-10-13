import PropTypes from 'prop-types'
import { useState } from 'react'

function NotesDeleted({ deletedNotes, restoreNote, deletePermanentlyNote }) {

  const [selectedNotes, setSelectedNotes] = useState({});

  const toggleNoteSelection = (id) => {
    
    setSelectedNotes((prevSelectedNotes) => ({
      ...prevSelectedNotes,
      [id]: !prevSelectedNotes[id],
    }));

  };

  const selectAllNotes = () => {
    const allNotesSelected = Object.keys(selectedNotes).length === deletedNotes.length;

    if(allNotesSelected){
      setSelectedNotes({});
    } else {
      const newSelectedNotes = {};
      deletedNotes.forEach((note) => {
        newSelectedNotes[note.id] = true;
      });

      setSelectedNotes(newSelectedNotes)
    }
  }

  
  return (
    <div className="right-side">
      {/* Button for Select All */}
      <button onClick={selectAllNotes}>Select All</button>

      {/* Display deleted notes and provide a button to restore them */}
      {deletedNotes.map((note) => (
        <div key={note.id}>
        <input 
          type='checkbox'
          checked={selectedNotes[note.id] || false}
          onChange={() => toggleNoteSelection(note.id)}
        />
          <p>{note.title} (Deleted)</p>
          <button onClick={() => restoreNote(note.id)}>Restore</button>
          <button onClick={() => deletePermanentlyNote(note.id)}>Permanently Delete</button>
        </div>
      ))}
    </div>
  );
}

NotesDeleted.propTypes = {
    deletedNotes: PropTypes.array,
    restoreNote: PropTypes.func,
    deletePermanentlyNote: PropTypes.func
}

export default NotesDeleted;
