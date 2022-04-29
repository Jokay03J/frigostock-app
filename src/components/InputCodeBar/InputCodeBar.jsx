import React, { useState } from 'react';

const InputCodeBar = ({ code }) => {
  const [inputValue,setInputValue] = useState(code);
  
  return (
    <div className='flex justify-center'>
      <input className='border-2 border-black rounded-lg w-4/6 h-10 text-center text-2xl bg-green-500 text-black' placeholder='veuillez entrer un code-bar' value={code} onChange={(e) => setInputValue(e.target.value)}></input>
    </div>
  );
};

export default InputCodeBar;