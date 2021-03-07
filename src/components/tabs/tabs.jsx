import React, {useState} from 'react';
import {PropTypesShapeOfFilm, PropTypesShapeOfComment} from '../../prop-types-shape';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const Tabs = (props) => {
  const TabTypes = {
    OVERVIEW: `Overview`,
    DETAILS: `Details`,
    REVIEWS: `Reviews`
  };

  const Ratings = {
    BAD: 0,
    NORMAL: 3,
    GOOD: 5,
    VERY_GOOD: 8,
    AWESOME: 10
  };

  const {film, comments} = props;
  const [activeTab, setActiveTab] = useState(TabTypes.OVERVIEW);

  const setActiveItem = (evt) => {
    setActiveTab(evt.target.textContent);
  };

  const ratingToText = (rating) => {
    switch (rating) {
      case (rating > Ratings.BAD && rating <= Ratings.NORMAL) :
        return `Bad`;
      case (rating > Ratings.NORMAL && rating <= Ratings.GOOD) :
        return `Normal`;
      case (rating > Ratings.GOOD && rating <= Ratings.VERY_GOOD) :
        return `Good`;
      case (rating > Ratings.VERY_GOOD && rating <= Ratings.AWESOME) :
        return `Very good`;
      case (rating > Ratings.AWESOME) :
        return `Awesome`;
    }
    return ``;
  };

  const formatRunTime = (minutes) =>{
    dayjs.extend(duration);
    return dayjs.duration(minutes, `minutes`).format(`H[h] mm[m]`);
  };

  const showRelevantInfo = (tabType) => {
    switch (tabType) {
      case TabTypes.OVERVIEW :
        return (
          <React.Fragment>
            <div className="movie-rating">
              <div className="movie-rating__score">{film.rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{ratingToText(film.rating)}</span>
                <span className="movie-rating__count">{film.scores_count} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{film.description}</p>

              <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)}</strong></p>
            </div>
          </React.Fragment>
        );
      case TabTypes.DETAILS :
        return (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{film.director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {film.starring.join(`, `)}
                </span>
              </p>
            </div>
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{formatRunTime(film.run_time)}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{film.genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{film.released}</span>
              </p>
            </div>
          </div>
        );
      case TabTypes.REVIEWS :
        return (
          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              {comments.map((comment) =>
                <div className="review" key={`${comment.id}`}>
                  <blockquote className="review__quote">
                    <p className="review__text">{comment.comment}</p>

                    <footer className="review__details">
                      <cite className="review__author">{comment.user.name}</cite>
                      <time className="review__date" dateTime={dayjs(comment.date).format(`YYYY-MM-DD`)}>{dayjs(comment.date).format(`MMMM DD, YYYY`)}</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{comment.rating}</div>
                </div>
              )}
            </div>
          </div>
        );
    }
    return ``;
  };

  return (
    <React.Fragment>
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(TabTypes).map((tabType, index) =>
              <li key={index} className={`movie-nav__item ${activeTab === tabType ? `movie-nav__item--active` : ``}`}>
                <a className="movie-nav__link" style={{cursor: `pointer`}}
                  onClick={
                    setActiveItem
                  }>
                  {tabType}
                </a>
              </li>
            )}
          </ul>
        </nav>
        {showRelevantInfo(activeTab)}
      </div>
    </React.Fragment>
  );
};

export default Tabs;

Tabs.propTypes = {
  film: PropTypes.shape(PropTypesShapeOfFilm).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfComment))
};
