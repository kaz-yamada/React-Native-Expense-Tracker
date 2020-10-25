import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ({ item }) => {
  const { name, value, date } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.secondary}>
        <Text>{value}</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  name: {},
  secondary: {},
});
