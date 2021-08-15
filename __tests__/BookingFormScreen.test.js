import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import BookingFormScreen from '../screens/BookingFormScreen';

//Check correct number of component children
describe('<BookingFormScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<BookingFormScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render BookingFormScreen.js', () => {
  render(<BookingFormScreen/>);

})