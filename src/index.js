import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {temporaryPromoFilm, temporaryComments} from './mocks/films';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ActionCreator} from './store/action';
import {checkAuth} from "./store/api-actions";
import {AuthorizationStatus} from "./const";

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
        promoFilm={temporaryPromoFilm}
        comments={temporaryComments}
      />
    </Provider>,
    document.querySelector(`#root`)
);
