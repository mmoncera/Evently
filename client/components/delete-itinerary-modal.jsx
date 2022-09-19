import React from 'react';

function DeleteItineraryModal({ itineraryId, itineraryName, onDeleteItinerary }) {
  function handleDeleteItinerary() {
    onDeleteItinerary(itineraryId);
  }

  return (
    <div className="modal fade" id={`target-${itineraryId}`} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered mx-auto modal-content-container">
        <div className="modal-content border-0">
          <div className="modal-header mb-2 bg-primary border-0 text-white font-rubik">
            <h5 className="modal-title">Confirmation</h5>
          </div>
          <div className="modal-body">
            <span className="text-muted">Are you sure you want to delete{' '}   <i className="fw-bold text-black">{itineraryName}</i>?</span>
          </div>
          <div className="modal-footer justify-content-start border-0 font-rubik">
            <button className="btn btn-sm btn-primary" type="button" data-bs-dismiss="modal" onClick={handleDeleteItinerary}>Yes, delete it</button>
            <button className="btn btn-sm" type="button" data-bs-dismiss="modal">No, keep it</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteItineraryModal;
