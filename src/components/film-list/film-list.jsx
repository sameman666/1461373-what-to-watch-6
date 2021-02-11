import React, {useState} from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import FilmCard from '../film-card/film-card';
import PropTypes from 'prop-types';

const FilmList = (props) => {
  const {films} = props;
  const [, setActiveCard] = useState(``);

  return (
    films.map((film) => <FilmCard key={film.id} film={film} setActiveCard={setActiveCard}/>)
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
};

export default FilmList;
