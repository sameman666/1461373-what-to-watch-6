import React, {useEffect} from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAvatar} from '../../store/user-data/selectors';
import {getFavoritesLoadedStatus, getFavoriteFilms} from '../../store/film-data/selectors';
import {fetchFavorites, fetchFilmById} from '../../store/api-actions.js';
import LoadingScreen from '../loading-screen/loading-screen';
import VideoPlayer from '../video-player/video-player';
import {AppRoute} from '../../const';

const MyList = (props) => {
  const {favoriteFilms, avatarUrl, onLoadFavorites, isFavoriteFilmsLoaded, onLoadFilm} = props;

  useEffect(() => {
    if (!isFavoriteFilmsLoaded) {
      onLoadFavorites();
    }
  }, [isFavoriteFilmsLoaded]);

  if (!isFavoriteFilmsLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={`${avatarUrl}`} alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          {favoriteFilms.map((film) =>
            <article className="small-movie-card catalog__movies-card" key={film.id}>
              <Link to={`${AppRoute.FILMS}/${film.id}`} onClick={()=>onLoadFilm(film.id)}>
                <VideoPlayer defaultIsPlaying={false} film={film}/>
              </Link>
              <h3 className="small-movie-card__title">
                <Link to={`${AppRoute.FILMS}/${film.id}`} className="small-movie-card__link" onClick={()=>onLoadFilm(film.id)}>{film.name}</Link>
              </h3>
            </article>
          )}
        </div>
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
  );
};

const mapStateToProps = (state) => ({
  avatarUrl: getAvatar(state),
  isFavoriteFilmsLoaded: getFavoritesLoadedStatus(state),
  favoriteFilms: getFavoriteFilms(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavorites() {
    dispatch(fetchFavorites());
  },
  onLoadFilm(id) {
    dispatch(fetchFilmById(id));
  }
});

MyList.propTypes = {
  favoriteFilms: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  avatarUrl: PropTypes.string,
  isFavoriteFilmsLoaded: PropTypes.bool.isRequired,
  onLoadFavorites: PropTypes.func.isRequired,
  onLoadFilm: PropTypes.func.isRequired
};

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
