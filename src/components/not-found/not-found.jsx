import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="page-content" style={{minHeight: 100 + `vh`, textAlign: `center`}}>
        <h1>
          404.
          <br />
          <small>Page not found</small>
        </h1>
        <Link to="/">Go to main page</Link>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
