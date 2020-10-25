import React from "react";
import { TextInput } from "react-native";
import NumberFormat from "react-number-format";

export default ({ value, onChange, style }) => {
  return (
    <NumberFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
      renderText={(formattedValue) => (
        <TextInput
          style={style}
          keyboardType={"decimal-pad"}
          onChangeText={onChange}
        >
          {formattedValue}
        </TextInput>
      )}
    />
  );
};
