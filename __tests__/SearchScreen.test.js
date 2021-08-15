import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import SearchScreen from '../screens/SearchScreen';

//Check correct number of component children
describe('<SearchScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<SearchScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render SearchScreen.js', () => {
  render(<SearchScreen/>);

})