import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import SettingsScreen from '../screens/SettingsScreen';

//Check correct number of component children
describe('<SettingsScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<SettingsScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render SettingsScreen.js', () => {
  render(<SettingsScreen/>);

})