import { View, Button, Image, Alert, Platform, Text, TouchableOpacity } from "react-native";

export const uploadImage = async (image) => {
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
        console.log(uploadedUrl);
        return uploadedUrl;
        // Alert.alert("Success", "Image uploaded successfully");
        
        // Set a timeout to refresh the page after 20 seconds
        // setTimeout(() => {
        //   refreshPage();
        // }, 20000);
      } else {
        console.error("Upload failed:", JSON.stringify(data));
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", JSON.stringify(error, null, 2));
    //   Alert.alert("Error", "Upload failed: " + error.message);
    }
  };