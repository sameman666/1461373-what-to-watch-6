import React, {useEffect} from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AddReviewForm from '../add-review-form/add-review-form';
import {connect} from 'react-redux';
import {fetchFilmById} from '../../store/api-actions.js';
import LoadingScreen from '../loading-screen/loading-screen';
import {AuthorizationStatus, AppRoute} from '../../const';
import {getAuthorizationStatus, getAvatar} from '../../store/user-data/selectors';
import {getFilm, getFilmLoadedStatus} from '../../store/film-data/selectors';

const AddReview = (props) => {
  const {film, isFilmLoaded, onLoadData, authorizationStatus, avatarUrl} = props;
  const filmId = Number(props.match.params.id);

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

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={film.background_image} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            {authorizationStatus === AuthorizationStatus.AUTH ?
              <div className="user-block__avatar">
                <Link to={AppRoute.MY_LIST}><img src={`${avatarUrl}`} alt="User avatar" width="63" height="63" /></Link>
              </div> :
              <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
            }
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.poster_image} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm id={film.id}/>
      </div>

    </section>
  );
};

AddReview.propTypes = {
  film: PropTypes.shape(PropTypesShapeOfFilm),
  setActiveCard: PropTypes.func,
  isFilmLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
};

const mapStateToProps = (state) => ({
  film: getFilm(state),
  isFilmLoaded: getFilmLoadedStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  avatarUrl: getAvatar(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(filmId) {
    dispatch(fetchFilmById(filmId));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
