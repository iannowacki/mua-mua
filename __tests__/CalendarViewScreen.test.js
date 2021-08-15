import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import CalendarViewScreen from '../screens/CalendarViewScreen';

//Check correct number of component children
describe('<CalendarViewScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<CalendarViewScreen />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

//Check component renders 
test('render CalendarViewScreen.js', () => {
  render(<CalendarViewScreen/>);

})