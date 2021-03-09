import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {postReview} from '../../store/api-actions.js';

const AddReviewForm = ({id, onSubmitReview, isServerError}) => {

  const RATING_STARS = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`];
  const [userReview, setUserReview] = useState({
    "rating": `3`,
    "review": ``,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitReview({
      rating: userReview.rating,
      comment: userReview.review
    }, id);
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setUserReview({...userReview, [name]: value});
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {RATING_STARS.map((star, index) =>
            <React.Fragment key={`${index + 1}`}>
              <input onChange={handleFieldChange} checked={star === userReview.rating} className="rating__input" id={`star-${index + 1}`} type="radio" name="rating" value={`${index + 1}`}/>
              <label className="rating__label" htmlFor={`star-${index + 1}`}>{`Rating ${index + 1}`}</label>
            </React.Fragment>
          )}
        </div>
      </div>
      {isServerError ?
        <div><p style={{color: `red`, textAlign: `center`}}>Произошла ошибка при отправке. Попробуйте еще раз</p></div> :
        ``
      }
      <div className="add-review__text">
        <textarea onChange={handleFieldChange} value={userReview.review} minLength="50" maxLength="400" className="add-review__textarea" name="review" id="review" placeholder="Review text" />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
};

AddReviewForm.propTypes = {
  id: PropTypes.number,
  onSubmitReview: PropTypes.func,
  isServerError: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isServerError: state.isServerError
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitReview(review, id) {
    dispatch(postReview(review, id));
  }
});

export {AddReviewForm};
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm);
