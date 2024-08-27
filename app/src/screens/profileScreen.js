import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { isTokenExpired } from "../service/checkToken";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

//decode auth token
//from that auth token get userDetails or userId
//from that userId get userDetails and then display
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const logout = async () => {
    try {
      // Delete the stored token
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('refreshToken');
      console.log("Token removed successfully");
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      // Additional logic can be added here, like navigating to a login screen
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error (e.g., show an error message)
    }
  };
  useEffect(() => {
    const checkUserLoginStatus = async () => {
      try {
        // Retrieve the token from SecureStore
        const token = await SecureStore.getItemAsync("userToken");

        if (token && !isTokenExpired(token)) {
          // Token is valid, decode it to get user information
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const userDetails = await axios.get(`${BASE_URL}/api/users/user/${userId}`);
          setUser(userDetails.data);
        } else {
          // Token is expired or not present
          alert("Token is expired or not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error checking user login status:", error);
        // Handle error (e.g., show an error message)
      }
    };
    checkUserLoginStatus();
  }, []);

  // const user = {
  //   profilePicture:
  //     "https://media.licdn.com/dms/image/C4D03AQFM5KuLN9z1Tg/profile-displayphoto-shrink_800_800/0/1659497455610?e=1726099200&v=beta&t=ftKLZxdXjVA3NAw6gpCekJLLtWw01-3lVwsevol2ldA",
  //   name: "Joel Richard Patole",
  //   mobile: "+917040856403",
  //   email: "joel@example.com",
  // };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profilePicture}
        />
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Mobile No:</Text>
        <Text style={styles.info}>{user.mobile}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      <TouchableOpacity 
      onPress={logout}
      style={[styles.button, styles.logoutButton]}
      ><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
      <StatusBar barStyle="light-content" backgroundColor="#481f8aff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F5",
    position: "absolute",
    bottom: "20%",
    width: "84%",
    height: "60%",
    marginLeft: "10%",
    elevation: 10,
    shadowColor: "#481F8A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 15,
    padding: 20,
  },
  profileImageContainer: {
    backgroundColor: "#FF7B1C",
    borderRadius: 75,
    padding: 5,
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#481F8A",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#C4BDEF",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#481F8A",
    marginRight: 10,
  },
  info: {
    fontSize: 16,
    color: "#481F8A",
    flex: 1,
  },
  button: {
    padding: 5,
    borderRadius: 10,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ff474c", // pumpkin (primary color)
  },
  logoutText:{
    color : 'white'
  }
});

export default ProfileScreen;
