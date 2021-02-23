import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {temporaryFilms, temporaryPromoFilm, temporaryComments} from './mocks/films';

ReactDOM.render(
    <App
      films={temporaryFilms}
      promoFilm={temporaryPromoFilm}
      comments={temporaryComments}
    />,
    document.querySelector(`#root`)
);
