import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from 'jwt-decode';

const images = [
  "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg",
  "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg",
  "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg",
  "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg",
  "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg",
  // Add more image URLs as needed
];

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageSize = (screenWidth - 32 - (numColumns - 1) * 8) / numColumns;

const Profile = () => {
  const route = useRoute();
  const userId = route.params?.userId; // Safely access userId
  const [profileDetails, setProfileDetails] = useState({});
  const [displayPicture, setDisplayPicture] = useState(
    "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
  );
  const [displayName, setDisplayName] = useState("...");
  const [displayPosts, setDisplayPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [isOwnScreen, setIsOwnScreen] = useState(false);
  useEffect(() => {
    if (profileDetails && profileDetails.userDetails) {
      setDisplayPicture(profileDetails.userDetails.profilePicture);
      setDisplayName(profileDetails.userDetails.name);
    }
    if (profileDetails && profileDetails.posts) {
      setDisplayPosts(profileDetails.posts);
    }
  }, [profileDetails]);

  React.useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const [profileResponse, userToken] = await Promise.all([
          axios.get(`${BASE_URL}/api/users/user/profile/${userId}`),
          SecureStore.getItemAsync("userToken")
        ]);

        const { userDetails } = profileResponse.data;
        setProfileDetails(profileResponse.data);
        setFollowers(userDetails.followers.map(follower => follower.name));
        setFollowings(userDetails.followings.map(following => following.name));

        if (userToken) {
          const decodedToken = jwtDecode(userToken);
          setIsOwnScreen(userId === decodedToken.userId);
        }
      } catch (error) {
        console.error("Error fetching profile details:", error.message);
        // Handle error state here, e.g., setError(true);
      }
    };

    fetchProfileDetails();
  }, [userId]);

  const renderHeader = () => (
    <>
      <View style={styles.profileSection}>
        <ImageBackground
          source={{
            uri: `${displayPicture}`,
          }}
          style={styles.profileImage}
          imageStyle={{ borderRadius: 100 }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileTitle}>{displayName}</Text>
          <Text style={styles.profileDescription}>
            Best page for Indian photography.
          </Text>
          {/* <Text>Followed by {followings.join(", ")}</Text> */}
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{displayPosts.length}</Text>
          <Text style={styles.statLabel}>posts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{followers.length}</Text>
          <Text style={styles.statLabel}>followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{followings.length}</Text>
          <Text style={styles.statLabel}>following</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={[styles.button, styles.followButton]}>
          {isOwnScreen ? (
            <Text style={styles.buttonText}>Edit Profile</Text>
          ) : (
            <Text style={styles.buttonText}>Follow</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.messageButton]}>
        {isOwnScreen ? (
            <Text style={styles.buttonText}>Share Profile</Text>
          ) : (
            <Text style={styles.buttonText}>Message</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* <>
        <FlatList
          horizontal
          data={["Amazon", "RealMe", "MAKEMYTRIP", "RAPIDO"]}
          renderItem={({ item, index }) => (
            <View style={styles.brandBox}>
              <ImageBackground
                source={{ uri: images[index % images.length] }}
                style={styles.brandImage}
                imageStyle={{ borderRadius: 50 }}
              />
              <Text style={styles.brandName}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.brandSection}
        />
      </> */}
    </>
  );

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.imageUrl }} style={styles.galleryImage} />
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Footer Content</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={displayPosts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.row}
      />
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  container: {
    backgroundColor: "#F8F9FB",
  },
  profileSection: {
    flexDirection: "row",
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#141C24",
  },
  profileDescription: {
    fontSize: 14,
    color: "#3F5374",
    marginVertical: 8,
  },
  followedBy: {
    fontSize: 14,
    color: "#3F5374",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 6,
  },
  statBox: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#E4E9F1",
    borderRadius: 8,
    width: 115,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#141C24",
  },
  statLabel: {
    fontSize: 14,
    color: "#3F5374",
  },
  actionsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  followButton: {
    backgroundColor: "#4B0082", // Indigo
  },
  messageButton: {
    backgroundColor: "#F4C753", // Orange
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  brandSection: {
    paddingVertical: 16,
  },
  brandBox: {
    width: 80,
    alignItems: "center",
    marginRight: 16,
  },
  brandImage: {
    width: 60,
    height: 60,
  },
  brandName: {
    marginTop: 8,
    fontSize: 12,
    color: "#141C24",
  },
  row: {
    flex: 1,
    padding: -2,
  },
  galleryImage: {
    width: imageSize,
    height: imageSize,
    margin: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  footer: {
    backgroundColor: "transparent",
    height: screenHeight * 0.09, // 5% of screen height
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "transparent",
    fontSize: 16,
  },
});

export default Profile;
