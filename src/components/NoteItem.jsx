import PropTypes from 'prop-types'
import { useState } from 'react';
import { formatDate } from '../utility/dateUtils'; 
import { formatDateTime } from '../utility/dateTimeUtil';
import Button from 'react-bootstrap/Button'

function NoteItem({ note, onDelete, onUpdate }) {

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);
  const [show, setShow] = useState(false);

  const handleUpdateClick = () => {
    onUpdate(note.id, updatedTitle, updatedContent, note.category);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setUpdatedTitle(note.title)
    setUpdatedContent(note.content)
    setIsEditing(false)
  };

  const showDate = () => {
    setShow(!show)
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={handleUpdateClick}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{note.title} {note.category ? 
          (<span>({note.category})</span>) : ""}
          </h2>
          <p>{note.content}</p>
          <div className='row'>
          <Button variant="primary" onClick={showDate} className='col-6'>{show ? "Hide" : "Date created"}</Button>
          <p className='col-6'>{show && formatDate(new Date(note.createdDate))}</p>
          </div>
          {note.updatedAt && (<p>{formatDateTime(note.updatedAt)}</p>)}
          <button onClick={() => onDelete(note.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  )
}

NoteItem.propTypes = {
  note: PropTypes.object,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func
}
export default NoteItem;
