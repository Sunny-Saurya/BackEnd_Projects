import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/') // API call to backend
      .then(response => setMessage(response.data.message))  // Set the message from backend response
      .catch(error => console.error('Error:', error));  // Handle errors
  
  }, []);  // Empty array ensures the effect runs only once

  return (
    <div>
      <h1>{message}</h1>  {/* Display the fetched message */}
    </div>
  );
};

export default App;
