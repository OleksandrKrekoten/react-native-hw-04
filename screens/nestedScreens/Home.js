import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Button } from "react-native";

export const HomeScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10, justifyContent: "center" }}>
          <Image
            source={{ uri: item.photo }}
            style={{ marginHorizontal: 10, height: 200 }}
          />
          <Button
            title="go to map"
            onPress={() => {
              navigation.navigate("Map");
            }}
          />
          <Button
            title="go to comments"
            onPress={() => {
              navigation.navigate("Comments");
            }}
          />
        </View>
      )}
    />
  );
};
