import { useContext } from "react";
import { Text, FlatList, StyleSheet } from "react-native";

import Card from "./Card";
import { ComplaintsContext } from "../store/complaints-context";

// https://stackoverflow.com/questions/54564136/react-native-flatlist-extending-beyond-screen-when-rendered-with-a-header

function ComplaintList() {
  const complaintsCtx = useContext(ComplaintsContext);

  return (
    <>
      <Text style={styles.text}>Your complaints</Text>
      <FlatList
        data={complaintsCtx.complaints}
        renderItem={(itemData) => <Card item={itemData.item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

export default ComplaintList;

const styles = StyleSheet.create({
  text: {
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 24,
  },
});
