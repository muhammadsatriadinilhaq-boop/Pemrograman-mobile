import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import komponen layar dari folder screens
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Inisialisasi Navigator
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. Bottom Tab Navigator (Home & Profile)
function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 2. Drawer Navigator (Menggabungkan MainTab & Settings)
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={MainTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// 3. Root Stack Navigator (Alur Auth & Main App)
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Signup" component={Signup} />
        <RootStack.Screen name="MainApp" component={MainDrawerNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
