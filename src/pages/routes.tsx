import Login from "@/src/pages/login";
import SignIn from "@/src/pages/signIn";
import Home from "@/src/pages/home";
import CreatePost from "@/src/components/home/createPost";
import PostDetail from "@/src/components/home/postDatail";
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Routes = (): ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
      </Stack.Navigator>
    </NavigationContainer>
    )
};

export default Routes;
