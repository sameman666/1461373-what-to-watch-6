import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {temporaryFilms, temporaryPromoFilm, temporaryComments} from './mocks/films';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
      <App
        films={temporaryFilms}
        promoFilm={temporaryPromoFilm}
        comments={temporaryComments}
      />
    </Provider>,
    document.querySelector(`#root`)
);
