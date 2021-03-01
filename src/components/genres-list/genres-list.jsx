import React from 'react';
import PropTypes from 'prop-types';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {Filters, START_COUNT_FILMS_IN_LIST} from '../../const';

const GenresList = (props) => {
  const {films, genre, changeGenre, setStartCountFilmsInList} = props;

  const uniqueGenres = Array.from(new Set(films.map((film)=>film.genre)));
  uniqueGenres.unshift(Filters.DEFAULT);

  const handleResetCountFilms = () => {
    setStartCountFilmsInList(START_COUNT_FILMS_IN_LIST);
  };

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((uniqueGenre, index) =>
        <li key={index} className={`catalog__genres-item ${uniqueGenre === genre ? `catalog__genres-item--active` : ``}`}>
          <a className="catalog__genres-link" style={{cursor: `pointer`}}
            onClick={() => {
              changeGenre(uniqueGenre);
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
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  changeGenre: PropTypes.func.isRequired,
  genre: PropTypes.string,
  setStartCountFilmsInList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  films: state.films,
});


const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);