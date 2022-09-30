import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
import LoadingIndicator from '../components/loading-indicator';
import ItineraryCard from '../components/itinerary-card';
import { AppContext } from '../lib';

function Itineraries() {
  const [isLoading, setIsLoading] = useState(true);
  const [itineraries, setItineraries] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    getItineraries();
  }, []);

  function getItineraries() {
    const req = {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      }
    };
    fetch('/api/itineraries/user-id', req)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setItineraries(data);
      })
      .catch(err => console.error(err));
  }

  function handleDeleteItinerary(itineraryId) {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('jwt')
      }
    };
    fetch(`/api/itinerary-events/itinerary-id/${itineraryId}`, req)
      .then(res => {
        fetch(`/api/itineraries/user-id/itinerary-id/${itineraryId}`, req)
          .then(res => setItineraries(itineraries.filter(itinerary => itinerary.itineraryId !== itineraryId)))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const itinerariesMessage =
    itineraries.length === 0
      ? <h3 className="text-center font-rubik">Sorry, no itineraries found.</h3>
      : <h3 className="mb-3 font-rubik">My Itineraries</h3>;

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-9 col-md-7 col-lg-5">
        {itinerariesMessage}
        <ul className="ps-0" >
          {itineraries.map(itinerary => {
            return <ItineraryCard key={itinerary.itineraryId} itineraryInfo={itinerary} onDeleteItinerary={handleDeleteItinerary} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Itineraries;
