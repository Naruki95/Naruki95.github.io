import React, { useState } from 'react';

export default function AddUser({ addUserFunction, guestUserFunction }) {
  const [text, setText] = useState('');
  return (
    <>
      <button
        className='button-add-user'
        onClick={() => {
          guestUserFunction();
        }}>
        As Guest
      </button>
      <div className='hr-container'>
        <hr></hr>
      </div>
      <input
        name='user'
        className='input-user'
        placeholder="Enter your Anilist Username"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br></br>
      <button
        className='button-add-user'
        onClick={() => {
          setText('');
          addUserFunction(text);
        }}>
        Validation
      </button>
    </>
  );
};
