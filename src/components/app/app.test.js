import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from '../../const';
import App from './app';
import thunk from 'redux-thunk';

const api = jest.fn();
const middlleware = thunk.withExtraArgument(api);
const mockStore = configureStore([middlleware]);

describe(`Test routing`, () => {

  const store = {
    FILM_DATA: {
      genre: `All genres`,
      films: [],
      favoriteFilms: [],
      promoFilm: {},
      film: {
        "starring": [],
        "id": 0,
        "rating": 1
      },
      isDataLoaded: true,
      isFilmLoaded: true,
      isFavoriteFilmsLoaded: true
    },
    SERVER_ERROR: {
      isServerError: false
    },
    USER_DATA: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    },
    COMMENTS_DATA: {
      comments: [],
      isSendingComment: false
    },
  };

  const mockedStore = mockStore(store);

  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={mockedStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it(`Render 'SignInPage' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(`/login`);
    render(
        <redux.Provider store={mockedStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  });

  it(`Render 'MyList' when user navigate to '/mylist' url`, () => {
    const history = createMemoryHistory();
    history.push(`/mylist`);

    render(
        <redux.Provider store={mockStore({...store, USER_DATA: {authorizationStatus: AuthorizationStatus.AUTH}})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it(`Render 'Film' page when user navigate to '/films/:id' url`, () => {
    const history = createMemoryHistory();

    history.push(`/films/1`);
    render(
        <redux.Provider store={mockedStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  it(`Render 'AddReview' when user navigate to '/films/:id/review' url`, () => {
    const history = createMemoryHistory();

    history.push(`/films/:id/review`);
    render(
        <redux.Provider store={mockStore({...store, USER_DATA: {authorizationStatus: AuthorizationStatus.AUTH}})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it(`Render 'Player' page when user navigate to '/player/:id' url`, () => {
    const history = createMemoryHistory();

    history.push(`/player/:id`);
    render(
        <redux.Provider store={mockedStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it(`Render 'NotFound' page when user navigate to '/404' url`, () => {
    const history = createMemoryHistory();

    history.push(`/404`);
    render(
        <redux.Provider store={mockedStore}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
