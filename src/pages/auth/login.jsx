import React from 'react';
import LoginForm from '../../components/LoginForm';

const login = () => {
  return (
    <div>
      {/* meta */}
      <header>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='retrieve food from fridge,etc... everywhere !' />
        <meta name='keywords' content='food' />
        <title>frigostock ‧ Enregistrement</title>

        <link rel="manifest" href="/manifest.json" />
        <link href='/favicon.ico' rel='icon' sizes='16x16' />
        <link href='/favicon.ico' rel='icon' sizes='32x32' />
        <link rel="apple-touch-icon" href="/favicon.ico"></link>
        <meta name="theme-color" content="#317EFB" />
      </header>
      {/* content */}
      <LoginForm />
    </div>
  );
};

export default login;