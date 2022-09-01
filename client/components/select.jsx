import React, { useState, useEffect } from 'react';

function Select({ itineraryEvents, onAddItineraryEvent }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getBookmarks();
  }, []);

  function getBookmarks() {
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      }
    };
    fetch('/api/bookmarks', req)
      .then(res => res.json())
      .then(data => setOptions(data))
      .catch(err => console.error(err));
  }

  function handleSelection(event) {
    if (event.target.value === 'Add an event') {
      return;
    }
    const itineraryEvent = JSON.parse(event.target.value);
    onAddItineraryEvent(itineraryEvent);
  }

  return (
    <select className="form-select-sm col-5 mb-3 font-rubik" onChange={handleSelection}>
      <option value="Add an event">Add an event</option>
      {options.map(option => {
        const itineraryEventIndex = itineraryEvents.findIndex(({ alias }) => alias === option.alias);
        const isDisabled = itineraryEventIndex >= 0;
        return <option key={option.eventId} value={JSON.stringify(option)} disabled={isDisabled}>{option.name}</option>;
      })}
    </select>
  );
}

export default Select;
