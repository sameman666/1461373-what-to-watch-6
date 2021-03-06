import React, {useEffect} from 'react';
import {PropTypesShapeOfFilm, PropTypesShapeOfComment} from '../../prop-types-shape';
import Main from '../main/main';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import Film from '../film/film';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import AddReview from '../add-review/add-review';
import LoadingScreen from '../loading-screen/loading-screen';
import UnavailableServerScreen from '../unavailable-server-screen/unavailable-server-screen';
import {fetchFilmList, fetchPromoFilm} from "../../store/api-actions";
import {connect} from 'react-redux';
import PrivateRoute from '../private-route/private-route';
import {AppRoute} from '../../const';
import {getFilms, getGenre, getDataLoadedStatus} from '../../store/film-data/selectors';
import {getServerErrorStatus} from '../../store/server-error/selectors';

const App = (props) => {
  const {films, isDataLoaded, onLoadData, isServerError} = props;

  if (isServerError) {
    return (
      <UnavailableServerScreen />
    );
  }

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
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <Main />
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        <SignIn />
      </Route>
      <PrivateRoute exact
        path="/mylist"
        render={() => <MyList/>}
      />
      <Route exact
        path="/films/:id"
        render={(prop) => <Film {...prop} films={films}/>}
      />
      <PrivateRoute exact
        path="/films/:id/review"
        render={(prop) => <AddReview {...prop}
        />}
      />
      <Route exact
        path="/player/:id"
        render={(prop) => <Player {...prop} />}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfFilm)),
  promoFilm: PropTypes.shape(PropTypesShapeOfFilm),
  comments: PropTypes.arrayOf(PropTypes.shape(PropTypesShapeOfComment)),
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  isServerError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  films: getFilms(state),
  isDataLoaded: getDataLoadedStatus(state),
  isServerError: getServerErrorStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchFilmList());
    dispatch(fetchPromoFilm());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
