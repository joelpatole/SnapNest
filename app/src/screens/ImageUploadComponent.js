import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Image,
  StatusBar,
  Alert,
  Platform,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CustomAlert from "./CustomAlert";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

const CLOUD_NAME = "ds82yb1db";
const UPLOAD_PRESET = "ariki7qa";
const photographyGenresStatic = [
  "Portrait Photography",
  "Landscape Photography",
  "Street Photography",
  "Wildlife Photography",
  "Macro Photography",
  "Fashion Photography",
  "Sports Photography",
  "Architectural Photography",
  "Event Photography",
  "Travel Photography",
  "Food Photography",
  "Black and White Photography",
  "Aerial Photography",
  "Astrophotography",
  "Documentary Photography",
  "Product Photography",
  "Conceptual Photography",
  "Fine Art Photography",
  "Abstract Photography",
  "Underwater Photography",
];

export default function ImageUploadComponent() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      // Alert.alert("Error", "Failed to pick image: " + error.message);
      showAlert("Error", "Upload failed: " + error.message);
    }
  }, []);

  const cancelImage = useCallback(() => {
    setImage(null);
  }, []);

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const closeAlert = () => {
    setAlertVisible(false);
    // If you need to perform any action after closing the alert, do it here
    navigateToHome();
  };

  const uploadImage = useCallback(async () => {
    if (!image) {
      // Alert.alert("Please select an image first");
      showAlert("Error", "Please select an image first");
      return;
    }

    setIsUploading(true);
    const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("file", {
      uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();

      if (response.ok) {
        showAlert("Success", "Image uploaded successfully");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      // Alert.alert("Error", "Upload failed: " + error.message);
      showAlert("Error", "Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  }, [image]);

  const refreshPage = useCallback(() => {
    setImage(null);
    setDescription("");
    setGenre("");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        image={image}
        onCancel={cancelImage}
        onUpload={uploadImage}
        isUploading={isUploading}
      />
      <MainContent
        image={image}
        onPickImage={pickImage}
        windowWidth={windowWidth}
        description={description}
        setDescription={setDescription}
        genre={genre}
        setGenre={setGenre}
      />
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={closeAlert}
      />
      <StatusBar barStyle="light-content" backgroundColor="#481f8aff" />
    </SafeAreaView>
  );
}

const TopBar = ({ image, onCancel, onUpload, isUploading }) => (
  <View style={styles.topBar}>
    {image && (
      <>
        <TouchableOpacity
          onPress={onCancel}
          disabled={isUploading}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={{ color: "#481f8aff" }}>Cancel Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onUpload}
          disabled={isUploading}
          style={[styles.button, styles.postButton]}
        >
          <Text style={{ color: "#481f8aff" }}>
            {isUploading ? "Uploading..." : "Post"}
          </Text>
        </TouchableOpacity>
      </>
    )}
  </View>
);

const MainContent = ({
  image,
  onPickImage,
  windowWidth,
  description,
  setDescription,
  genre,
  setGenre,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [photographyGenres, setPhotographyGenres] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/gener/gener`)
      .then((response) => {
        setPhotographyGenres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gener data:", error);
      });
  }, []);

  return (
    <View style={styles.mainPostView}>
      <Image
        source={{
          uri:
            image ||
            "https://repository-images.githubusercontent.com/229240000/2b1bba00-eae1-11ea-8b31-ea57fe8a3f95",
        }}
        style={styles.previewImage}
        accessibilityLabel="Selected image preview"
      />
      <TextInput
        style={styles.descriptionInput}
        multiline
        numberOfLines={4}
        placeholder="Add a description..."
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        style={styles.genreDropdown}
        onPress={() => setShowDropdown(true)}
      >
        <Text style={styles.genreDropdownText}>
          {genre?.name || "Select a genre"}
        </Text>
      </TouchableOpacity>
      <View style={[styles.buttonContainer, { width: windowWidth }]}>
        <TouchableOpacity
          onPress={onPickImage}
          style={[
            styles.button,
            image ? styles.reselectButton : styles.pickButton,
          ]}
        >
          <Text style={{ color: "#481f8aff" }}>
            {image ? "Reselect Image" : "Pick Image"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showDropdown}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {photographyGenres.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.genreItem}
                  onPress={() => {
                    setGenre(item);
                    setShowDropdown(false);
                  }}
                >
                  {/* Display the name of the genre */}
                  <Text style={styles.genreItemText}>{item.displayName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};


//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   topBar: {
//     width: "100%",
//     // height: "7%",
//     backgroundColor: "#f9f9f9",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     padding: 8,
//     position: "absolute",
//     top: 0,
//     zIndex: 1000,
//   },
//   descriptionInput: {
//     width: "90%",
//     height: 100,
//     borderColor: "#FF7B1C",
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     marginTop: 10,
//     textAlignVertical: "top",
//   },
//   genreDropdown: {
//     width: "90%",
//     height: 40,
//     borderColor: "#FF7B1C",
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 10,
//     marginTop: 10,
//     justifyContent: "center",
//   },
//   genreDropdownText: {
//     color: "black",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     maxHeight: "80%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//   },
//   genreItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   genreItemText: {
//     fontSize: 16,
//     color: "black",
//   },
//   mainPostView: {
//     marginTop: 100,
//     flex: 1,
//     alignItems: "center",
//     width: "100%",
//   },
//   previewImage: {
//     width: 300,
//     height: 200,
//     marginTop: 10,
//     borderRadius: 20,
//   },
//   buttonContainer: {
//     height: 60,
//     justifyContent: "center",
//     flexDirection: "row",
//     padding: 8,
//     marginTop: 10,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 10,
//     height: 40,
//     width: 120,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pickButton: {
//     backgroundColor: "#FF7B1C",
//   },
//   reselectButton: {
//     backgroundColor: "#FFA500",
//   },
//   cancelButton: {
//     backgroundColor: "lightgrey",
//   },
//   postButton: {
//     backgroundColor: "#19a8ff",
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F5", // antiflash-white
  },
  topBar: {
    width: "100%",
    backgroundColor: "#9E95E5", // tropical-indigo
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 8,
    position: "absolute",
    top: 0,
    zIndex: 1000,
  },
  descriptionInput: {
    width: "90%",
    height: 100,
    borderColor: "#FF7B1C", // pumpkin (primary color)
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    textAlignVertical: "top",
    backgroundColor: "#F2F2F5", // antiflash-white
    color: "#481F8A", // tekhelet
  },
  genreDropdown: {
    width: "90%",
    height: 40,
    borderColor: "#FF7B1C", // pumpkin (primary color)
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#F2F2F5", // antiflash-white
  },
  genreDropdownText: {
    color: "#481F8A", // tekhelet
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(72, 31, 138, 0.5)", // tekhelet with opacity
  },
  modalContent: {
    width: "80%",
    maxHeight: "80%",
    backgroundColor: "#F2F2F5", // antiflash-white
    borderRadius: 10,
    padding: 20,
  },
  genreItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#C4BDEF", // periwinkle
  },
  genreItemText: {
    fontSize: 16,
    color: "#481F8A", // tekhelet
  },
  mainPostView: {
    marginTop: 100,
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  previewImage: {
    width: 300,
    height: 200,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF7B1C", // pumpkin (primary color)
  },
  buttonContainer: {
    height: 60,
    justifyContent: "center",
    flexDirection: "row",
    padding: 8,
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  pickButton: {
    backgroundColor: "#FF7B1C", // pumpkin (primary color)
  },
  reselectButton: {
    backgroundColor: "#9E95E5", // tropical-indigo
  },
  cancelButton: {
    backgroundColor: "#C4BDEF", // periwinkle
  },
  postButton: {
    backgroundColor: "#FF7B1C", // pumpkin (primary color)
  }
});