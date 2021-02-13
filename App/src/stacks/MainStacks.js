import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from '../stacks/MainTab';
import Warning from '../screens/Warning';
import Youngs from '../screens/Youngs';
import UserDetail from '../screens/UserDetail';
import EditUser from '../screens/EditUser';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Warning" component={Warning} />
        <Stack.Screen name="Youngs" component={Youngs} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
        <Stack.Screen name="EditUser" component={EditUser} />
    </Stack.Navigator>
);