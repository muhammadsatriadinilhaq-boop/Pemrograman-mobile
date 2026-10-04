import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Signup({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Halaman Signup</Text>
      <Text style={styles.title}>Nama: Mohammad Satria Dinilhaq</Text>
      <Text style={styles.title}>NIM: 2488010064</Text>
      <Button title="Kembali ke Login" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
});
