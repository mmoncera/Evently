import React, { useState, useEffect, useContext, useRef } from 'react';
import StarRating from '../components/star-rating';
import { AppContext } from '../lib';

function EventCard({ eventInfo, icon }) {
  const [imageHeight, setimageHeight] = useState(0);
  const heightRef = useRef();
  const { alias, name, rating, reviewCount, type, address, phone } = eventInfo;
  const imageUrl = !eventInfo.imageUrl
    ? './images/no-image.svg.png'
    : eventInfo.imageUrl;
  const price = eventInfo.price === 'null' ? '' : eventInfo.price;
  const { route } = useContext(AppContext);
  const iconPosition = route.path === 'bookmarks' || route.path === 'itinerary-details' ? 'align-self-center' : '';

  useEffect(() => {
    setimageHeight(heightRef.current.clientHeight);
  }, []);

  return (
    <div id={alias} className="card mb-4 shadow">
      <div className="row justify-content-center g-0">
        <div className="col-4">
          <img src={imageUrl} className="w-100 p-3 event-image" alt={`${name} image`} style={{ height: `${imageHeight}px` }} />
        </div>
        <div className="col-7">
          <div className="card-body ps-0" ref={heightRef}>
            <p className="card-text fs-5 fw-semibold">{name}</p>
            <p className="card-text">
              <StarRating rating={rating} />
              <span className="d-block fst-italic">({reviewCount} reviews)</span>
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
