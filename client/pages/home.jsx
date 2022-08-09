import React, { useState, useContext } from 'react';
import Redirect from '../components/redirect';
import { AppContext } from '../lib';

function Home() {
  const [searchInfo, setSearchInfo] = useState({ term: '', location: '' });
  const { user } = useContext(AppContext);

  function handleChange(event) {
    const { name, value } = event.target;
    setSearchInfo({ ...searchInfo, [name]: value });
  }

  function handleSearch(event) {
    event.preventDefault();
    window.location.hash = `#results?term=${searchInfo.term}&location=${searchInfo.location}`;
  }

  if (!user) {
    return <Redirect to="sign-in" />;
  }

  return (
    <div className="row justify-content-center home-container-padding">
      <div className="col-sm-10 col-md-9 col-lg-7">
        <h1 className="text-center mb-4 font-rubik">Find an Event</h1>
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input
            className="form-control"
            type="text"
            name="term"
            value={searchInfo.term}
            placeholder="food, drinks, fun..."
            required
            autoFocus
            onChange={handleChange} />
            <input
            className="form-control"
            type="text"
            name="location"
            value={searchInfo.location}
            placeholder="location"
            required
            onChange={handleChange} />
            <button className="btn btn-primary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
