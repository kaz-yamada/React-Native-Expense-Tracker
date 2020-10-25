import React, { useContext, useState } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CurrencyInput from "../component/CurrencyInput";

import { BUTTON, COLORS, FONTS, INPUT, SPACING } from "../styles/theme";
import { ExpensesContext } from "../context/ExpensesContext";
import { formatDate } from "../utils";

const NewExpenseScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");

  const { addNewExpense } = useContext(ExpensesContext);

  const showDatepicker = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onSubmit = () => {
    addNewExpense(name, value, date.toISOString());
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Name</Text>
        <TextInput
          style={[styles.formItem, styles.textInput]}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View>
        <Text>Value</Text>
        <CurrencyInput
          value={value}
          style={[styles.formItem, styles.textInput]}
          onChange={(text) => setValue(text)}
        />
      </View>
      <View>
        <Text>Date</Text>
        <TouchableOpacity style={styles.formItem} onPress={showDatepicker}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              style={styles.icon}
              size={40}
              icon={faCalendarAlt}
            />
          </View>
          <Text style={styles.formItemText}>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: SPACING,
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.GREY,
    borderRadius: INPUT.RADIUS,
    marginBottom: SPACING * 2,
  },
  iconContainer: {
    borderRightWidth: 1,
    borderColor: "gray",
    padding: SPACING,
  },
  formItemText: {
    paddingLeft: SPACING * 2,
    fontSize: SPACING * 2,
  },
  textInput: {
    height: INPUT.HEIGHT,
    padding: INPUT.PADDING,
  },
  button: {
    alignItems: "center",
    borderRadius: SPACING,
    paddingVertical: SPACING * 2,
    paddingHorizontal: SPACING * 2,
    backgroundColor: BUTTON.BACKGROUND_COLOR,
  },
  buttonText: {
    fontSize: FONTS.SIZE_MEDIUM,
    color: BUTTON.COLOR,
  },
});

export default NewExpenseScreen;
