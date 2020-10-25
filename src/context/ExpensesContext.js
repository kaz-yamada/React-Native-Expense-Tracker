import React, { useEffect, createContext, useState } from "react";
import { getLatestExpenses, getMonthlyExpenses, insertExpense } from "../db";

export const ExpensesContext = createContext({});

export const ExpensesContextProvider = (props) => {
  const {
    initialMonthlyData: initialMonthlyData,
    initialLatestData: initialLatestData,
    children,
  } = props;

  // Use State to store the values
  const [monthlyData, setMonthlyData] = useState(initialMonthlyData);
  const [latestData, setLatestData] = useState(initialLatestData);

  useEffect(() => {
    refreshExpenses();
  }, []);

  const addNewExpense = (name, value, date) => {
    return insertExpense(name, value, date, refreshExpenses);
  };

  const refreshExpenses = () => {
    getMonthlyExpenses(setMonthlyData);
    getLatestExpenses(setLatestData);
  };

  // Make the context object:
  const expensesContext = { monthlyData, latestData, addNewExpense };

  // pass the value in provider and return
  return (
    <ExpensesContext.Provider value={expensesContext}>
      {children}
    </ExpensesContext.Provider>
  );
};
