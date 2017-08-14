import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
      <div>
          <p style={{ paddingTop: '55px', textAlign: 'center'}}>
            My apologies, this page does not exist. Go to <Link to="/">Home Page</Link>.
          </p>
      </div>
  );
};
