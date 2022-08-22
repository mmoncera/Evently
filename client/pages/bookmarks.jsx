import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
import EventCard from '../components/event-card';
import { AppContext } from '../lib';

function Bookmarks() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    getBookmarks();
  }, []);

  function getBookmarks() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      }
    };
    fetch('/api/bookmarks', req)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setBookmarks(data);
      })
      .catch(err => console.error(err));
  }

  function handleDeleteBookmark(eventInfo) {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      },
      body: JSON.stringify({ eventInfo })
    };
    fetch('/api/bookmarks', req)
      .then(res => setBookmarks(bookmarks.filter(bookmark => bookmark.eventId !== eventInfo.eventId)))
      .catch(err => console.error(err));
  }

  function renderEllipsisIcon(bookmark) {
    const { eventId, alias, imageUrl, name, rating, reviewCount, price, type, address, phone } = bookmark;

    return (
      <div className="dropdown">
        <button className="btn border-0 ms-2 p-0 lh-1 font-rubik" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="fa-solid fa-ellipsis-vertical fs-4"></i>
        </button>
        <ul className="dropdown-menu">
          <button className="dropdown-item" type="button" onClick={() => handleDeleteBookmark(bookmark)}>
            <i className="fa-solid fa-trash-can ellipses-trash-icon"></i>
            <span className="ps-2 font-rubik">Delete</span>
          </button>
          <a className="dropdown-item" href={`#create-itinerary?eventId=${eventId}&alias=${alias}&imageUrl=${imageUrl}&name=${name}&rating=${rating}&reviewCount=${reviewCount}&price=${price}&type=${type}&address=${address}&phone=${phone}`}>
            <i className="fa-solid fa-rectangle-list"></i>
            <span className="ps-2 font-rubik">Create Itinerary</span>
          </a>
        </ul>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  if (isLoading) {
    return null;
  }

  const bookmarkMessage =
    bookmarks.length === 0
      ? <h2 className="text-center font-rubik">Sorry, no bookmarks found.</h2>
      : <h3 className="mb-3 font-rubik">My Bookmarks</h3>;

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-10 col-md-9 col-lg-7">
        {bookmarkMessage}
        <ul className="ps-0" >
          {bookmarks.map(bookmark => {
            return <EventCard key={bookmark.bookmarkId} eventInfo={bookmark} icon={renderEllipsisIcon(bookmark)}/>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Bookmarks;
