import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { Dropdown } from "react-native-element-dropdown";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  SafeAreaView,
  StatusBar
} from "react-native";

const PEXELS_API_KEY = "Fjo6cg2MqUOFck9dzPOVwLA0mITA1FRiPupYEUSTVyWkuHsnq8LliVZK";

const exploringIndiaArray = [
  "mumbai",
  "pune",
  "ladakh",
  "Punjab",
  "bengaluru",
  "delhi",
  "jaipur",
  "kolkata",
  "chennai",
  "agra",
  "ahmedabad",
  "varanasi",
  "udaipur",
  "goa",
  "surat",
  "amritsar",
  "shimla",
  "chandigarh",
  "mysuru",
  "kochi",
  "madhya pradesh",
  "jodhpur",
  "guwahati",
  "Munnar",
  "Tamil Nadu",
  "Maharashtra",
  "Hampi",
  "Royal Enfield",
  "India",
  "Darjeeling",
  "Rishikesh",
  "Manali",
  "Rajasthan",
  "Kerala",
  "Sikkim",
  "Andaman and Nicobar Islands",
  "Gujarat",
  "Karnataka",
  "Leh",
  "Pondicherry",
  "Rann of Kutch",
  "Spiti Valley",
  "Kaziranga",
  "Pushkar",
  "Jaisalmer",
  "Nainital",
  "Mussoorie",
  "Haridwar",
  "Ranthambore",
  "Lucknow",
  "Gwalior",
  "Kokan"
];

const getRandomQuery = () =>
  exploringIndiaArray[Math.floor(Math.random() * exploringIndiaArray.length)];

export default function SearchScreen() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const fetchPhotos = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=80`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();
      const shuffledPhotos = shuffle(data.photos); // Shuffle the array
      setPhotos(shuffledPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const randomQuery = getRandomQuery();
    setCategory(randomQuery);
    fetchPhotos(randomQuery);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPhotos(category);
  };

  const handleCategoryChange = (item) => {
    setCategory(item.value);
    fetchPhotos(item.value);
  };

  const renderPhoto = ({ item }) => (
    <TouchableOpacity
      style={styles.photoContainer}
      onPress={() => {
        setSelectedPhoto(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.src.large2x }} style={styles.photo} />
      <Text style={styles.photographer}>{item.photographer}</Text>
    </TouchableOpacity>
  );

  const handleDownload = () => {
    if (selectedPhoto?.src?.original) {
      Linking.openURL(selectedPhoto.src.original);
    }
  };

  // Convert exploringIndiaArray to dropdown-compatible data format
  const dropdownData = exploringIndiaArray.map((item) => ({ label: item, value: item }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Exploring Indian Photographers: {category}</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "orange" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select category" : "..."}
        searchPlaceholder="Search..."
        data={dropdownData}
        value={category}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleCategoryChange}
      />
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPhoto}
          numColumns={3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.flatListContent}
        />
      )}

      {/* Modal to display the selected photo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedPhoto?.src.large2x }}
              style={styles.modalPhoto}
            />
            <Text style={styles.modalPhotographer}>
              Photo by: {selectedPhoto?.photographer}
            </Text>
            <Text style={styles.modalPhotographer}>{selectedPhoto?.alt}</Text>
            {/* <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownload}
            >
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <StatusBar barStyle="dark-content" backgroundColor="orange" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  photo: {
    width: (Dimensions.get("window").width - 6) / 3, // Adjust width for columns with margin 2
    height: (Dimensions.get("window").width - 6) / 3, // Adjust height to maintain aspect ratio
    borderRadius: 10,
  },
  photographer: {
    marginTop: 10,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    fontStyle: "italic", // Making text cursive
    marginLeft: 0, // Removing left margin
  },
  flatListContent: {
    paddingHorizontal: 2, // Adjusting horizontal padding for FlatList content
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
  },
  modalPhoto: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 200,
    borderRadius: 50,
    resizeMode: "contain",
  },
  modalPhotographer: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  downloadButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    height: 35,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 8,
    marginBottom: 20,
    width:'50%'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
