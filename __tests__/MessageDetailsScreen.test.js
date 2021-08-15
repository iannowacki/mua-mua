import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import MessageDetailsScreen from '../screens/MessageDetailsScreen';

//Check correct number of component children
describe('<MessageDetailsScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<MessageDetailsScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render MessageDetailsScreen.js', () => {
  render(<MessageDetailsScreen/>);

})