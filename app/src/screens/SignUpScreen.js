import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Svg, { Path } from 'react-native-svg';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import file from "../../internal_assets/internal_images/file.png";

export default function SignupScreen() {
  const navigation = useNavigation();
  const staticContent = {
    image:
      "https://images.pexels.com/photos/15994858/pexels-photo-15994858/free-photo-of-vintage-zorki-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [error, setError] = useState({});
  const [image, setImage] = useState('https://images.pexels.com/photos/15994858/pexels-photo-15994858/free-photo-of-vintage-zorki-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

  const validateForm = () => {
    let errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    if (!email) errors.email = "email is required";
    if (!phoneno) errors.phoneno = "Phone No is required";

    setError(errors);

    return Object.keys(errors).length === 0;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("image response", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     console.log("Submitted Form");
  //     //here upload image to cloudinary or any other cloud
  //     console.log("Image URI:", image);
  //     alert("Submitted Form");
  //     setConfirmPassword("");
  //     setEmail("");
  //     setError({});
  //     setPhoneno("");
  //     setUsername("");
  //     setPassword("");
  //   }
  // };
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted Form");
      //here upload image to cloudinary or any other cloud
      console.log("Image URI:", image);

      // Instead of showing an alert, navigate to OtpVerificationForm
      navigation.navigate("OtpVerification", {
        username,
        email,
        password,
        phoneno,
        image,
      });

      // Clear the form fields
      setConfirmPassword("");
      setEmail("");
      setError({});
      setPhoneno("");
      setUsername("");
      setPassword("");
      setImage(null);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      {/* <View style={styles.imageView}>
        <Animated.Image
          source={file}
          style={[styles.image, { opacity: fadeAnim }]}
        />
      </View> */}
      <Image source={image ? { uri: image } : ""} style={styles.previewImage} />
      <TouchableOpacity style={styles.newButton}  onPress={pickImage}>
      <View style={styles.iconContainer}>
        <Svg
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={styles.icon}
        >
          <Path
            strokeWidth="2"
            stroke="orange"
            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <Path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="orange"
            d="M17 15V18M17 21V18M17 18H14M17 18H20"
          />
        </Svg>
      </View>
      <Text style={styles.newButtonText}>Upload Image</Text>
    </TouchableOpacity>
   
      <Text style={styles.title}>Create a New Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {error.username ? (
          <Text style={styles.errorText}>{error.username}</Text>
        ) : null}
        <TextInput
          style={[styles.input, { width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {error.email ? (
          <Text style={styles.errorText}>{error.email}</Text>
        ) : null}
        <TextInput
          style={[styles.input, { width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
        />
        {error.password ? (
          <Text style={styles.errorText}>{error.password}</Text>
        ) : null}
        <TextInput
          style={[styles.input, { width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
        />
        {error.confirmPassword ? (
          <Text style={styles.errorText}>{error.confirmPassword}</Text>
        ) : null}
        <TextInput
          style={[styles.input, { width: windowWidth > 400 ? "40%" : "90%" }]}
          placeholder="Phone no"
          value={phoneno}
          onChangeText={setPhoneno}
          keyboardType="numeric"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {error.phoneno ? (
          <Text style={[styles.errorText]}>{error.phoneno}</Text>
        ) : null}
        <TouchableOpacity
          style={[styles.button, { width: windowWidth > 400 ? "40%" : "90%" }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginLink}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="orange" />
    </View>
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
  loginLink: {
    fontSize: 13,
    margin: 12,
    fontWeight: "bold",
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
    width: 330,
    height: 330,
    borderRadius: 75,
    marginBottom: 1,
    marginTop: 5,
    marginLeft: 5,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginRight: "40%",
    marginBottom: 10,
  },
  imageUploadContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 50,
    height : 35,
    width : 35,
    alignContent : 'center',
    alignItems : 'center'
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 45,
    marginTop: 10,
    borderWidth : 1,
    borderColor : 'grey'
  },
  newButton: {
    border: 'none',
    display: 'flex',
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: '#488aec',
    backgroundColor: 'lightgrey',
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    textAlign: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    verticalAlign: 'middle',
    alignItems: 'center',
    borderRadius: 8,
    userSelect: 'none',
    gap: 12,
    boxShadow: '0 4px 6px -1px #488aec31, 0 2px 4px -1px #488aec17',
    transition: 'all 0.6s ease',
    flexDirection: 'row',
  },
  newButtonText: {
    color: 'orange',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  iconContainer: {
    width: 20,
    height: 20,
  },
  icon: {
    width: '100%',
    height: '100%',
    color : 'orange'
  }
});
