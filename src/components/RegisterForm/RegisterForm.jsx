import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Icon from "./icon.png"
import { validate } from 'email-validator';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase"
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      {/* Notification component */}
      <Toaster />
      {/* main content */}
      <div className='flex items-center justify-center h-screen flex-col'>
        <img src={Icon} alt="add" className="" height={128} width={128} />
        <div className='text-5xl mb-5 mt-2'>s'enregistrer</div>
        <input value={email} className='h-8 w-4/6 bg-green-500 border-2 border-black rounded-lg text-center text-black placeholder:text-black' placeholder='adresse mail' onChange={(e) => setEmail(e.target.value)} />
        <input value={password} className='h-8 w-4/6 bg-green-500 border-2 border-black rounded-lg mt-3 text-center placeholder:text-black' placeholder='mot de passe' onChange={(e) => setPassword(e.target.value)} />
        <button className='bg-green-500 border-2 border-black rounded-lg text-4xl h-11 w-5/6 mt-6' onClick={() => submit({ email: email, password: password, navigate: navigate})}>s'enregistrer</button>
      </div>
    </div >
  );
};

export default RegisterForm;

//submit function
function submit({ email, password,navigate }) {
  if (!email || !password) return toast.error("Veuillez remplir tous les champs");
  //check if email is valid
  if (!validate(email)) return toast.error("email invalide");
  //check if password is valid
  if (password.length < 8) return toast.error("mot de passe trop court");
  //send request to server
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      navigate("/");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          toast.error("email déjà utilisé");
          break;

        default:
          toast.error(errorCode);
          break;
      }
    });
}