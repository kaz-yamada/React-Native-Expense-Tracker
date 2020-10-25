import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("ExpenseTrackerDB.db");

export const setupDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY NOT NULL, name TEXT, value INT, date DATE);"
        );
      },
      (callback, error) => {
        console.log("db error creating tables");
        console.log(error);
        reject(error);
      },
      (callback, success) => {
        resolve(success);
      }
    );
  });
};

export const dropDatabseTables = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE expenses",
        [],
        (_, result) => {
          console.log("Database dropped");
          resolve(result);
        },
        (_, error) => {
          console.log("error dropping expenses table");
          reject(error);
        }
      );
    });
  });
};

export const getExpenses = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql("SELECT * FROM expenses", [], (_, { rows: { _array } }) => {
        callback(_array);
      });
    },
    (errorCallback, error) => {
      console.log("Error loading expenses");
      console.error(error);
    },
    (callback, _success) => {
      console.log("loaded expenses");
    }
  );
};

export const getLatestExpenses = (callback, limit = 5) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT * FROM expenses ORDER BY date DESC LIMIT ?",
        [limit],
        (_, { rows: { _array } }) => {
          callback(_array);
        }
      );
    },
    (errorCallback, error) => {
      console.log("Error loading latest expenses");
      console.error(error);
    },
    (successCallback, _success) => {
      console.log("loaded expenses");
    }
  );
};

export const getMonthlyExpenses = (callback, limit = 5) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT SUM(value) AS expense,
        strftime("%Y-%m", date) AS 'date' 
        FROM expenses GROUP BY strftime("%Y-%m", date) ORDER BY date DESC LIMIT ?;`,
        [limit],
        (_, { rows: { _array } }) => {
          callback(_array);
        }
      );
    },
    (errorCallback, error) => {
      console.log("Error loading expenses");
      console.error(error);
    },
    (callback, _success) => {
      console.log("loaded expenses");
    }
  );
};

export const insertExpense = (name, value, date, onSuccessCallback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO expenses (name, value, date) values (?, ?, ?)`,
        [name, value, date]
      );
    },
    (callback, error) => {
      console.log("Error inserting record");
      console.error(error);
    },
    (callback, success) => {
      onSuccessCallback(success);
    }
  );
};
