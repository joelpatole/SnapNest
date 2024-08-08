import React, { useState, useEffect } from "react";
import { View, Button, Image, Alert, Platform, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUploadComponent() {
  const [image, setImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const cancelImage = () => {
    setImage(null);
  };

  const uploadImage = async () => {
    if (image === null || image === undefined) {
      Alert.alert("Please select an image first");
      return;
    }

    const cloudName = "ds82yb1db";
    const uploadPreset = "ariki7qa";
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${uploadPreset}`;

    const formData = new FormData();
    formData.append("file", {
      uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", uploadPreset);

    console.log("FormData:", JSON.stringify(formData));

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
        const uploadedUrl = data.secure_url;
        setUploadedUrl(uploadedUrl);
        console.log(uploadedUrl);
        Alert.alert("Success", "Image uploaded successfully");
        
        // Set a timeout to refresh the page after 20 seconds
        setTimeout(() => {
          refreshPage();
        }, 20000);
      } else {
        console.error("Upload failed:", JSON.stringify(data));
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", JSON.stringify(error, null, 2));
      Alert.alert("Error", "Upload failed: " + error.message);
    }
  };

  const refreshPage = () => {
    // Reset all state variables to their initial values
    setImage(null);
    setUploadedUrl("");
    // You can add any other reset operations here
    // Alert.alert("Page Refreshed", "The page has been refreshed.");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && (
        <View>
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={{ color: 'blue', marginRight: 10 }}>Reselect Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelImage}>
              <Text style={{ color: 'red' }}>Cancel Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Button title="Upload to Cloudinary" onPress={uploadImage} disabled={!image} />
      {uploadedUrl && (
        <View>
          <Image
            source={{ uri: uploadedUrl }}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
          <Text>Uploaded URL: {uploadedUrl}</Text>
        </View>
      )}
    </View>
  );
}