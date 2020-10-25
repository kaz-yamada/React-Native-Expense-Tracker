import React, { useEffect } from "react";

import { dropDatabseTables, setupDatabase } from "../db";

export default () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        // await dropDatabseTables();
        await setupDatabase();

        setIsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isLoaded;
};
