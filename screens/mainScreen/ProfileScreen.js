import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = async () => {
    const q = collection(db, "posts");
    await onSnapshot(query(q, where("userId", "==", userId)), (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setUserPosts(posts);
    });
  };
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  console.log(userPosts);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={signOut}>
        <Text style={{fontSize:18}}>
          {" "}
          signOut
          <MaterialCommunityIcons name="exit-run" size={18} color="black" />
        </Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.photoURL }}
                style={{ width: 350, height: 200 }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 70,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom:10,
  },
});
