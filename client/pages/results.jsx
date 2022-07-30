import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
import EventCard from '../components/event-card';
import { AppContext, parseRoute } from '../lib';

function Results() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    searchYelp();
  }, []);

  useEffect(() => {
    getBookmarks();
  }, []);

  function searchYelp() {
    const { params } = parseRoute(window.location.hash);
    const term = params.get('term');
    const location = params.get('location');
    fetch(`/api/search-yelp/?term=${term}&location=${location}`)
      .then(res => res.json())
      .then(data => {
        setIsSearching(false);
        if (data.error) {
          return setError('Sorry, no events found.');
        }
        setResults(data);
      })
      .catch(err => console.error(err));
  }

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
        setBookmarks(bookmarks);
      })
      .catch(err => console.error(err));
  }

  function formatEventInfo(eventInfo) {
    const type = eventInfo.categories
      .map(category => category.title)
      .join(' • ');
    const address = eventInfo.location.display_address.join(', ');

    eventInfo = {
      eventId: eventInfo.id,
      alias: eventInfo.alias,
      imageUrl: eventInfo.image_url,
      name: eventInfo.name,
      rating: eventInfo.rating,
      reviewCount: eventInfo.review_count,
      price: eventInfo.price,
      type,
      address,
      phone: eventInfo.display_phone
    };

    return eventInfo;
  }

  function confirmBookmarkStatus(eventId) {
    const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.eventId === eventId);
    return bookmarkIndex >= 0;
  }

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  if (isSearching) {
    return null;
  }

  const { params } = parseRoute(window.location.hash);
  const term = params.get('term');
  const location = params.get('location');

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-10 col-md-9 col-lg-7">
        {error && <h2 className="text-center font-rubik">{error}</h2>}

        {!error &&
          <>
            <h3 className="mb-3 font-rubik">{`${term} near ${location}`}</h3>
            <ul className="ps-0" >
              {results.map(result => {
                const eventInfo = formatEventInfo(result);
                return <EventCard key={eventInfo.eventId} event={eventInfo} bookmarkStatus={confirmBookmarkStatus(eventInfo.eventId)}/>;
              })}
            </ul>
          </>
        }
      </div>
    </div>
  );
}

export default Results;
