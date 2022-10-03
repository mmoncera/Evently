import React from 'react';

function LoadingIndicator() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle text-center text-primary">
      <div className="spinner-border loading-indicator" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingIndicator;
