import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchFilmById, fetchCommentsById} from '../../store/api-actions.js';
import {getFilm, getFilmLoadedStatus} from '../../store/film-data/selectors';
import {AppRoute} from '../../const';

const Player = (props) => {
  const {film, isFilmLoaded, onLoadData} = props;
  const filmId = Number(props.match.params.id);

  const [playStatus, setPlayStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(`00:00:00`);

  const fullVideoRef = useRef(``);

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

  const playVideo = () => {
    setPlayStatus(true);
    fullVideoRef.current.play();
  };

  const pauseVideo = () => {
    setPlayStatus(false);
    fullVideoRef.current.pause();
  };

  const toggleFullScreen = ()=> {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const convertSecondsToElapsedTime = (sec) => {
    const hours = Math.floor(sec / 60 / 60);
    const minutes = Math.floor(sec / 60) - (hours * 60);
    const seconds = Math.floor(sec % 60);
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleProgressUpdate = () => {
    setProgress((fullVideoRef.current.currentTime / fullVideoRef.current.duration) * 100);
    setElapsedTime(convertSecondsToElapsedTime(fullVideoRef.current.duration - fullVideoRef.current.currentTime));
  };

  return (
    <div className="player">
      <video src={`${film.preview_video_link}`} className="player__video" poster={film.background_image} ref={fullVideoRef} onTimeUpdate={handleProgressUpdate}></video>

      <Link to={`${AppRoute.FILMS}/${filmId}`} type="button" className="player__exit" style={{textDecoration: `none`}}>Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{elapsedTime}</div>
        </div>

        <div className="player__controls-row">

          {!playStatus &&
          <button
            type="button"
            className="player__play"
            onClick={() => playVideo()}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          }

          {playStatus &&
          <button
            type="button"
            className="player__play"
            onClick={() => pauseVideo()}
          >
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
          </button>
          }

          <div className="player__name">{film.name}</div>

          <button
            onClick={() => toggleFullScreen()}
            type="button"
            className="player__full-screen"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  film: PropTypes.shape(PropTypesShapeOfFilm),
  setActiveCard: PropTypes.func,
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
  isFilmLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getFilm(state),
  isFilmLoaded: getFilmLoadedStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(filmId) {
    dispatch(fetchFilmById(filmId));
    dispatch(fetchCommentsById(filmId));
  },
});

export {Player};
export default connect(mapStateToProps, mapDispatchToProps)(Player);
