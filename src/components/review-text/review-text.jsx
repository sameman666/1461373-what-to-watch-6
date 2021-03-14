import React from 'react';
import PropTypes from 'prop-types';

const RatingText = ({handleTextFieldChange, currentReview, isSendingComment}) => {
  return (
    <textarea disabled={isSendingComment} onChange={handleTextFieldChange} value={currentReview} maxLength="400" className="add-review__textarea" name="review" id="review" placeholder="Review text" />
  );
};

RatingText.propTypes = {
  currentReview: PropTypes.string,
  handleTextFieldChange: PropTypes.func,
  isSendingComment: PropTypes.bool
};

export default React.memo(RatingText);
