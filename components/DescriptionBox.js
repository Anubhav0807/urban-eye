import { Text, View, TextInput, StyleSheet } from "react-native";

import IconButton from "./IconButton";

function DescriptionBox() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Describe your problem here"
          multiline
          textAlignVertical="top"
        />
        <IconButton icon="mic" size={32} style={styles.mic} />
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
  label: {
    marginLeft: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    width: 220,
    height: 80,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  mic: {
    backgroundColor: "#cecece",
    borderRadius: 16,
  },
});
