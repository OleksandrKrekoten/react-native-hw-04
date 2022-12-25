import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);
  const takePhoto = async () => {
    const photoURI = await camera.takePictureAsync();
    setPhoto(photoURI.uri);
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
  };
  const sentPhoto = () => {
    navigation.navigate("Home", { photo });
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
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.sendBtn} onPress={sentPhoto}>
        <Text style={styles.sentLabel}>SENT</Text>
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
  snap: {
    color: "#fff",
  },
  snapContainer: {
    position: "absolute",
    bottom: 20,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 10,
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
    width: 200,
    height: 200,
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sentLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
});
