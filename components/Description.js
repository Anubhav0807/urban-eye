import { View, TextInput, StyleSheet } from "react-native";

function Description({ description, setDescription }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Problem Title"
          placeholderTextColor="#666"
          cursorColor="black"
          value={description.title}
          onChangeText={(enteredText) =>
            setDescription((curDescription) => ({
              title: enteredText,
              description: curDescription.description,
            }))
          }
        />
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Describe your problem here"
          placeholderTextColor="#666"
          cursorColor="black"
          multiline
          textAlignVertical="top"
          value={description.description}
          onChangeText={(enteredText) =>
            setDescription((curDescription) => ({
              title: curDescription.title,
              description: enteredText,
            }))
          }
        />
      </View>
    </View>
  );
}

export default Description;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    padding: 12,
  },
  input: {
    borderWidth: 1,
    width: 280,
    borderRadius: 12,
    padding: 8,
    marginVertical: 4,
    color: "black",
    backgroundColor: "#ffffff20",
  },
  multiline: {
    height: 120,
  },
});
