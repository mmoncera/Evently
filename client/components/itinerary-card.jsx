import React from 'react';

function ItineraryCard({ itineraryInfo }) {
  return (
    <div className="card mb-4 itinerary-card">
      <div className="row align-items-center g-0">
        <div className="col-11">
          <a className="card-body d-block px-4 text-decoration-none text-black" href={`#itinerary-details?itineraryInfo=${JSON.stringify(itineraryInfo)}`}>
            <p className="card-text mb-1 h3">
              {itineraryInfo.itineraryName}
            </p>
            <p className="card-text">{itineraryInfo.itinerarydate}</p>
          </a>
        </div>
        <div className="col-1">
          <div className="card-body ps-0">
            <button className="btn border-0 p-0 lh-1" type="button">
              <i className="fa-regular fa-trash-can itinerary-trash-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCard;
