import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', description: '', image: null });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const loadNotesFromLocalStorage = () => {
      const storedNotes = JSON.parse(localStorage.getItem('notes'));
      if (storedNotes) {
        setNotes(storedNotes);
      }
    };
    
    loadNotesFromLocalStorage();
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));  
  };

  const handleAddNew = () => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    setNote({ title: '', description: '', image: null });
    setImagePreview(''); // Clear image preview

    // Clear and re-set the value of the file input
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.value = ''; // Clear the value
    // Re-set the value to an empty string to ensure onChange event is triggered
    fileInput.value = '';
    
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNote({
          ...note,
          image: reader.result
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNote({
        ...note,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <div className="">
      <h1 className='note'>Notes</h1>
      <br />
      <div className='mainDiv'>
        <div className="mt-4">
          <h2>All Notes</h2>
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                <strong>Title:</strong> {note.title}, <strong>Description:</strong> {note.description}
                {note.image && <img src={note.image} alt="Note Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
              </li>
            ))}
          </ul>
        </div>
        <div className='addnote '>
          <label>Title : </label>
          <input className='mt-4 description' style={{marginLeft:"60px"}} type='text' name='title' value={note.title} onChange={handleChange} />
          <br />
          <label>Description : </label>
          <input className='mt-4 description' style={{marginLeft:"10px"}} type='text' name='description' value={note.description} onChange={handleChange} />
          <br />
          <label>Image : </label>
          <input className='mt-4 description' style={{marginLeft:"10px"}} type='file' accept="image/*" name='image' onChange={handleChange} />
          {imagePreview && <img src={imagePreview} alt="Note Image Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
          <br />
          <button className='mt-4 btn btn-primary' onClick={handleAddNew}>Add Note</button>
        </div>
      </div>
    </div>
  );
}

export default App;
