import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

import {addNumbers} from '../src/mathUtils';

import App from '../App';


describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

test('render App.js', () => {
  const {debug} = render(<App/>);
  debug();

})

test('add numbers', () =>{
  expect(addNumbers(1,2)).toEqual(3);
});

