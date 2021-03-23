import React from 'react';
import {render} from '@testing-library/react';
import UnavailableServerScreen from './unavailable-server-screen';

it(`Should Unavailable Server Screen render correctly`, () => {
  const {container} = render(<UnavailableServerScreen />);
  expect(container).toMatchSnapshot();
});
