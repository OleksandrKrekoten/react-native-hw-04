import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";
const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loginValue, setloginValue] = useState(initialState);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(loginValue));
    setloginValue(initialState);
  };
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("./../../assets/background.jpg")}
      blurType="light"
      blurAmount={3}
      blurRadius={8}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height" + 1}
      >
        <View
          style={{ ...styles.form, paddingBottom: isShowKeyboard ? 20 : 132 }}
        >
          <Text style={styles.title}>Sign In</Text>

          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="E-mail address"
              value={loginValue.email}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setloginValue((prev) => ({ ...prev, email: value }))
              }
            />
          </View>
          <View style={{ marginBottom: 43 }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={loginValue.password}
              secureTextEntry={true}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) =>
                setloginValue((prev) => ({ ...prev, password: value }))
              }
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ color: "#fff" }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text style={styles.text}>
              Not a member?
              <Text style={{ fontFamily: "ZenDots" }}> Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingHorizontal: 32,
    paddingTop: 92,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "ZenDots",
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    marginBottom: 33,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
    borderRadius: 8,
    backgroundColor: "#f6f6f6",
    paddingLeft: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    marginBottom: 16,
  },
  text: {
    textAlign: "center",
    color: "#1B4371",
  },
});
