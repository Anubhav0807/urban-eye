import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Card({ item }) {
  const navigation = useNavigation();

  function showDetails() {
    navigation.navigate("ComplaintDetailsScreen", { complaint: item });
  }

  return (
    <Pressable
      onPress={showDetails}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={{ maxWidth: 140 }}>
        <Text style={styles.title}>{item.title || "Untitled"}</Text>
        <Text style={styles.text}>{item.category || "Uncategorized"}</Text>
        <Text style={styles.status}>
          Status: {item.status || "Unspecified"}
        </Text>
      </View>
      <Image
        source={{
          uri: item.finalImageUri ?? item.imageUri,
        }}
        style={styles.image}
      />
    </Pressable>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#7978e9",
    borderRadius: 10,
    padding: 16,
    margin: 8,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 5,
  },
  pressed: {
    opacity: 0.75,
  },
  title: {
    width: 120,
    fontSize: 18,
    color: "white",
  },
  text: {
    fontSize: 12,
    color: "#ffffffe0",
  },
  status: {
    fontSize: 12,
    color: "#ffffffe0",
    fontWeight: "bold",
  },
  image: {
    height: 90,
    width: 160,
    resizeMode: "cover",
    borderRadius: 8,
  },
});
