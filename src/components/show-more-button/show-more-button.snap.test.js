import React from 'react';
import {render} from '@testing-library/react';
import ShowMoreButton from './show-more-button';

it(`Should ShowMore button render correctly`, () => {
  const {container} = render(<ShowMoreButton />);
  expect(container).toMatchSnapshot();
});
