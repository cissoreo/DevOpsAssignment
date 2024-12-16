import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './../homePage';
import Recipe from './../recipe';

const Stack = createNativeStackNavigator();

const TabsS = () =>
{
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="detail"
            component={Recipe}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
};

export default TabsS;