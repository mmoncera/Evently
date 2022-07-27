import React from 'react';

function Card(props) {
  const { alias, image_url: imageUrl, name, rating, review_count: reviews, price, categories, location: { display_address: displayAddress }, display_phone: phone } = props.businessInfo;
  const eventType = categories
    .map(category => category.title)
    .join(' • ');
  const address = displayAddress.join(', ');

  return (
      <div id={alias} className="card mb-3">
        <div className="row justify-content-center g-0">
          <div className="col-4" >
            <img src={imageUrl} className="p-3 event-image" alt="event image" />
          </div>
          <div className="col-7">
            <div className="card-body ps-0">
              <p className="card-text fs-5 fw-semibold">{name}</p>
              <p className="card-text">{rating}{' '}
                <i className="fa-solid fa-star star-icon"></i>{' '}
                <span className="fst-italic">({reviews} Reviews)</span>
              </p>
              <p className="card-text">{price} • {eventType}</p>
              <p className="card-text">{address}</p>
              <p className="card-text">{phone}</p>
            </div>
          </div>
          <div className="col-1">
            <div className="card-body ps-0">
              <button className="btn border-0">
                <i className="fa-regular fa-bookmark bookmark-icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Card;
