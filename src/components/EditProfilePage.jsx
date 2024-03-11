// EditProfilePage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const EditProfilePage = () => {
  const history = useHistory();
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handleSave = () => {
    // Implement logic to save edited profile information
    console.log('Updated Data:', { editedName, editedEmail });

    // Redirect back to the user profile page after saving
    history.push('/');
  };

  const handleCancel = () => {
    // Redirect back to the user profile page without saving changes
    history.push('/');
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label htmlFor="editedName">Name:</label>
      <input
        type="text"
        id="editedName"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
      />
      <label htmlFor="editedEmail">Email:</label>
      <input
        type="text"
        id="editedEmail"
        value={editedEmail}
        onChange={(e) => setEditedEmail(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditProfilePage;
