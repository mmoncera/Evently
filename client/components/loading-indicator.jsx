import React from 'react';

function LoadingIndicator() {
  return (
    <div className="d-flex justify-content-center mt-5 text-primary">
      <div className="spinner-border loading-indicator" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingIndicator;
