import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import S3 from "aws-sdk/clients/s3";
dotenv.config();

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({
    serverURL: "http://localhost:8080",
  });
  const [selectTab, setSelectTab] = useState();

  const s3 = new S3({
    region: "ap-south-1",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    signatureVersion: "v4",
  });

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

  const HandleFileUpload = async (file) => {
    const BASEURL = "https://url2fy.s3.ap-south-1.amazonaws.com/";
    try {
      let { name, type } = file;

      const fileParams = {
        Bucket: process.env.BUCKETNAME,
        Key: name,
        Expires: 600,
        ContentType: type,
        ACL: "public-read",
      };

      const url = await s3.getSignedUrlPromise("putObject", fileParams);

      const data = await axios
        .put(url, file, {
          headers: {
            "Content-type": file.type,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((result) => {
          if (result.status === 200) {
            return { URL: BASEURL + file.name };
          }
        })
        .catch((err) => {
          return { Error: err.message };
        });
      return data;
    } catch (err) {
      return err;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        invokeServer,
        selectTab,
        setSelectTab,
        HandleFileUpload,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
