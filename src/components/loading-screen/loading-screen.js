import React from 'react';

const LoadingScreen = () => {
  return (
    <React.Fragment>
      <div className="page-content" style={{minHeight: 100 + `vh`, textAlign: `center`}}>
        <h1>Loading ...</h1>
      </div>
    </React.Fragment>
  );
};

export default LoadingScreen;
