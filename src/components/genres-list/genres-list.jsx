import React from 'react';
import PropTypes from 'prop-types';
import {PropTypesShapeOfFilm} from '../../prop-types-shape';
import {connect} from 'react-redux';
import {changeGenre} from '../../store/action';
import {Filters, START_COUNT_FILMS_IN_LIST} from '../../const';
import {getGenre, getFilms} from '../../store/film-data/selectors';

const GenresList = (props) => {
  const {films, genre, changeCurrentGenre, setStartCountFilmsInList} = props;

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
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  changeCurrentGenre: PropTypes.func.isRequired,
  genre: PropTypes.string,
  setStartCountFilmsInList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  films: getFilms(state),
});


const mapDispatchToProps = (dispatch) => ({
  changeCurrentGenre(genre) {
    dispatch(changeGenre(genre));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
