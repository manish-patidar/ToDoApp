/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Screens/Login/Login'
import Signup from './Screens/Signup/Signup'
import ToDoList from './Screens/ToDoList/ToDoList'
import CreateToDo from './Screens/CreateToDo/CreateToDo'


const Routes = createStackNavigator({
    Login: {screen: Login, navigationOptions:{header: null}},
    Signup: {screen: Signup, navigationOptions:{header: null}},
    ToDoList: {screen: ToDoList},
    CreateToDo: {screen: CreateToDo}
  });
  
export default createAppContainer(Routes);