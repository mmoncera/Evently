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
        'x-access-token': localStorage.getItem('jwt')
      }
    };
    fetch('/api/bookmarks', req)
      .then(res => res.json())
      .then(bookmarks => {
        setIsLoading(false);
        setBookmarks(bookmarks);
      })
      .catch(err => console.error(err));
  }

  if (!user) {
    return <Redirect to='sign-in' />;
  }

  if (isLoading) {
    return null;
  }

  const bookmarkMessage = bookmarks.length === 0 ? <h2 className="text-center font-rubik">Sorry, no bookmarks found.</h2> : <h3 className="mb-3 font-rubik">My Bookmarks</h3>;

  const ellipsisIcon = (
    <div className="dropdown font-rubik">
      <button className="btn border-0 ms-2 p-0 lh-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="fa-solid fa-ellipsis-vertical fs-4"></i>
      </button>
      <ul className="dropdown-menu">
        <button className="dropdown-item" type="button">
          <i className="fa-solid fa-trash-can ellipses-trash-icon"></i>
          <span className="ps-2">Delete</span>
        </button>
        <button className="dropdown-item" type="button">
          <i className="fa-solid fa-rectangle-list"></i>
          <span className="ps-2">Create Itinerary</span>
        </button>
      </ul>
    </div>
  );

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-10 col-md-9 col-lg-7">
          <>
            {bookmarkMessage}
            <ul className="ps-0" >
              {bookmarks.map(bookmark => {
                return <EventCard key={bookmark.bookmarkId} eventInfo={bookmark} icon={ellipsisIcon}/>;
              })}
            </ul>
          </>
      </div>
    </div>
  );
}

export default Bookmarks;
