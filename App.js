import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { Main } from "./component/main";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    ZenDots: require("./assets/fonts/ZenDots-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container} onLayout={onLayoutRootView}>
          <Main />
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
