import React from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

const FilmCard = (props) => {
  const {film, setActiveCard} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        setActiveCard(film);
      }}>
      <VideoPlayer defaultIsPlaying={false} film={film}/>
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
