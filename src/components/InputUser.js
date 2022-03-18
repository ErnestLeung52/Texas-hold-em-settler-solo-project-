import React, { useState } from 'react';

const InputUser = ({ user: userList, setUser }) => {
  const [user, createUser] = useState({
    fullname: '',
    buyin: '',
    ending: '',
  });

  const handleChange = (event) => {
    createUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:5000';
    const endpoint = '/api/user';

    try {
      const body = { user };
      const response = await fetch(`${url}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      const userAdded = data.user.rows[0];

      setUser([...userList, userAdded]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='input-container'>
      <h3>Add Player</h3>
      <form className='input-form' onSubmit={onSubmitForm}>
        <div className='input-row'>
          <input
            type='text'
            placeholder='Full Name'
            name='fullname'
            value={user.fullname}
            onChange={handleChange}
          />
          <input type='text' placeholder='Age' />
        </div>
        <div className='input-row'>
          <input
            type='text'
            placeholder='Buy In'
            name='buyin'
            value={user.buyin}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Ending'
            name='ending'
            value={user.ending}
            onChange={handleChange}
          />
          <button className='addButton'>Create</button>
        </div>
      </form>
    </div>
  );
};

export default InputUser;
