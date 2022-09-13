import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
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
    fetch('/api/itineraries', req)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setItineraries(data);
      })
      .catch(err => console.error(err));
  }

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  if (isLoading) {
    return null;
  }

  const itinerariesMessage =
    itineraries.length === 0
      ? <h2 className="text-center font-rubik">Sorry, no itineraries found.</h2>
      : <h3 className="mb-3 font-rubik">My Itineraries</h3>;

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-9 col-md-7 col-lg-5">
        {itinerariesMessage}
        <ul className="ps-0" >
          {itineraries.map(itinerary => {
            return <ItineraryCard key={itinerary.itineraryId} itineraryInfo={itinerary} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Itineraries;
