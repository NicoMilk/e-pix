import React from 'react';
import renderer from 'react-test-renderer';

import Favorites from '../components/Favorites';

describe('Favorites', () => {
  it('test my function', () => {
    const wrapper = renderer.create(<Favorites />);
    const inst = wrapper.getInstance();
    expect(inst.myFunction('orange')).toBe('orange...!');
  });
});