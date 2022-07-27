import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
import { AppContext, parseRoute } from '../lib';

function Results() {
  /* eslint-disable no-unused-vars */
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const { user } = useContext(AppContext);

  const { params } = parseRoute(window.location.hash);
  const term = params.get('term');
  const location = params.get('location');

  useEffect(() => {
    fetch(`/api/search-yelp/?term=${term}&location=${location}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.error) {
          setError('Sorry, no events found.');
        }
        setIsSearching(false);
        setResults(data);
      })
      .catch(err => console.error(err));
  }, [term, location]);

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  if (isSearching) {
    return null;
  }

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-10 col-md-9 col-lg-7">
        {error
          ? <h1 className="text-center">{error}</h1>
          : <h3 className="mb-3">{`${term} near ${location}`}</h3>
        }
      </div>
    </div>
  );
}

export default Results;
