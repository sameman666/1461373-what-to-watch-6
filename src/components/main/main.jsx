import React, {useState} from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import FilmList from '../film-list/film-list';
import PropTypes from 'prop-types';
import GenresList from '../genres-list/genres-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import {START_COUNT_FILMS_IN_LIST} from '../../const';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import {getGenre, getPromoFilm, getFilterMoviesByGenre} from '../../store/film-data/selectors';
import {getAuthorizationStatus, getAvatar} from '../../store/user-data/selectors';

const Main = (props) => {
  const {films, promoFilm, authorizationStatus, avatarUrl} = props;
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

Main.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  promoFilm: PropTypes.shape(PropTypesShapeOfFilm),
  genre: PropTypes.string,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};

export {Main};
export default connect(mapStateToProps, null)(Main);
