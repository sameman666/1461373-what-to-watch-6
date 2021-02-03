import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';

const App = (props) => {
  const {films, promoFilm} = props;
  return (
    <Main
      films = {films}
      promoFilm = {promoFilm}
    />
  );
};

App.propTypes = {
  films: PropTypes.array,
  promoFilm: PropTypes.object
};

export default App;
