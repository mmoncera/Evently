import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Home from './pages/home';
import Auth from './pages/auth';
import SearchYelpResults from './pages/search-yelp-results';
import Bookmarks from './pages/bookmarks';
import CreateItinerary from './pages/create-itinerary';
import Itineraries from './pages/itineraries';
import ItineraryDetails from './pages/itinerary-details';
import Header from './components/header';
import PageContainer from './components/page-container';
import { parseRoute, AppContext } from './lib';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  useEffect(() => {
    addHashChangeListener();
  }, []);

  useEffect(() => {
    verifyUser();
  }, []);

  function addHashChangeListener() {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
  }

  function verifyUser() {
    const token = window.localStorage.getItem('jwt');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
  }

  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('jwt', token);
    setUser(user);
  }

  function handleSignOut() {
    window.localStorage.removeItem('jwt');
    setUser(null);
  }

  function renderPage() {
    const { path } = route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'register') {
      return <Auth />;
    }
    if (path === 'search-yelp-results') {
      return <SearchYelpResults />;
    }
    if (path === 'bookmarks') {
      return <Bookmarks />;
    }
    if (path === 'create-itinerary') {
      return <CreateItinerary />;
    }
    if (path === 'itineraries') {
      return <Itineraries />;
    }
    if (path === 'itinerary-details') {
      return <ItineraryDetails />;
    }
  }

  if (isAuthorizing) {
    return null;
  }

  const contextValue = { user, route, handleSignIn, handleSignOut };

  return (
    <AppContext.Provider value={contextValue}>
      <>
        <Header />
        <PageContainer>
          {renderPage()}
        </PageContainer>
      </>
    </AppContext.Provider>
  );
}

export default App;
