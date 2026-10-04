import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Halaman Login</Text>
      <Text style={styles.title}>Nama: Mohammad Satria Dinilhaq</Text>
      <Text style={styles.title}>NIM: 2488010064</Text>
      <Button
        title="Masuk ke Aplikasi"
        onPress={() => navigation.replace("MainApp")}
      />
      <Button
        title="Daftar Akun"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
});
