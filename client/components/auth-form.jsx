import React, { useState } from 'react';

function AuthForm({ action, onSignIn }) {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
    if (errorMessage) {
      setErrorMessage('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => {
        if (res.status === 401) {
          return setErrorMessage('Invalid username or password');
        }
        if (res.status === 409) {
          return setErrorMessage('Username already exists');
        }
        return res.json();
      })
      .then(result => {
        if (!result) {
          return;
        }
        if (action === 'register') {
          window.location.hash = '#sign-in';
          handleResetState();
        } else if (result.user && result.token) {
          onSignIn(result);
        }
      })
      .catch(err => console.error(err));
  }

  function handleGuestSignIn(event) {
    event.preventDefault();
    const guestInfo = {
      username: 'guest',
      password: 'guest'
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guestInfo)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          onSignIn(result);
        }
      })
      .catch(err => console.error(err));
  }

  function handleResetState() {
    setUserInfo({ username: '', password: '' });
    setErrorMessage('');
  }

  const formTitle = action === 'register' ? 'Register' : 'Sign In';
  const alternateActionHref = action === 'register' ? '#sign-in' : '#register';
  const alternateActionStatement =
    action === 'register'
      ? 'Already have an account?'
      : 'Don\'t have an account?';
  const alternateActionLinkText = action === 'register' ? 'Sign In' : 'Register';
  const submitButton = action === 'register' ? 'Register' : 'Sign In';

  return (
    <>
      <h1 className="text-center mb-4 font-rubik">{formTitle}</h1>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            name="username"
            value={userInfo.username}
            placeholder="Username"
            required
            autoFocus
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
          className="form-control"
          type="password"
          name="password"
          value={userInfo.password}
          placeholder="Password"
          required
          onChange={handleChange} />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-primary mb-3 auth-form-button font-rubik"
          type="submit">
            {submitButton}
          </button>
        </div>
        <p className="text-center mb-3">
          {alternateActionStatement}{' '}
          <a href={alternateActionHref} className="text-decoration-none font-rubik" onClick={handleResetState}>
            {alternateActionLinkText}
          </a>
        </p>
        {action === 'sign-in' && (
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-primary mb-3 auth-form-button font-rubik"
            type="button" onClick={handleGuestSignIn}>
              Guest
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default AuthForm;
