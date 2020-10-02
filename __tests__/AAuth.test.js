import React from 'react';
import renderer from 'react-test-renderer';

import myFunction from '../components/Plop';

describe('myFunction', () => {
  it('test my function', () => {

    expect(myFunction('orange')).toBe('orange...!');
  });
});