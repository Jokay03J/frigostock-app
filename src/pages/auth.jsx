import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../firebase';

const AuthPage = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = React.useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged(user => {
      if (user) {
        setAuthState(true)
      } else {
        setAuthState(false)
      }
    });

    return () => {

    }
  }, [])

  function signeOut() {
    const auth = getAuth(app);
    auth.signOut().then(() => {
      navigate('/')
    })
  }


  return (
    <main>
      <header>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='retrieve food from fridge,etc... everywhere !' />
        <meta name='keywords' content='food' />
        <title>frigostock ‧ Authentification</title>

        <link rel="manifest" href="/manifest.json" />
        <link href='/favicon.ico' rel='icon' sizes='16x16' />
        <link href='/favicon.ico' rel='icon' sizes='32x32' />
        <link rel="apple-touch-icon" href="/favicon.ico"></link>
        <meta name="theme-color" content="#317EFB" />
      </header>
      {!authState ?
        <div className='grid place-items-center h-screen'>
          <button className='border-2 border-black bg-green-500 rounded-lg' onClick={() => navigate("/auth/register")}>s'enregistrer</button>
          <button className='border-2 border-black bg-green-500 rounded-lg' onClick={() => navigate("/auth/login")}>s'identifier</button>
        </div>
        :
        <div>
          <h1 className='flex justify-center items-center'>Vous êtes connecté</h1>
          <div className='flex justify-center'>
            <button className='text-center w-5/6 h-24 bg-green-500 border-2 border-black rounded-lg' onClick={() => signeOut()}>se déconnecter</button>
          </div>
        </div>
      }
      <div className='flex justify-center'><button className='border-2 border-black bg-green-500 rounded-lg mt-6' onClick={() => navigate("/")}>retourner à l'accueil</button></div>
    </main>
  );
};

export default AuthPage;