import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ImageBox() {
  return (
    <View style={styles.container}>
      <View>
        <Pressable style={({ pressed }) => pressed && styles.pressed}>
          <View style={styles.row}>
            <Ionicons name="camera" size={28} />
            <Text style={styles.text}>Take a picture</Text>
          </View>
        </Pressable>
        <Pressable style={({ pressed }) => pressed && styles.pressed}>
          <View style={styles.row}>
            <Ionicons name="folder" size={28} />
            <Text style={styles.text}>Upload an image</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default ImageBox;

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 12,
    margin: 32,
    backgroundColor: "#00000011",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  text: {
    paddingHorizontal: 8,
  },
  pressed: {
    opacity: 0.5,
  },
});
