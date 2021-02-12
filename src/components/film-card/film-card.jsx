import React from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const FilmCard = (props) => {
  const {film, setActiveCard} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseOver={() => {
        setActiveCard(film);
      }}>
      <div className="small-movie-card__image">
        <img src={film.preview_image} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <Link to={`/films/${film.id}`} className="small-movie-card__link">{film.name}</Link>
      </h3>
    </article>);
};

FilmCard.propTypes = {
  film: PropTypes.shape(PropTypesShapeOfFilm),
  setActiveCard: PropTypes.func
};

export default FilmCard;
