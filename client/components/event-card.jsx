import React from 'react';

function EventCard(props) {
  const { eventInfo, icon } = props;
  const { alias, imageUrl, name, rating, reviewCount, price, type, address, phone } = eventInfo;

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
            <button className="btn border-0 p-0 lh-1">
              {icon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
