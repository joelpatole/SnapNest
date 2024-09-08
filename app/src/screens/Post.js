import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const Post = ({ profileImage, username, postImage, date, description, likesCount, sharesCount }) => {
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
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
    backgroundColor: '#481F8A',
    maxWidth: 414,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 13,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'flex-start',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionButton: {
    marginRight: 8,
  },
  actionCount: {
    fontSize: 14,
    color: 'white',
  },
  date: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: 12,
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: 'white',
  },
});

export default Post;