import React, { useState } from 'react';

function EventCard(props) {
  const { event, bookmarkStatus } = props;
  const [isBookmarked, setIsBookmarked] = useState(bookmarkStatus);
  const { alias, imageUrl, name, rating, reviewCount, price, type, address, phone } = event;

  function handleAddBookmark() {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ event })
    };
    fetch('/api/bookmarks', req)
      .then(res => setIsBookmarked(true))
      .catch(err => console.error(err));
  }

  function handleDeleteBookmark() {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('jwt')
      },
      body: JSON.stringify({ event })
    };
    fetch('/api/bookmarks', req)
      .then(res => setIsBookmarked(false))
      .catch(err => console.error(err));
  }

  function renderIcon() {
    if (isBookmarked) {
      return <i className="fa-solid fa-bookmark bookmark-icon" onClick={handleDeleteBookmark}></i>;
    }
    if (!isBookmarked) {
      return <i className="fa-regular fa-bookmark bookmark-icon" onClick={handleAddBookmark}></i>;
    }
  }

  return (
    <div id={alias} className="card mb-4 shadow">
      <div className="row justify-content-center g-0">
        <div className="col-4" >
          <img src={imageUrl} className="p-3 event-image" alt="event image" />
        </div>
        <div className="col-7">
          <div className="card-body ps-0">
            <p className="card-text fs-5 fw-semibold">{name}</p>
            <p className="card-text">{rating}{' '}
              <i className="fa-solid fa-star star-icon"></i>{' '}
              <span className="fst-italic">({reviewCount} Reviews)</span>
            </p>
            <p className="card-text">{price} • {type}</p>
            <p className="card-text">{address}</p>
            <p className="card-text">{phone}</p>
          </div>
        </div>
        <div className="col-1">
          <div className="card-body ps-0">
            <button className="btn border-0">
              {renderIcon()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
