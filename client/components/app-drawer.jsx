import React, { useContext } from 'react';
import { AppContext } from '../lib';

function AppDrawer() {
  const { handleSignOut } = useContext(AppContext);
  return (
    <>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title font-rubik fw-bold" id="offcanvasNavbarLabel">Menu</h1>
          <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body px-0">
          <div className="navbar-nav justify-content-end flex-grow-1 h4 font-rubik" data-bs-dismiss="offcanvas">
              <a className="nav-link mb-3 ps-3 text-dark" aria-current="page" href="#">Bookmarks</a>
              <a className="nav-link mb-3 ps-3 text-dark" href="#">Itineraries</a>
              <a className="nav-link mb-3 ps-3 text-dark" href="#sign-in" onClick={handleSignOut}>Sign Out</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppDrawer;
