import React, { useContext } from 'react';
import AppDrawer from './app-drawer';
import { AppContext } from '../lib';

function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className='sticky-top'>
      <nav className="navbar navbar-dark lh-1 bg-primary">
        <div className="container">
          <a className="navbar-brand py-0 me-0 app-name" href="#">Evently</a>
          {user && <AppDrawer />}
        </div>
      </nav>
    </header>
  );
}

export default Header;
