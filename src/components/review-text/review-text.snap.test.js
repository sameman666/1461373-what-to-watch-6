import React from 'react';
import {render} from '@testing-library/react';
import ReviewText from './review-text';

it(`Should ReviewText block render correctly`, () => {
  const {container} = render(<ReviewText />);
  expect(container).toMatchSnapshot();
});
