import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({
    serverURL: "http://localhost:8080",
  });
  const [customer, setCustomer] = useState();
  const [selectTab, setSelectTab] = useState();
  console.log("🚀 ~ file: GlobalContext.js:13 ~ GlobalProvider ~ selectTab:", selectTab)

  const invokeServer = useCallback(
    async (method, route, data) => {
      if (method === "post") {
        return axios.post(global.serverURL + route, data);
      } else if (method === "get") {
        return axios.get(global.serverURL + route);
      } else if (method === "put") {
        return axios.put(global.serverURL + route, data);
      } else if (method === "delete") {
        return axios.delete(global.serverURL + route);
      }
    },
    [global.serverURL]
  );

  return (
    <GlobalContext.Provider
      value={{
        invokeServer,
        selectTab,
        setSelectTab,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
