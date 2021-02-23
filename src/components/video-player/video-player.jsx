import React, {useEffect, useRef, useState} from 'react';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  const TIME_DELAY_MS = 1000;
  let timeoutID;
  const {defaultIsPlaying, film} = props;
  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying);

  const videoRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
      return;
    }
    videoRef.current.pause();
  }, [isPlaying]);

  const startPlaying = () => {
    setIsPlaying(true);
  };

  return (
    <div className="small-movie-card__image"
      onMouseEnter={() => {
        timeoutID = setTimeout(startPlaying, TIME_DELAY_MS);
      }}
      onMouseLeave={() => {
        setIsPlaying(false);
        clearTimeout(timeoutID);
      }}>
      <video ref={videoRef} src={isPlaying ? film.preview_video_link : ``} poster={film.preview_image} width="100%" muted>
      </video>
    </div>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  film: PropTypes.shape(PropTypesShapeOfFilm).isRequired,
  defaultIsPlaying: PropTypes.bool
};
