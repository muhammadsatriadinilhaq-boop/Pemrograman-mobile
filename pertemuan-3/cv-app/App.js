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
} from "react-native";

const PROFILE = {
  name: "Mohammad Satria Dinilhaq",
  title: "Full-Stack Mobile Developer",
  email: "muhammadsatriadinilhaq@gmail.com",
  phone: "085624003105",
  location: "Kuningan, Jawa Barat, Indonesia",
  bio: "Seorang mahasiswa UIN Siber Syekh Nurjati Cirebon Jurusan Informatika.",
};

const SKILLS = [
  { id: "1", name: "React Native", percentage: "65%" },
  { id: "2", name: "Flutter", percentage: "60%" },
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

  const handleDownloadCV = () => {
    Alert.alert("Download", "CV sedang diunduh...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0E14" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* Header & Status Switch */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerIcon}>📄</Text>
              <Text style={styles.headerTitle}>Curriculum Vitae</Text>
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                {isOnline ? "Online" : "Offline"}
              </Text>
              <Switch
                value={isOnline}
                onValueChange={(val) => setIsOnline(val)}
                trackColor={{ false: "#3A3D4A", true: "#10B981" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Profil Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarBorder}>
              <Image
                source={require("./assets/ai.jpeg")}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.name}>{PROFILE.name}</Text>
            <Text style={styles.title}>{PROFILE.title}</Text>
            <Text style={styles.bio}>{PROFILE.bio}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>📍 {PROFILE.location}</Text>
              <Text style={styles.infoText}>📧 {PROFILE.email}</Text>
              <Text style={styles.infoText}>📞 {PROFILE.phone}</Text>
            </View>

            {/* Social Buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialCard}>
                <Text style={styles.socialLabel}>Github</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialCard}>
                <Text style={styles.socialLabel}>LinkedIn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialCard}>
                <Text style={styles.socialLabel}>Youtube</Text>
              </TouchableOpacity>
            </View>

            {/* Download CV Button */}
            <TouchableOpacity
              style={styles.btnDownload}
              onPress={handleDownloadCV}
            >
              <Text style={styles.btnDownloadText}> Download CV (PDF)</Text>
            </TouchableOpacity>
          </View>

          {/* Tombol Interaktif */}
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
                { backgroundColor: pressed ? "#2A3042" : "#1E2330" },
              ]}
              onPress={() =>
                Alert.alert("Platform Info", `Running on ${Platform.OS}`)
              }
            >
              <Text style={styles.btnSecondaryText}>Cek Platform</Text>
            </Pressable>
          </View>
        </View>

        {/* Section Keahlian (FlatList) */}
        <View style={styles.skillsCard}>
          <Text style={styles.skillsTitle}>🛠️ Keahlian</Text>
          <Text style={styles.skillsSubtitle}>
            Komponen: FlatList - menampilkan daftar skill secara efisien
          </Text>

          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.skillItem}>
                <View style={styles.skillHeader}>
                  <Text style={styles.skillName}>{item.name}</Text>
                  <Text style={styles.skillPercent}>{item.percentage}</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[styles.progressBarFill, { width: item.percentage }]}
                  />
                </View>
              </View>
            )}
          />
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
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
              value={contactMessage}
              onChangeText={setContactMessage}
            />

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#6366F1"
                style={styles.loader}
              />
            ) : (
              <View style={styles.modalButtons}>
                <Button
                  title="Kirim"
                  onPress={handleSendMessage}
                  color="#6366F1"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E14",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 16,
  },
  mainCard: {
    backgroundColor: "#131722",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1F293D",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2330",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  switchLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginRight: 4,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    color: "#818CF8",
    fontWeight: "600",
    marginVertical: 4,
  },
  bio: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    marginVertical: 8,
    lineHeight: 18,
  },
  infoRow: {
    alignItems: "center",
    marginVertical: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginVertical: 2,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  socialCard: {
    backgroundColor: "#1E2330",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#2A3042",
  },
  socialLabel: {
    fontSize: 12,
    color: "#818CF8",
    fontWeight: "600",
  },
  btnDownload: {
    backgroundColor: "#6366F1",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  btnDownloadText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 6,
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
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#2A3042",
  },
  btnSecondaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  skillsCard: {
    backgroundColor: "#131722",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1F293D",
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  skillsSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 16,
    marginTop: 2,
  },
  skillItem: {
    marginBottom: 12,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  skillName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  skillPercent: {
    fontSize: 12,
    color: "#818CF8",
    fontWeight: "bold",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#1E2330",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#131722",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1F293D",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#2A3042",
    backgroundColor: "#1E2330",
    borderRadius: 8,
    padding: 10,
    color: "#FFFFFF",
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
