import React, { useState } from 'react';

export default function AddUser({ addUserFunction }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Blueton"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          addUserFunction(text);
        }}>
        Add
      </button>
    </>
  );
};
