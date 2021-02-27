import React from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import FilmCard from '../film-card/film-card';
import PropTypes from 'prop-types';

const FilmList = (props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => <FilmCard key={film.id} film={film} />)}
    </div>
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
};

export default FilmList;
