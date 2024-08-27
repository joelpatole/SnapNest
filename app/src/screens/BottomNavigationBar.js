import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function BottomNavigationBar() {
  const navigation = useNavigation();

  // State to manage the active state of each button
  const [activeButton, setActiveButton] = useState("Home"); // Initialize with 'Home' as active

  const handlePress = (routeName) => {
    navigation.navigate(routeName);
    setActiveButton(routeName); // Set the active button based on the pressed route
  };

  return (
    <View style={styles.bottomNavigation}>
      <Pressable
        style={[
          styles.navButton,
          activeButton === "Home" && styles.activeButton,
        ]}
        onPress={() => handlePress("Home")}
      >
        <Ionicons
          name="home-outline"
          size={24}
          color={activeButton === "Home" ? "white" : "black"}
        />
      </Pressable>
      <Pressable
        style={[
          styles.navButton,
          activeButton === "Search" && styles.activeButton,
        ]}
        onPress={() => handlePress("Search")}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={activeButton === "Search" ? "white" : "black"}
        />
      </Pressable>
      <Pressable
        style={[
          styles.navButton,
          activeButton === "ImageUpload" && styles.activeButton,
        ]}
        onPress={() => handlePress("ImageUpload")}
      >
        <Ionicons
          name="add-circle-outline"
          size={24}
          color={activeButton === "ImageUpload" ? "white" : "black"}
        />
      </Pressable>
      <Pressable style={styles.navButton}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </Pressable>
      <Pressable
        style={[
          styles.navButton,
          activeButton === "Profile" && styles.activeButton,
        ]}
        onPress={() => handlePress("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={activeButton === "Profile" ? "white" : "black"}
        />
      </Pressable>
      <StatusBar barStyle="light-content" backgroundColor="#481f8aff" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "#FF7B1C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: "7%",
    justifyContent: "space-between",
    width: "98%",
    position: "absolute",
    bottom: 7, // Adjusted to 0 for correct positioning
    borderRadius: 15,
    alignSelf: "center",
    ...Platform.select({
      android: {
        elevation: 7, // Add elevation property for Android
      },
      ios: {
        shadowColor: "#000", // Add shadow properties for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  // activeButton: {
  //   backgroundColor: 'black',
  //   borderRadius: 20,
  //   padding: 5,
  // },
});
