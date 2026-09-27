import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from "react_native";

// Langkah 2: Array Objek untuk menampung data Profile
const PROFILE = [
  {
    name: "Mohammad Satria Dinilhaq",
    title: "Full Stack Developer",
    email: "muhammadsatriadinilhaq@gmail.com",
    phone: "085624003105",
    location: "Kuningan, Jawa Barat, Indonesia",
    bio: "SeorangMahasiswa UIN Siber Syekh Nurjati Cirebon jurusan Informatika.",
    avatar: "assets/ai.jpeg",
    avatarOffline: "assets/ai.jpeg",
  },
];

export default function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState("");

  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      Alert.alert("Peringatan", "Pesan tidak boleh kosong!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(false);
      setContactMessage("");
      Alert.alert("Sukses", "Pesan Anda berhasil dikirim!");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isOnline ? "dark-content" : "light-content"}
        backgroundColor="#4A90E2"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header & Status Bar Switch */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Curriculum Vitae</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              Status: {isOnline ? "Online" : "Offline"}
            </Text>
            <Switch
              value={isOnline}
              onValueChange={(val) => setIsOnline(val)}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isOnline ? "#2b78e4" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Profil Section */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: PROFILE.avatar }}
            style={styles.avatar}
            defaultSource={require("./assets/adaptive-icon.png")}
          />
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.title}>{PROFILE.title}</Text>
          <Text style={styles.bio}>{PROFILE.bio}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>📍 {PROFILE.location}</Text>
            <Text style={styles.infoText}>📧 {PROFILE.email}</Text>
            <Text style={styles.infoText}>📞 {PROFILE.phone}</Text>
          </View>
        </View>

        {/* Tombol Interaktif (Pressable & TouchableOpacity) */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.btnText}>Kirim Pesan</Text>
          </TouchableOpacity>

          <Pressable
            style={({ pressed }) => [
              styles.btnSecondary,
              { backgroundColor: pressed ? "#d1d1d1" : "#e0e0e0" },
            ]}
            onPress={() =>
              Alert.alert("Platform Info", `Running on ${Platform.OS}`)
            }
          >
            <Text style={styles.btnSecondaryText}>Cek Platform</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Modal Kontak */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hubungi {PROFILE.name}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Tulis pesan Anda di sini..."
              multiline
              numberOfLines={4}
              value={contactMessage}
              onChangeText={setContactMessage}
            />

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#4A90E2"
                style={styles.loader}
              />
            ) : (
              <View style={styles.modalButtons}>
                <Button
                  title="Kirim"
                  onPress={handleSendMessage}
                  color="#4A90E2"
                />
                <View style={{ width: 10 }} />
                <Button
                  title="Batal"
                  color="#ff5c5c"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 12,
    color: "#666",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  title: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "600",
    marginVertical: 4,
  },
  bio: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginVertical: 8,
  },
  infoRow: {
    alignItems: "center",
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#444",
    marginVertical: 2,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  btnSecondaryText: {
    color: "#333",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  loader: {
    marginVertical: 10,
  },
});
