import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const temporaryFilms = [
  {
    "name": `Macbeth`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/macbeth.jpg`,
  },
  {
    "name": `Bronson`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/bronson.jpg`,
  },
  {
    "name": `We need to talk about Kevin`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/we-need-to-talk-about-kevin.jpg`,
  },
  {
    "name": `Dardjeeling Limited`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/dardjeeling_limited.jpg`,
  },
];

const temporaryPromoFilm = {
  "name": `Macbeth`,
  "genre": `Drama`,
  "released": 2015,
  "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Macbeth.jpg`,
};

ReactDOM.render(
    <App
      films={temporaryFilms}
      promoFilm={temporaryPromoFilm}
    />,
    document.querySelector(`#root`)
);
