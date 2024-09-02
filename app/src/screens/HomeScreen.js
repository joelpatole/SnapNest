import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import Post from './Post';

const ITEMS_PER_PAGE = 4; // Number of posts to load per page

export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Allura-Regular': require('../../internal_assets/internal_fonts/Allura-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/post/posts/${page * ITEMS_PER_PAGE}`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => {
          const newPosts = response.data.filter(
            newPost => !prevPosts.some(existingPost => existingPost._id === newPost._id)
          );
          return [...prevPosts, ...newPosts];
        });
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
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
    />
  );

  const renderFooter = () => {
    if (loading) return <ActivityIndicator size="large" color="#481f8a" />;
    if (!hasMore) return <Text style={styles.endMessage}>No more posts to load</Text>;
    return null;
  };

  if (!fontLoaded) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#481f8a" /></View>;
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
    backgroundColor: '#9e95e5',
  },
  headerText: {
    fontFamily: 'Allura-Regular',
    fontSize: 32,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#481f8a',
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9e95e5',
  },
  endMessage: {
    textAlign: 'center',
    padding: 10,
    color: '#481f8a',
  }
});