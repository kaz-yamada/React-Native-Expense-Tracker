import "react-native-gesture-handler";

import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import NewExpenseScreen from "./src/screens/NewExpenseScreen";

import { ExpensesContextProvider } from "./src/context/ExpensesContext";
import useDatabase from "./src/hooks/useDatabase";

const Stack = createStackNavigator();

const App = () => {
  const isDatabaseLoaded = useDatabase();

  if (isDatabaseLoaded) {
    return (
      <ExpensesContextProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="Add"
                options={{ title: "Add New Expense" }}
                component={NewExpenseScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ExpensesContextProvider>
    );
  } else {
    return null;
  }
};

export default App;
