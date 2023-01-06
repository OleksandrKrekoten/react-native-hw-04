import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [discription, setDiscription] = useState("");
  const [location, setLocation] = useState(null);
  const { userId, nickname } = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    const photoURI = await camera.takePictureAsync();
    setPhoto(photoURI.uri);
  };
  const sentPhoto = async () => {
    uploadPhotoToServer();
    uploadPostToServer();
    navigation.navigate("Home");
    setDiscription("");
  };

  const uploadPhotoToServer = async () => {
    const res = await fetch(photo);
    const file = await res.blob();
    const id = Date.now().toString();
    const storageRef = ref(storage, `postImages/${id}.jpeg`);
    await uploadBytes(storageRef, file);

    const URL = getDownloadURL(storageRef)
      .then((url) => {
        return url;
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            console.log("storage/object-not-found");
            break;
          case "storage/unauthorized":
            console.log("storage/unauthorized");
            break;
          case "storage/canceled":
            console.log("storage/canceled");
            break;
          case "storage/unknown":
            console.log("storage/unknown");
            break;
        }
      });
    return URL;
  };

  const uploadPostToServer = async () => {
    const url = await uploadPhotoToServer();

    await addDoc(collection(db, "posts"), {
      discription,
      location: location.coords,
      photoURL: url,
      userId,
      nickname,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}>
            <MaterialIcons
              name="enhance-photo-translate"
              size={24}
              color="white"
            />
          </Text>
        </TouchableOpacity>
      </Camera>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setDiscription}
          value={discription}
        />
      </View>
      <TouchableOpacity style={styles.sendBtn} onPress={sentPhoto}>
        <Text style={styles.sentLabel}>
          SENT <FontAwesome name="send" size={24} color="#FF6C00" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  camera: {
    marginHorizontal: 2,
    borderRadius: 10,
    height: "70%",
    alignItems: "center",
  },
  
  snapContainer: {
    position: "absolute",
    bottom: 20,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 40,
    width: 200,
    height: 200,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#FF6C00",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sentLabel: {
    color: "#FF6C00",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderBottomColor: "#FF6C00",
  },
});
