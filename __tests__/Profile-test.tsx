import React from 'react';
import HomeScreen from '../screens/home/home_screen';
// import {cleanup, render} from 'react-native-testing-library';
import renderer from 'react-test-renderer';
import MockedNavigator from '../screens/MockedNavigator';
import ProfileScreen from '../screens/home/profile_screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
describe('ProfileScreen', () => {
  it('should render correctly', () => {
    const {toJSON} = renderer.create(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MockedScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
