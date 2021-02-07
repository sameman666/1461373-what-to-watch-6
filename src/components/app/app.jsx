import React from 'react';
import Main from '../main/main';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Film from '../film/film';
import MyList from '../my-list/my-list';
import NotFound from '../not-found/not-found';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import AddReview from '../add-review/add-review';

const App = (props) => {
  const {films, promoFilm} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            films = {films}
            promoFilm = {promoFilm}
          />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/mylist">
          <MyList />
        </Route>
        <Route exact path="/films/:id">
          <Film />
        </Route>
        <Route exact path="/films/:id/review">
          <AddReview />
        </Route>
        <Route exact path="/player/:id">
          <Player />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    "preview_image": PropTypes.string,
    "name": PropTypes.string
  })),
  promoFilm: PropTypes.shape({
    "name": PropTypes.string,
    "genre": PropTypes.string,
    "released": PropTypes.number,
    "poster_image": PropTypes.string,
    "background_image": PropTypes.string,
  })
};

export default App;
