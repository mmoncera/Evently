import React from 'react';

function PageContainer({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default PageContainer;
