// ProfileScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';


const ProfileScreen = () => {

  //decode auth token
  //from that auth token get userDetails or userId
  //from that userId get userDetails and then display
  const user = {
    profileImage: 'https://media.licdn.com/dms/image/C4D03AQFM5KuLN9z1Tg/profile-displayphoto-shrink_800_800/0/1659497455610?e=1726099200&v=beta&t=ftKLZxdXjVA3NAw6gpCekJLLtWw01-3lVwsevol2ldA', // Replace with actual image URL
    name: 'Joel Richard Patole',
    phoneNumber: '+917040856403',
    emailAddress: 'joel@example.com',
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.phoneNumber}><Text style={styles.placeHolders}>Mobile No: </Text>{user.phoneNumber}</Text>
      <Text style={styles.emailAddress}><Text style={styles.placeHolders}>Email: </Text>{user.emailAddress}</Text>
      <StatusBar barStyle="dark-content" backgroundColor="orange" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    bottom: '20%',
    width: '80%',
    height: '60%',
    marginLeft: '10%',
    elevation: 10, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.8, // For iOS shadow
    shadowRadius: 5, // For iOS shadow
    borderRadius: 10, // Rounded corners
    padding: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 75,
    marginBottom: 20,
    marginTop:5,
    marginLeft:5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'orange',
    opacity:0.79
  },
  phoneNumber: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  emailAddress: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  placeHolders: {
    // fontSize: 17,
    marginBottom: 10,
    color:'grey',
    opacity:0.79
  }
});

export default ProfileScreen;
