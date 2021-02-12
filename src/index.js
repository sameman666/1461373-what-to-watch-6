import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {temporaryFilms, temporaryPromoFilm} from './mocks/films';

ReactDOM.render(
    <App
      films={temporaryFilms}
      promoFilm={temporaryPromoFilm}
    />,
    document.querySelector(`#root`)
);
