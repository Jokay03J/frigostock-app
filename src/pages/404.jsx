import {  useNavigate } from 'react-router-dom';
import React from 'react';

const Error = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='flex justify-center'>
        <div className='grid place-items-center h-screen text-4xl justify-center content-center'>
          <div className='flex'>404 <div className='text-slate-600'>|</div> Page non trouver</div>
          <button className='mt-3 bg-green-500 border border-black rounded-lg text-2xl' onClick={() => navigate("/")}>retourner a l'accueil</button>
        </div>
      </div>
    </div>
  );
};

export default Error;