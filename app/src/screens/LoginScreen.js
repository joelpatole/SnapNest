import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SignUpScreen from "./SignUpScreen";
import file from "../../internal_assets/internal_images/file2.0.png";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const staticContent = {
    image:
      "https://images.pexels.com/photos/15994858/pexels-photo-15994858/free-photo-of-vintage-zorki-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState({});
  const windowWidth = useWindowDimensions().width;
  const validateForm = ()=>{
    let errors = {}

    if (!email) errors.email = "Username is required";
    if(!password) errors.password = "Password is required";
    setError(errors);

    return Object.keys(errors).length === 0;
    
  }

  const navigateToSignUp = () => {
    navigation.navigate("Signup"); // Navigate to SignUpScreen
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const payload = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, payload);
        console.log("Login",response.data);
  
        if (response.data.token) {
          // Store the token
          await SecureStore.setItemAsync('userToken', response.data.token);
          await SecureStore.setItemAsync('refreshToken', response.data.refreshToken);
          console.log("Token stored successfully");

          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
  
          // Clear the form
          setError({});
          setPassword("");
          setEmail("");
        } else {
          console.log("Login failed: No token received");
          // Handle login failure (e.g., show an error message)
        }
      } catch (error) {
        console.error("Login error:", error);
        // Handle error (e.g., show an error message)
      }
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        // Reset animation value to 0 for next focus
        // fadeAnim.setValue(1);
      });
    }, [fadeAnim])
  );

  return (
    <>
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.imageView}>
        <Animated.Image
          source={file}
          style={[styles.image, { opacity: fadeAnim }]}
        />
      </View>
      <Text style={styles.title}>Welcome to SanpNest!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Email"
          placeholderTextColor="#9E95E5"
          value={email}
          onChangeText={setEmail}
        />
        {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}
        <TextInput
          style={[styles.input, { width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Password"
          placeholderTextColor="#9E95E5"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}
        <TouchableOpacity style={[styles.button, { width: windowWidth > 400 ? "40%" : "90%" }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.registerButton, { width: windowWidth > 400 ? "40%" : "90%" }]}
        onPress={navigateToSignUp}
      >
        <Text style={styles.registerButtonText}>Register New Account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    <StatusBar barStyle="light-content" backgroundColor="#481f8aff" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F5", // antiflash-white
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#481F8A", // tekhelet
  },
  inputContainer: {
    width: "99%",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "#9E95E5", // tropical-indigo
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    color: "#481F8A", // tekhelet
  },
  button: {
    backgroundColor: "#FF7B1C", // pumpkin (primary)
    paddingVertical: 10,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 13,
    margin: 12,
    fontWeight: "bold",
    color: "#481F8A", // tekhelet
  },
  registerButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF7B1C", // pumpkin (primary)
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 4,
    bottom: "-9.5%",
  },
  registerButtonText: {
    color: "#FF7B1C", // pumpkin (primary)
    fontWeight: "600",
  },
  imageView: {
    borderRadius: 75,
    marginBottom: 30,
    height: 130,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // periwinkle
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 75,
    marginBottom: 1,
    marginTop: 5,
    marginLeft: 5,
  },
  errorText: {
    fontSize: 12,
    color: "#FF7B1C", // pumpkin (primary)
    marginRight: "40%",
    marginBottom: 10,
  }
});
