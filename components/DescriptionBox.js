import { View, TextInput, StyleSheet } from "react-native";

function DescriptionBox() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Describe your problem here"
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

export default DescriptionBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    padding: 12,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    width: 280,
    height: 120,
    borderRadius: 12,
    padding: 8,
  },
  mic: {
    backgroundColor: "#cecece",
    borderRadius: 16,
  },
});
