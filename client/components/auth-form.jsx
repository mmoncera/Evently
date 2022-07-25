import React, { useState } from 'react';

function AuthForm(props) {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const { action, onSignIn } = props;

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
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
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = '#sign-in';
        } else if (result.user && result.token) {
          onSignIn(result);
        }
        setUserInfo({ username: '', password: '' });
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

  const formTitle = action === 'sign-up' ? 'Register' : 'Sign In';
  const alternateActionHref = action === 'sign-up' ? '#sign-in' : '#sign-up';
  const alternateActionStatement =
    action === 'sign-up'
      ? 'Already have an account?'
      : "Don't have an account?";
  const alternateActionLinkText = action === 'sign-up' ? 'Sign In' : 'Register';
  const submitButton = action === 'sign-up' ? 'Register' : 'Sign In';

  return (
    <>
      <h1 className="text-center mb-4 font-rubik">{formTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            className="form-control bg-light"
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
            className="form-control bg-light"
            type="password"
            name="password"
            value={userInfo.password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-primary mb-3 auth-form-button font-rubik"
            type="submit"
          >
            {submitButton}
          </button>
        </div>
        <p className="text-center mb-3">
          {alternateActionStatement}{' '}
          <a href={alternateActionHref} className="text-decoration-none font-rubik">
            {alternateActionLinkText}
          </a>
        </p>
        {action === 'sign-in' && (
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn btn-primary mb-3 auth-form-button font-rubik"
              type="button"
              onClick={handleGuestSignIn}
            >
              Guest
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default AuthForm;
