import React from 'react';

function ItineraryCard({ itineraryInfo }) {
  const { itineraryId, itineraryName, formattedItineraryDate } = itineraryInfo;
  return (
    <div className="card mb-4 itinerary-card">
      <div className="row align-items-center g-0">
        <div className="col-11">
          <a className="card-body d-block px-4 text-decoration-none text-black" href={`#itinerary-details?itineraryId=${itineraryId}&itineraryName=${encodeURIComponent(itineraryName)}&formattedItineraryDate=${formattedItineraryDate}`}>
            <p className="card-text mb-1 h3">
              {itineraryName}
            </p>
            <p className="card-text">
              {formattedItineraryDate}
            </p>
          </a>
        </div>
        <div className="col-1">
          <div className="card-body ps-0">
            <button className="btn border-0 p-0 lh-1" type="button">
              <i className="fa-regular fa-trash-can itinerary-card-trash-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCard;
