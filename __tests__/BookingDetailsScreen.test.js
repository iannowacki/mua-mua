import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';

//Check correct number of component children
describe('<BookingDetailsScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<BookingDetailsScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render BookingDetailsScreen.js', () => {
  render(<BookingDetailsScreen/>);

})

