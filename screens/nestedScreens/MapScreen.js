import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Text, View, StyleSheet } from "react-native";

export const MapScreen = () => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        longitude: -122.083922,
        latitude: 37.4220936,
        latitudeDelta: 0.01,
        longitudeDelta: 0.06,
      }}
    >
      <Marker
        coordinate={{ longitude: -122.083922, latitude: 37.4220936 }}
        title="Travel Photo"
      />
    </MapView>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
