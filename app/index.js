import React from "react";
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.viewStyle}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          // cardStyleInterpolator: ({ current: { progress } }) => ({
          //   cardStyle: {
          //     opacity: progress.interpolate({
          //       inputRange: [0, 1],
          //       outputRange: [0, 1],
          //     }),
          //     transform: [
          //       {
          //         translateX: progress.interpolate({
          //           inputRange: [0, 1],
          //           outputRange: [100, 0],
          //         }),
          //       },
          //       {
          //         translateY: progress.interpolate({
          //           inputRange: [0, 1],
          //           outputRange: [5000, 0],
          //         }),
          //       },
          //     ],
          //   },
          // }),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="ImageUpload" component={ImageUploadComponent}/>
        <Stack.Screen name="OtpVerification" component={OtpVerificationForm}></Stack.Screen>
      </Stack.Navigator>
      <BottomNavigationBar />
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
