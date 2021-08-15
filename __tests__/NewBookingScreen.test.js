import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import NewBookingScreen from '../screens/NewBookingScreen';

//Check correct number of component children
describe('<NewBookingScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<NewBookingScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render NewBookingScreen.js', () => {
  render(<NewBookingScreen/>);

})