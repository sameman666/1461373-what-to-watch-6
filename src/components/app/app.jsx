import React, {useEffect} from 'react';
import {PropTypesShapeOfFilm, PropTypesShapeOfComment} from '../../prop-types-shape';
import Main from '../main/main';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Film from '../film/film';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import AddReview from '../add-review/add-review';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchFilmList} from "../../store/api-actions";
import {connect} from 'react-redux';

const App = (props) => {
  const {films, promoFilm, comments, isDataLoaded, onLoadData} = props;

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            promoFilm = {promoFilm}
          />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/mylist">
          <MyList
            films = {films}
          />
        </Route>
        <Route exact path="/films/:id">
          <Film
            films={films}
            film = {films[0]}
            comments = {comments}
          />
        </Route>
        <Route exact path="/films/:id/review">
          <AddReview
            film = {films[0]}
          />
        </Route>
        <Route exact path="/player/:id">
          <Player
            film = {films[0]}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  promoFilm: PropTypes.shape(PropTypesShapeOfFilm),
  comments: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfComment)),
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  films: state.films,
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchFilmList());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
