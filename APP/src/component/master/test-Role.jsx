import React, { useState } from 'react';
import API_URL from '../../config';

const AddNameForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input (optional)
    if (!name) {
      alert('Please enter a name.');
      return;
    }

    // Send the name to the API (replace 'API_URL' with your actual API endpoint)
    fetch(`${API_URL}/Add_AppRoles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiZGVlcGFrciIsImNyZWF0ZWRCeSI6MSwiaWF0IjoxNjkwMjc1Mzc1LCJleHAiOjE2OTAyNzcxNzV9.IvwrBoX6Rt4KzmjuiirjzakwVBaIPGnjHbWwGQZVWWA',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Handle the API response as needed
        alert('Name added successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to add name. Please try again later.');
      });

    // Clear the input field after submission
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Add Name</button>
    </form>
  );
};

export default AddNameForm;
