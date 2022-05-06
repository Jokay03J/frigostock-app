import { validate } from 'email-validator';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import app from '../../firebase';
import Icon from "./icon.png"

const LoginForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    })
    return () => {
      
    }
  }, [])

  return (
    <div>
      {/* Notification component */}
      <Toaster />
      {/* main content */}
      <div className='flex justify-center'><button className='border-2 border-black bg-green-500 rounded-lg mt-4' onClick={() => navigate("/")}>retourner a l'accueil</button></div>
      <div className='flex items-center justify-center h-screen flex-col'>
        <img src={Icon} alt="add" className="" height={128} width={128} />
        <div className='text-5xl mb-5 mt-2'>s'identifier</div>
        <input value={email} className='h-8 w-4/6 bg-green-500 border-2 border-black rounded-lg text-center text-black placeholder:text-black' placeholder='adresse mail' onChange={(e) => setEmail(e.target.value)} />
        <input value={password} type="password" className='h-8 w-4/6 bg-green-500 border-2 border-black rounded-lg mt-3 text-center placeholder:text-black' placeholder='mot de passe' onChange={(e) => setPassword(e.target.value)} />
        <button className='bg-green-500 border-2 border-black rounded-lg text-4xl h-11 w-5/6 mt-6' onClick={() => submit({ email: email, password: password, navigate: navigate })}>s'enregistrer</button>
      </div>
    </div >
  );
};

export default LoginForm;

//submit function
function submit({ email, password, navigate }) {
  if (!email || !password) return toast.error("Veuillez remplir tous les champs");
  //check if email is valid
  if (!validate(email)) return toast.error("email invalide");
  //check if password is valid
  if (password.length < 8) return toast.error("mot de passe trop court");
  //send request to server
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      navigate("/");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/user-not-found':
          toast.error("compte introuvable");
          break;

        default:
          toast.error(errorCode);
          break;
      }
    });
}