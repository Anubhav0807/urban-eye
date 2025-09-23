import { Text, View, StyleSheet, Image } from "react-native";

function Card({ item }) {
  const charLimit = 50;

  function shortenDescription(description) {
    if (!description) return "";
    return description.length > charLimit
      ? description.substring(0, charLimit) + "..."
      : description;
  }

  return (
    <View style={styles.container}>
      <View style={{ maxWidth: 140 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {shortenDescription(item.description)}
        </Text>
      </View>
      <Image
        source={{
          uri: item.imageUri ?? `data:image/jpeg;base64,${item.imageBase64}`,
        }}
        style={styles.image}
      />
    </View>
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
  title: {
    fontSize: 18,
    color: "white",
  },
  description: {
    fontSize: 12,
    color: "#ffffffe0",
  },
  image: {
    height: 90,
    width: 160,
    resizeMode: "cover",
    borderRadius: 8,
  },
});
