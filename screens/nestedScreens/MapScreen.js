import React from "react";
import MapView, { Marker } from "react-native-maps";
import {  StyleSheet } from "react-native";

export const MapScreen = ({route}) => {
  const { latitude, longitude } = route.params.location;
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        longitude,
        latitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.06,
      }}
    >
      <Marker
        coordinate={{ longitude, latitude }}
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
