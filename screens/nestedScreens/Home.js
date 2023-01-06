import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Button } from "react-native";
import { db } from "../../firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";

export const HomeScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = async () => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
    });
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10, justifyContent: "center" }}>
          <Image
            source={{ uri: item.photoURL }}
            style={{ marginHorizontal: 10, height: 200 }}
          />
          <Button
            title="go to map"
            onPress={() => {
              navigation.navigate("Map", { location: item.location });
            }}
          />
          <Button
            title="go to comments"
            onPress={() => {
              navigation.navigate("Comments", { postId: item.id });
            }}
          />
        </View>
      )}
    />
  );
};
