import React from 'react';

function PageContainer({ children }) {
  return (
    <div>
      <div className="container page-height">{children}</div>
    </div>
  );
}

export default PageContainer;
