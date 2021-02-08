
import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import HomeView from './views/homeView';
import BoardView from './views/boardView';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen name="Board" component={BoardView} options={{ title: 'Buscaminas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;