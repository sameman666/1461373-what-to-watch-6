import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({currentRating, handleRatingFieldChange, isSendingComment}) => {

  const AMOUNT_OF_STARS = 10;
  const RATING_STARS = new Array(AMOUNT_OF_STARS).fill(null);

  return (
    <div className="rating__stars">
      {RATING_STARS.map((_star, index) =>
        <React.Fragment key={`${index + 1}`}>
          <input disabled={isSendingComment} onChange={handleRatingFieldChange} checked={(index + 1).toString() === currentRating} className="rating__input" id={`star-${index + 1}`} type="radio" name="rating" value={`${index + 1}`}/>
          <label className="rating__label" htmlFor={`star-${index + 1}`}>{`Rating ${index + 1}`}</label>
        </React.Fragment>
      )}
    </div>
  );
};

RatingStars.propTypes = {
  stars: PropTypes.arrayOf(PropTypes.string),
  currentRating: PropTypes.string,
  handleRatingFieldChange: PropTypes.func,
  isSendingComment: PropTypes.bool
};

export default React.memo(RatingStars);
