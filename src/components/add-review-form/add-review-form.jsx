import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postReview} from '../../store/api-actions.js';
import {setSendingCommentStatus} from '../../store/action.js';
import {getServerErrorStatus} from '../../store/server-error/selectors';
import {getCommentSendingStatus} from '../../store/comments-data/selectors';
import RatingStars from '../rating-stars/rating-stars';
import ReviewText from '../review-text/review-text';

const AddReviewForm = ({id, onSubmitReview, isServerError, sendCommentStatus, isSendingComment}) => {


  const MIN_COMMENT_LENGTH = 50;

  const [userRating, setUserRating] = useState({
    "rating": `3`,
  });

  const [userReview, setUserReview] = useState({
    "review": ``,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendCommentStatus();
    onSubmitReview({
      rating: userRating.rating,
      comment: userReview.review
    }, id);
  };

  const handleRatingFieldChange = useCallback(
      (evt) => {
        const {name, value} = evt.target;
        setUserRating({...userRating, [name]: value});
      }, [userRating]
  );

  const handleTextFieldChange = useCallback(
      (evt) => {
        const {name, value} = evt.target;
        setUserReview({...userReview, [name]: value});
      }, [userReview]
  );

  return (
    <form onSubmit={handleSubmit} action="#" className="add-review__form">
      <div className="rating">
        <RatingStars currentRating={userRating.rating} handleRatingFieldChange={handleRatingFieldChange} isSendingComment={isSendingComment}/>
      </div>
      {isServerError ?
        <div><p style={{color: `red`, textAlign: `center`}}>Произошла ошибка при отправке. Попробуйте еще раз</p></div> :
        ``
      }
      <div className="add-review__text">
        <ReviewText currentReview={userReview.review} handleTextFieldChange={handleTextFieldChange} isSendingComment={isSendingComment}/>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={(userRating.rating === null) || (userReview.review.length < MIN_COMMENT_LENGTH) || isSendingComment}>{isSendingComment ? `...Posting` : `Post`}</button>
        </div>

      </div>
    </form>
  );
};

AddReviewForm.propTypes = {
  id: PropTypes.number,
  onSubmitReview: PropTypes.func,
  isServerError: PropTypes.bool,
  isSendingComment: PropTypes.bool,
  sendCommentStatus: PropTypes.func
};

const mapStateToProps = (state) => ({
  isServerError: getServerErrorStatus(state),
  isSendingComment: getCommentSendingStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  sendCommentStatus() {
    dispatch(setSendingCommentStatus(true));
  },
  onSubmitReview(review, id) {
    dispatch(postReview(review, id));
  }
});

export {AddReviewForm};
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm);
