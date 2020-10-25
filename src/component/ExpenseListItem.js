import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NumberFormat from "react-number-format";

import { BUTTON, COLORS, FONTS, SPACING } from "../styles/theme";

export default ({ item }) => {
  const { name, value, date } = item;

  return (
    <View style={styles.container}>
      <View style={styles.secondary}>
        <Text style={styles.name}>{name}</Text>
        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(formattedValue) => (
            <Text style={styles.name}>{formattedValue}</Text>
          )}
        />
      </View>
      <Text>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: COLORS.GREY,
    borderWidth: 1,
    padding: SPACING,
    margin: SPACING,
    borderRadius: SPACING,
  },
  name: {
    fontSize: FONTS.SIZE_LARGE,
    fontWeight: FONTS.WEIGHT_MEDIUM,
  },
  secondary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
