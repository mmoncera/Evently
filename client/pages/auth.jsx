import React, { useContext } from 'react';
import AuthForm from '../components/auth-form';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';

function Auth() {
  const { user, route, handleSignIn } = useContext(AppContext);

  if (user) {
    return <Redirect to="" />;
  }

  return (
    <div className="row justify-content-center py-5">
      <div className="col-10 col-sm-8 col-md-6 col-lg-4">
        <AuthForm action={route.path} onSignIn={handleSignIn} />
      </div>
    </div>
  );
}

export default Auth;
