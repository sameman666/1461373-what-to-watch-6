import React, {useState} from 'react';

const AddReviewForm = () => {

  const RATING_STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [, setUserReview] = useState(``);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleFieldChange = (evt) => {
    const {value} = evt.target;
    setUserReview(value);
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {RATING_STARS .map((starNumber) =>
            <React.Fragment key={`${starNumber}`}>
              <input className="rating__input" id={`star-${starNumber}`} type="radio" name="rating" value={`${starNumber}`}/>
              <label className="rating__label" htmlFor={`star-${starNumber}`}>{`Rating ${starNumber}`}</label>
            </React.Fragment>
          )}
        </div>
      </div>

      <div className="add-review__text">
        <textarea onChange={handleFieldChange} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
};

export default AddReviewForm;
