import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import Post from "./Post";

const ITEMS_PER_PAGE = 4; // Number of posts to load per page
const screenHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Allura-Regular": require("../../internal_assets/internal_fonts/Allura-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadFont();
    fetchPosts();
  }, []);

  // const fetchPosts = async () => {
  //   if (loading || !hasMore) return;
  //   setLoading(true);
  //   try {
  //     const token = await SecureStore.getItemAsync("userToken");
  //     if (!token) {
  //       throw new Error("No authentication token found");
  //     }
  //     console.log(token);

  //     const response = await axios.get(`${BASE_URL}/api/post/posts`, {
  //       params: {
  //         page: page,
  //         count: ITEMS_PER_PAGE,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log(response);

  //     if (response.data.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setPosts((prevPosts) => {
  //         const newPosts = response.data.filter(
  //           (newPost) =>
  //             !prevPosts.some(
  //               (existingPost) => existingPost._id === newPost._id
  //             )
  //         );
  //         return [...prevPosts, ...newPosts];
  //       });
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `${BASE_URL}/api/post/posts/${page}/${ITEMS_PER_PAGE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => {
          const newPosts = response.data.filter(
            (newPost) =>
              !prevPosts.some(
                (existingPost) => existingPost._id === newPost._id
              )
          );
          return [...prevPosts, ...newPosts];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Server Error:",
            error.response.status,
            error.response.data
          );
          // You might want to set an error state here to display to the user
          setErrorMessage(
            `Server error: ${error.response.status}. ${
              error.response.data.message || ""
            }`
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Network Error:", error.request);
          setErrorMessage("Network error. Please check your connection.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
          setErrorMessage("An unexpected error occurred.");
        }
      } else {
        console.error("Unexpected Error:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };


  const renderPost = ({ item }) => (
    <Post
      profileImage={item.userId.profilePicture}
      username={item.userId.name}
      postImage={item.imageUrl}
      date={item.date}
      genre={item.genreId.displayName}
      description={item.description}
      likesCount={item.likesCount}
      sharesCount={item.sharesCount}
      isOwnPost={item.isOwnPost}
      isFollowing={item.isFollowing}
    />
  );

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer Content</Text>
        {loading && <ActivityIndicator size="large" color="#481f8a" />}
        {!hasMore && (
          <Text style={styles.endMessage}>No more posts to load</Text>
        )}
      </View>
    );
  };

  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#481f8a" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerText}>SnapNest</Text>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item._id.toString()}
          onEndReached={fetchPosts}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#481f8a" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9e95e5",
  },
  headerText: {
    fontFamily: "Allura-Regular",
    fontSize: 32,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#481f8a",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9e95e5",
  },
  endMessage: {
    textAlign: "center",
    padding: 10,
    color: "#481f8a",
  },
  footer: {
    backgroundColor: "#481F8A",
    height: screenHeight * 0.09, // 9% of screen height
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "transparent",
    fontSize: 16,
  },
});
