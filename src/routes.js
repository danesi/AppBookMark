import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

import Index from "./pages/Home";
import Detail from "./pages/Detail";
import Add from "./pages/AddBook";

export default function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true}}>
                <Stack.Screen name="Home" component={Index} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="Add" component={Add} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
