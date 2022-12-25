import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../nestedScreens/Home";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();
export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Home" component={HomeScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};
