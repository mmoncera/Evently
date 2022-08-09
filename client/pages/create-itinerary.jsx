import React, { useState, useContext } from 'react';
import Redirect from '../components/redirect';
import { parseRoute, AppContext } from '../lib';

function CreateItinerary() {
  const [itineraryInfo, setItineraryInfo] = useState({ itineraryName: '', itineraryDate: '' });
  const { user } = useContext(AppContext);

  function handleChange(event) {
    const { name, value } = event.target;
    setItineraryInfo({ ...itineraryInfo, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const reqItineraries = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      },
      body: JSON.stringify({ itineraryInfo })
    };
    fetch('/api/itineraries', reqItineraries)
      .then(res => res.json())
      .then(data => {
        const { itineraryId } = data;
        const { params } = parseRoute(window.location.hash);
        const bookmark = JSON.parse(params.get('bookmark'));
        const reqItineraryEvents = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem('jwt')
          },
          body: JSON.stringify({ itineraryId, bookmark })
        };
        fetch('/api/itinerary-events', reqItineraryEvents)
          .then(res => res.json())
          .then(data => {
            window.location.hash = '#itineraries';
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  function setMinDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  }

  if (!user) {
    return <Redirect to='sign-in' />;
  }

  return (
    <div className="row justify-content-center py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <h1 className="text-center text-nowrap mb-4 font-rubik">Create Itinerary</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="itineraryName"
              value={itineraryInfo.itineraryName}
              placeholder="Itinerary Name"
              required
              autoFocus
              onChange={handleChange}
            />
          </div>
          <div>
            <input
            className="form-control"
            type="date"
            name="itineraryDate"
            value={itineraryInfo.itineraryDate}
            required
            min={setMinDate()}
            onChange={handleChange} />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <a className="btn btn-secondary me-1 create-itinerary-button font-rubik" href="#bookmarks">Cancel</a>
            <button className="btn btn-primary ms-1 create-itinerary-button font-rubik"
            type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItinerary;

// clean up
