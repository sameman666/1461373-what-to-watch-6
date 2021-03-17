import React, {useState} from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import FilmList from '../film-list/film-list';
import PropTypes from 'prop-types';
import GenresList from '../genres-list/genres-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import {START_COUNT_FILMS_IN_LIST} from '../../const';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, AppRoute, FavoriteStatuses} from '../../const';
import {getGenre, getPromoFilm, getFilterMoviesByGenre} from '../../store/film-data/selectors';
import {getAuthorizationStatus, getAvatar} from '../../store/user-data/selectors';
import {fetchFilmById, fetchCommentsById, addToFavorites} from '../../store/api-actions.js';

const Main = (props) => {
  const {films, promoFilm, authorizationStatus, avatarUrl, onLoadData, addToMyList} = props;
  const [countFilmsInFilter, setCountFilmsInFilter] = useState(START_COUNT_FILMS_IN_LIST);

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoFilm.background_image} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoFilm.poster_image} alt={promoFilm.name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={`${AppRoute.PLAYER}/${promoFilm.id}`} onClick={()=>onLoadData(promoFilm.id)} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" onClick={()=>addToMyList(promoFilm.id, FavoriteStatuses.ADD_TO_FAVORITE_STATUS)} type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList setStartCountFilmsInList={setCountFilmsInFilter}/>
          <FilmList films={films} countFilmsInList={countFilmsInFilter}/>

          {films.length > countFilmsInFilter &&
          <ShowMoreButton countFilmsInList={countFilmsInFilter} setCountFilmsInList={setCountFilmsInFilter}/>
          }
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  films: getFilterMoviesByGenre(state),
  authorizationStatus: getAuthorizationStatus(state),
  promoFilm: getPromoFilm(state),
  avatarUrl: getAvatar(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(filmId) {
    dispatch(fetchFilmById(filmId));
    dispatch(fetchCommentsById(filmId));
  },
  addToMyList(filmId, status) {
    dispatch(addToFavorites(filmId, status));
  }
});

Main.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  promoFilm: PropTypes.shape(PropTypesShapeOfFilm),
  genre: PropTypes.string,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  onLoadData: PropTypes.func.isRequired,
  addToMyList: PropTypes.func.isRequired
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
