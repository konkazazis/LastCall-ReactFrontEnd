import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function Profile() {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currUsername, setCurrUsername] = useState('');
  const [currEmail, setCurrEmail] = useState('');

  //handles user data updates
  const formData = {};
  const updateProfileUrl = '/api/user/profile/update/';
  const handleSaveChanges = () => {

    formData.username = newUsername ? newUsername : formData.username;
    formData.password = newPassword ? newPassword : formData.password;
    formData.email = newEmail ? newEmail : formData.email;
    
    axios
    .put(updateProfileUrl, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error updating profile', error.response.data);
    });
    
  }

  // used to get current user info and display it on the profile modal
  useEffect(() => {
    axios.get("/user")
    .then(function(res) {
      setCurrUsername(res.data.user.username);
      setCurrEmail(res.data.user.email);
    })
    .catch(function(error) {
    });
  }, [formData.username, formData.password, formData.email]);

  return (
    <div className='animate__animated animate__fadeIn m-2 h-max'>
      <h2 className='text-2xl font-semibold mb-4'>Profile</h2>
      <div className='mb-4'>
        <label htmlFor='newUsername' className='block font-medium'>
          New Username:
        </label>
        <div className='flex justify-start'>
          <input
            type='text'
            id='newUsername'
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className='px-3 py-2 border rounded-md w-60'
          />
          <div className='ml-2 bg-slate-200 text-gray-400 rounded-lg pl-6 pr-6 pt-2 '>{currUsername}</div>
        </div>
      </div>
      <div className='mb-4'>
        <label htmlFor='newEmail' className='block font-medium'>
          New Email:
        </label>
        <div className='flex justify-start'>
          <input
            type='email'
            id='newEmail'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className='px-3 py-2 border rounded-md  w-60'
          />
          <div className='ml-2 bg-slate-200 text-gray-400 rounded-lg pl-6 pr-6 pt-2 '>{currEmail}</div>
        </div>
      </div>
      <div className='mb-4'>
        <label htmlFor='newPassword' className='block font-medium'>
          New Password:
        </label>
        <input
          type='password'
          id='newPassword'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='px-3 py-2 border rounded-md  w-60'
        />
      </div>
      <button
        className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mr-2'
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
      <h2>Contract</h2>
      <h2>Payslips</h2>
    </div>

  
  );
}

export default Profile;
