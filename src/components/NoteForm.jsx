import { useState } from 'react';
import PropTypes from 'prop-types'

function NoteForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleCreateClick = () => {
    onCreate(title, content, category);
    setTitle('');
    setContent('');
    setCategory('');
  };

  const mainCategories = [
    'Personal',
    'Work',
    'Study',
    'Ideas',
    'Recipes',
    'Travel',
    'Books/Movies',
    'Health/Fitness',
    'Finance',
    'Tech',
    'Shopping',
    'Quotes',
    'Food',
    'Business',
    'Lectures',
    'Culture',
  ];
  

  return (
    <div>
      <h2>Create a New Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
      <option value=''>Select a category</option>
      {mainCategories.map((category) => 
       (
        <option
          key={category}
          value={category}
        >{category}
        </option>
       )
      )}
      </select>
      <button onClick={handleCreateClick}>Create</button>
    </div>
  );
}

NoteForm.propTypes ={
  onCreate: PropTypes.func,
}
export default NoteForm;
