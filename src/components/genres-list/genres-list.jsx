import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeGenre} from '../../store/action';
import {START_COUNT_FILMS_IN_LIST, MAX_COUNT_GENRES_IN_LIST} from '../../const';
import {getGenre, getUniqueGenres} from '../../store/film-data/selectors';

const GenresList = (props) => {
  const {genre, changeCurrentGenre, setStartCountFilmsInList, uniqueGenres} = props;

  const handleResetCountFilms = () => {
    setStartCountFilmsInList(START_COUNT_FILMS_IN_LIST);
  };

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.slice(0, MAX_COUNT_GENRES_IN_LIST).map((uniqueGenre) =>
        <li key={uniqueGenre} className={`catalog__genres-item ${uniqueGenre === genre ? `catalog__genres-item--active` : ``}`}>
          <a className="catalog__genres-link" style={{cursor: `pointer`}}
            onClick={() => {
              changeCurrentGenre(uniqueGenre);
              handleResetCountFilms();
            }}>
            {uniqueGenre}
          </a>
        </li>
      )}
    </ul>
  );

};

GenresList.propTypes = {
  changeCurrentGenre: PropTypes.func.isRequired,
  genre: PropTypes.string,
  setStartCountFilmsInList: PropTypes.func.isRequired,
  uniqueGenres: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  uniqueGenres: getUniqueGenres(state)
});


const mapDispatchToProps = (dispatch) => ({
  changeCurrentGenre(genre) {
    dispatch(changeGenre(genre));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
