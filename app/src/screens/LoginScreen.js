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

export default function LoginScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const staticContent = {
    image:
      "https://images.pexels.com/photos/15994858/pexels-photo-15994858/free-photo-of-vintage-zorki-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState({});
  const windowWidth = useWindowDimensions().width;
  const validateForm = ()=>{
    let errors = {}

    if (!username) errors.username = "Username is required";
    if(!password) errors.password = "Password is required";
    setError(errors);

    return Object.keys(errors).length === 0;
    
  }

  const navigateToSignUp = () => {
    navigation.navigate("Signup"); // Navigate to SignUpScreen
  };
  const handleLogin = () => {
    // Handle login logic here
    // console.log("Username:", username);
    // console.log("Password:", password);
    // alert(
    //   JSON.stringify({
    //     username: username,
    //     password: password,
    //   })
    // );
    if(validateForm()){
      console.log("Subbmited", username, password);
      alert("Submitted Form");
      setError({});
      setPassword("");
      setUsername("");
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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.imageView}>
        <Animated.Image
          source={file}
          style={[styles.image, { opacity: fadeAnim }]}
        ></Animated.Image>
      </View>
      <Text style={styles.title}>Welcom to Pixolity!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input,{ width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        {error.username ? <Text style={styles.errorText}>{error.username}</Text> : null}
        <TextInput
          style={[styles.input,{ width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
         {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}
        <TouchableOpacity style={[styles.button,{ width: windowWidth > 400 ? "40%" : "90%" }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password ?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.registerButton,{ width: windowWidth > 400 ? "40%" : "90%" }]}
        onPress={navigateToSignUp}
      >
        <Text style={styles.registerButtonText}>Register New Account</Text>
      </TouchableOpacity>
      <StatusBar barStyle="dark-content" backgroundColor="orange" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "orange",
  },
  inputContainer: {
    width: "99%",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    width: "90%",
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 50,
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 13,
    margin: 12,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "trasnparent",
    borderWidth: 1,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 4,
    bottom: "-9.5%",
  },
  registerButtonText: {
    color: "orange",
    fontWeight: "600",
  },
  imageView: {
    borderRadius: 75,
    marginBottom: 30,
    height: 130,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 75,
    marginBottom: 1,
    marginTop: 5,
    marginLeft: 5,
  },
  errorText:{
    fontSize:12,
    color:'red',
    marginRight:"40%",
    marginBottom:10
  }
});
