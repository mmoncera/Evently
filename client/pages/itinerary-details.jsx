import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
import Select from '../components/select';
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
        setIsLoading(false);
        setItineraryEvents(data);
      })
      .catch(err => console.error(err));
  }

  function handleToggleHover(eventInfo) {
    const copyEventInfo = eventInfo.hovered
      ? { ...eventInfo, hovered: false }
      : { ...eventInfo, hovered: true };
    const copyItineraryEvents = [...itineraryEvents];
    const eventIndex = copyItineraryEvents.findIndex(event => event.itineraryEventId === eventInfo.itineraryEventId);
    copyItineraryEvents[eventIndex] = copyEventInfo;
    setItineraryEvents(copyItineraryEvents);
  }

  function handleAddItineraryEvent(eventInfo) {
    const { params } = parseRoute(window.location.hash);
    const itineraryId = params.get('itineraryId');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      },
      body: JSON.stringify({ itineraryId, eventInfo })
    };
    fetch('/api/itinerary-events', req)
      .then(res => res.json())
      .then(data => setItineraryEvents([...itineraryEvents, data]))
      .catch(err => console.error(err));
  }

  function handleDeleteItineraryEvent(itineraryEventId) {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      }
    };
    fetch(`/api/itinerary-events/${itineraryEventId}`, req)
      .then(res => setItineraryEvents(itineraryEvents.filter(itineraryEvent => itineraryEvent.itineraryEventId !== itineraryEventId)))
      .catch(err => console.error(err));
  }

  function renderItineraryDetailsTrashIcon(eventInfo) {
    const trashIconStyle = eventInfo.hovered ? 'solid' : 'regular';
    return (
      <button className="btn border-0 ms-1 p-0" onMouseEnter={() => handleToggleHover(eventInfo)} onMouseLeave={() => handleToggleHover(eventInfo)} onClick={() => handleDeleteItineraryEvent(eventInfo.itineraryEventId)}>
        <i className={`fa-${trashIconStyle} fa-trash-can fs-4`}></i>
      </button>
    );
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

  return (
    <div className="row justify-content-center pt-4">
      <div className="col-sm-10 col-md-9 col-lg-7">
        <a href="#itineraries">
          <i className="fa-regular fa-circle-left mb-3 fs-3"></i>
        </a>
        <h3 className="font-rubik">{itineraryName}</h3>
        <p className="font-rubik">{formattedItineraryDate}</p>
        <hr />
        <Select itineraryEvents={itineraryEvents} onAddItineraryEvent={handleAddItineraryEvent}/>
        <ul className="ps-0" >
          {itineraryEvents.map(itineraryEvent => {
            return <EventCard key={itineraryEvent.itineraryEventId} eventInfo={itineraryEvent} icon={renderItineraryDetailsTrashIcon(itineraryEvent)}/>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default ItineraryDetails;
