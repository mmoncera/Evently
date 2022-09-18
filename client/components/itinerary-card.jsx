import React, { useState } from 'react';
import DeleteItineraryModal from '../components/delete-itinerary-modal';

function ItineraryCard({ itineraryInfo, onDeleteItinerary }) {
  const [isHovered, setIsHovered] = useState(false);
  const { itineraryId, itineraryName, formattedItineraryDate } = itineraryInfo;

  function handleToggleHover() {
    setIsHovered(!isHovered);
  }

  const trashIconStyle = isHovered ? 'solid' : 'regular';

  return (
    <>
      <DeleteItineraryModal itineraryId={itineraryId} itineraryName={itineraryName} onDeleteItinerary={onDeleteItinerary} />
      <div className="card mb-4 border-0 itinerary-card">
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
              <button className="btn border-0 p-0 lh-1" type="button" data-bs-toggle="modal" data-bs-target={`#target-${itineraryId}`} onMouseEnter={handleToggleHover} onMouseLeave={handleToggleHover}>
                <i className={`fa-${trashIconStyle} fa-trash-can fs-4`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItineraryCard;
