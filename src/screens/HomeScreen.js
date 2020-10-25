import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { SafeAreaView } from "react-native-safe-area-context";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ListItem from "../component/ExpenseListItem";

import { ExpensesContext } from "../context/ExpensesContext";
import { BUTTON, COLORS, FONTS, SPACING } from "../styles/theme";
import { LineChart } from "react-native-chart-kit";
import { getDateRange } from "../utils";
import ExpenseListItem from "../component/ExpenseListItem";

const HomeScreen = ({ navigation }) => {
  const { monthlyData, latestData } = useContext(ExpensesContext);

  if (!monthlyData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No expenses added</Text>
      </SafeAreaView>
    );
  }

  const handleButtonPress = () => navigation.navigate("Add");

  const chartLabels = getDateRange(
    monthlyData[monthlyData.length - 1].date,
    monthlyData[0].date
  );
  const chartData = chartLabels.map((currentDate) => {
    const ele = monthlyData.find(({ date }) => date === currentDate);
    return ele ? ele.expense : 0;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Latest Expenses</Text>
      </View>
      <LineChart
        data={{
          labels: chartLabels,
          datasets: [{ data: chartData }],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: COLORS.PRIMARY,
          backgroundGradientFrom: COLORS.PRIMARY,
          backgroundGradientTo: COLORS.PRIMARY_LIGHT,
          color: () => COLORS.WHITE,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: COLORS.SECONDARY,
          },
        }}
      />
      {latestData && (
        <FlatList
          data={latestData}
          style={styles.list}
          renderItem={ExpenseListItem}
          contentContainerStyle={{ paddingBottom: BUTTON.HEIGHT * 3 }}
          keyExtractor={({ id }) => `${id}`}
        />
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleButtonPress}
      >
        <FontAwesomeIcon style={styles.icon} size={40} icon={faPlus} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: FONTS.SIZE_LARGE,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  floatingButton: {
    backgroundColor: BUTTON.BACKGROUND_COLOR,
    alignItems: "center",
    position: "absolute",
    borderRadius: BUTTON.HEIGHT,
    padding: SPACING,
    bottom: BUTTON.HEIGHT,
    right: BUTTON.HEIGHT,
  },
  icon: {
    color: "#fff",
  },
});

export default HomeScreen;
