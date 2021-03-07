import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Tabs from '../tabs/tabs';
import {PropTypesShapeOfFilm, PropTypesShapeOfComment} from '../../prop-types-shape';
import PropTypes from 'prop-types';
import FilmList from '../film-list/film-list';
import browserHistory from "../../browser-history";
import {connect} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchFilmById, fetchCommentsById} from '../../store/api-actions.js';
import {AuthorizationStatus, AppRoute} from '../../const';

const Film = (props) => {
  const MORE_LIKE_THIS_AMOUNT = 4;
  const {films, film, comments, isFilmLoaded, onLoadData, authorizationStatus, avatarUrl} = props;
  const filmId = Number(browserHistory.location.pathname.replace(/\D+/g, ``));

  useEffect(() => {
    if (!isFilmLoaded) {
      onLoadData(filmId);
    }
  }, [isFilmLoaded]);

  if (!isFilmLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const filterMoreLikeThis = (movies) => {
    let moreLikeThisFilms = movies.filter((movie) => movie.genre === film.genre && movie.name !== film.name);
    return moreLikeThisFilms.slice(0, MORE_LIKE_THIS_AMOUNT);
  };

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.background_image} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              {authorizationStatus === AuthorizationStatus.AUTH ?
                <div className="user-block__avatar">
                  <Link to={AppRoute.MY_LIST}><img src={`${avatarUrl}`} alt="User avatar" width="63" height="63" /></Link>
                </div> :
                <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
              }
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <Link to={`${AppRoute.FILMS}/${film.id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link> :
                  ``
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.poster_image} alt={`${film.name} poster`} width="218" height="327" />
            </div>
            <Tabs film={film} comments={comments}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={filterMoreLikeThis(films)}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

Film.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  film: PropTypes.shape(PropTypesShapeOfFilm).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfComment)),
  isFilmLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};

const mapStateToProps = (state) => ({
  film: state.film,
  isFilmLoaded: state.isFilmLoaded,
  authorizationStatus: state.authorizationStatus,
  avatarUrl: state.avatarUrl,
  comments: state.comments
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(filmId) {
    dispatch(fetchFilmById(filmId));
    dispatch(fetchCommentsById(filmId));
  },
});

export {Film};
export default connect(mapStateToProps, mapDispatchToProps)(Film);
