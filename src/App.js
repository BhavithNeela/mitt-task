
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Using useState to manage state in functional components
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', description: '' });

  // Function to load notes from local storage on component mount
  useEffect(() => {
    const loadNotesFromLocalStorage = () => {
      const storedNotes = JSON.parse(localStorage.getItem('notes'));
      if (storedNotes) {
        setNotes(storedNotes);
      }
    };
    
    loadNotesFromLocalStorage();
  }, []); // Empty dependency array ensures this effect runs only once on initial render

  // Function to save notes to local storage
  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));  
  };

  // This function handles the addition of a new note
  const handleAddNew = () => {
    // Adding the current note to the notes array
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    // Resetting the note object to clear the input fields
    setNote({ title: '', description: '' });

    // Saving updated notes to local storage
    saveNotesToLocalStorage(updatedNotes);
  };

  // This function handles changes in the input fields and updates the note object
  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value // Dynamically set the property based on input field name
    });
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
            </li>
          ))}
        </ul>
      </div>
      <div className='addnote'>
      {/* Input for Title */}
      <label>Title : </label>
      <input  className='mt-4'  type='text' name='title'  value={note.title} onChange={handleChange} />
      <br />
      {/* Input for Description */}
      <label>Description : </label>
      <input className='mt-4' type='text' name='description'value={note.description} onChange={handleChange}
      />
      <br />
      {/* Button to Add Note */}
      <button className='mt-4 btn btn-primary' onClick={handleAddNew}>Add Note</button>
</div>
</div>
   
      </div>
  );
}

export default App;