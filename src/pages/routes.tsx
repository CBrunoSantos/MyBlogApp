import Login from "@/src/pages/login";
import SignIn from "@/src/pages/signIn";
import Home from "@/src/pages/home";
import CreatePost from "@/src/components/home/createPost";
import PostDetail from "@/src/components/home/postDatail";
import Profile from '@/src/pages/profile';
import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from '@/src/providers/userContext';
import { store } from './../hooks/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

const Routes = (): ReactElement => {
  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen name="PostDetail" component={PostDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </Provider>
    )
};

export default Routes;
