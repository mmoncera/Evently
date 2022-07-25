import React from 'react';

function PageContainer({ children }) {
  return (
    <div className="bg-light">
      <div className="container page-height">{children}</div>
    </div>
  );
}

export default PageContainer;
