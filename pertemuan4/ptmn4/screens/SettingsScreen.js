import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Settings Screen</Text>
      <Button title="Logout" onPress={() => navigation.replace("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
});
