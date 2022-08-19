import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
import EventCard from '../components/event-card';
import { AppContext, parseRoute } from '../lib';

function ItineraryDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [itineraryEvents, setItineraryEvents] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    getItineraryEvents();
  }, []);

  function getItineraryEvents() {
    const { params } = parseRoute(window.location.hash);
    const itineraryId = params.get('itineraryId');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      }
    };
    fetch(`/api/itinerary-events/${itineraryId}`, req)
      .then(res => res.json())
      .then(data => {
        setItineraryEvents(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  if (isLoading) {
    return null;
  }

  const { params } = parseRoute(window.location.hash);
  const itineraryName = params.get('itineraryName');
  const formattedItineraryDate = params.get('formattedItineraryDate');

  const itineraryDetailsTrashIcon =
    <button className="btn border-0 ms-2 p-0">
      <i className="fa-solid fa-trash-can itinerary-details-trash-icon"></i>
    </button>;

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-10 col-md-9 col-lg-7">
        <h3 className="font-rubik">{itineraryName}</h3>
        <p className="font-rubik">{formattedItineraryDate}</p>
        <hr />
        <select className="form-select-sm mb-3 px-2">
            <option value="Add an Event">Add an event</option>
            <option value="Example">Example</option>
        </select>
        <ul className="ps-0" >
          {itineraryEvents.map(itineraryEvent => {
            return <EventCard key={itineraryEvent.itineraryEventId} eventInfo={itineraryEvent} icon={itineraryDetailsTrashIcon}/>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default ItineraryDetails;

// Clean up
