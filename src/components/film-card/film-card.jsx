import React from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import {AppRoute} from '../../const';
import {connect} from 'react-redux';
import {fetchFilmById, fetchCommentsById} from '../../store/api-actions.js';

const FilmCard = (props) => {
  const {film, onLoadData} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <Link to={`${AppRoute.FILMS}/${film.id}`} onClick={()=>onLoadData(film.id)}><VideoPlayer defaultIsPlaying={false} film={film}/></Link>
      <h3 className="small-movie-card__title">
        <Link to={`${AppRoute.FILMS}/${film.id}`} className="small-movie-card__link" onClick={()=>onLoadData(film.id)}>{film.name}</Link>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape(PropTypesShapeOfFilm),
  setActiveCard: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData(filmId) {
    dispatch(fetchFilmById(filmId));
    dispatch(fetchCommentsById(filmId));
  },
});

export {FilmCard};
export default connect(null, mapDispatchToProps)(FilmCard);
