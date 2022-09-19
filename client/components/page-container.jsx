import React from 'react';

function PageContainer({ children }) {
  return (
    <div className="container page-height">
      {children}
    </div>
  );
}

export default PageContainer;
