import { View, Text, StyleSheet, Modal, Pressable } from "react-native";

function ProfileMenu({ isModalVisible, onClose }) {
  return (
    <Modal visible={isModalVisible} transparent>
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.container}>
        <Text>John Doe</Text>
        <Text>johndoe@gmail.com</Text>
      </View>
    </Modal>
  );
}

export default ProfileMenu;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    position: "absolute",
    top: 72,
    right: 24,
    backgroundColor: "#cecece",
    borderRadius: 12,
    borderTopRightRadius: 0,
    padding: 16,
  },
});
