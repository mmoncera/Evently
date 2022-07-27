import React, { useState, useEffect, useContext } from 'react';
import Redirect from '../components/redirect';
import Card from '../components/card';
import { AppContext, parseRoute } from '../lib';

function Results() {
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
        setIsSearching(false);
        if (data.error) {
          return setError('Sorry, no events found.');
        }
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
          ? <h2 className="text-center font-rubik">{error}</h2>
          : (
            <>
              <h3 className="mb-3 font-rubik">{`${term} near ${location}`}</h3>
              <ul className="ps-0" >
                {
                  results.map(business => {
                    return <Card key={business.id} businessInfo={business} />;
                  })
                }
              </ul>
            </>
            )
        }
      </div>
    </div>
  );
}

export default Results;
