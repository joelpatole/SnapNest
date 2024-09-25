import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

const onFollow = () => {
  // Call API to add user to followers list
  alert("following");
};


const Post = ({
  profileImage,
  username,
  postImage,
  date,
  description,
  likesCount,
  sharesCount,
  isFollowing,
  isOwnPost,
}) => {
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <View style={styles.userData}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.username}>{username}</Text>
        </View>
        {!isOwnPost &&
          (isFollowing ? (
            <View style={styles.followingContainer}>
              <Text style={styles.followingText}>Following</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onFollow}>
              <Text style={{ color: "#4B0082", fontWeight: "bold" }}>Follow</Text>
            </TouchableOpacity>
          ))}
      </View>
      <Image source={{ uri: postImage }} style={styles.postImage} />
      <View style={styles.actions}>
        <View style={styles.actionItem}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.actionCount}>{likesCount}</Text>
        </View>
        <View style={styles.actionItem}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.actionCount}>{sharesCount}</Text>
        </View>
        <View style={styles.actionItem}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.actionCount}>{sharesCount}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.date}>{formatDate(date)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: "#481F8A",
    maxWidth: 414,
    width: "100%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 13,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  username: {
    fontSize: 14,
    margin: "3px",
    fontWeight: "bold",
    color: "white",
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  actions: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "flex-start",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionButton: {
    marginRight: 8,
  },
  actionCount: {
    fontSize: 14,
    color: "white",
  },
  date: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 12,
    color: "white",
  },
  description: {
    fontSize: 12,
    color: "white",
  },
  userData: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 9,
    backgroundColor: "#ffa500",
    marginRight: "5px",
  },
  followButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  followText: {
    color: '#fff',
    textAlign: 'center',
  },
  followingContainer: {
    backgroundColor: '#d3d3d3', // Light grey background
    padding: 10,
    borderRadius: 5,
  },
  followingText: {
    color: '#555', // Darker grey text
    textAlign: 'center',
  },
});

export default Post;
