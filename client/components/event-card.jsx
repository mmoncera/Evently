import React, { useContext } from 'react';
import { AppContext } from '../lib';

function EventCard({ eventInfo, icon }) {
  const { alias, imageUrl, name, rating, reviewCount, type, address, phone } = eventInfo;
  const price = eventInfo.price === 'null' ? '' : eventInfo.price;
  const { route } = useContext(AppContext);
  const iconPosition = route.path === 'bookmarks' || route.path === 'itinerary-details' ? 'align-self-center' : '';

  return (
    <div id={alias} className="card mb-4 shadow">
      <div className="row justify-content-center g-0">
        <div className="col-4">
          <img src={imageUrl} className="p-3 event-image" alt={`${name} image`} />
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
        <div className={`col-1 ${iconPosition}`}>
          <div className="card-body ps-0">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
