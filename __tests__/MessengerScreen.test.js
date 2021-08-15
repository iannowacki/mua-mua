import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import MessengerScreen from '../screens/MessengerScreen';

//Check correct number of component children
describe('<MessengerScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<MessengerScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render MessageDetailsScreen.js', () => {
  render(<MessageDetailsScreen/>);

})