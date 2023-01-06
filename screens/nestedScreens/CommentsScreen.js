import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { addDoc, collection, doc, query, onSnapshot } from "firebase/firestore";

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickname } = useSelector((state) => state.auth);
  const { postId } = route.params;
  useEffect(() => {
    getAllComment();
  }, []);
  const createComment = async () => {
    await addDoc(collection(doc(collection(db, "posts"), postId), "comments"), {
      comment,
      nickname,
    });
    setComment("");
    Keyboard.dismiss();
  };

  const getAllComment = () => {
    const q = query(collection(db, "posts"));
    onSnapshot(collection(doc(q, postId), "comments"), (snapshot) => {
      const comments = [];
      snapshot.docs.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      setAllComments(comments);
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickname}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setComment}
          value={comment}
          
        />
      </View>
      <TouchableOpacity style={styles.sendBtn} onPress={createComment}>
        <Text style={styles.sendLabel}>add post</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 60,
  },
  sendBtn: {
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#20b2aa",
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#20b2aa",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
});
