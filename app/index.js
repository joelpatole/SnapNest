import React, { useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/profileScreen";
import BottomNavigationBar from "./src/screens/BottomNavigationBar";
// import { View, StyleSheet, Text} from 'react-native';
import { SafeAreaView, StyleSheet, StatusBar} from "react-native";
import SearchScreen from "./src/screens/SearchScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignUpScreen";
import OtpVerificationForm from "./src/screens/OtpVerificationForm";
import ImageUploadComponent from "./src/screens/ImageUploadComponent";
import * as SecureStore from 'expo-secure-store';
import {isTokenExpired} from './src/service/checkToken';
import {regenerateToken} from './src/service/regenerateAccessToken';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import Profile from "./src/screens/Profile";

const Stack = createStackNavigator();

export default function App() {
  const route = useRoute();
  const [isLoggedIn, setIsLoggedIn] = useState(null | Boolean);
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login"); 
  const [currentRoute, setCurrentRoute] = useState("Login");
  useEffect(() => {
    checkLoginStatus();
  }, []);
  const checkLoginStatus = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (refreshToken && !isTokenExpired(refreshToken)) {
        const newAccessToken = await regenerateToken(refreshToken);
        if (newAccessToken) {
          await SecureStore.setItemAsync('accessToken', newAccessToken);
          setInitialRoute("Home");
        }
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const shouldShowBottomBar = (routeName) => {
    return !['Login', 'Signup'].includes(routeName);
  };
  return (
    <SafeAreaView style={styles.viewStyle}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            listeners={{
              focus: () => setCurrentRoute("Home")
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            listeners={{
              focus: () => setCurrentRoute("Profile")
            }}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen}
            listeners={{
              focus: () => setCurrentRoute("Search")
            }}
          />
          <Stack.Screen 
            name="ImageUpload" 
            component={ImageUploadComponent}
            listeners={{
              focus: () => setCurrentRoute("ImageUpload")
            }}
          />
          <Stack.Screen 
            name="OtpVerification" 
            component={OtpVerificationForm}
            listeners={{
              focus: () => setCurrentRoute("OtpVerification")
            }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            listeners={{
              focus: () => setCurrentRoute("Login")
            }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen}
            listeners={{
              focus: () => setCurrentRoute("Signup")
            }}
          />
          <Stack.Screen 
            name="ProfileNew" 
            component={Profile}
            listeners={{
              focus: () => setCurrentRoute("ProfileNew")
            }}
          />
      </Stack.Navigator>
      {shouldShowBottomBar(currentRoute) && <BottomNavigationBar />}
      <StatusBar barStyle="light-content" backgroundColor="#481f8aff" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: "plum",
    alignContent: "center",
    justifyContent: "center"
  },
});
