import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Topbar from "../topbar/Topbar";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../home/index";

export const TokenUserContext = React.createContext({});

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState({});
  const [main, setMain] = useState(token ? "home" : "dashboard");

  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("/api/users/refresh_token", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      setToken(result.accessToken);
    }

    if (token) checkRefreshToken();
  }, [token]);

  return (
    <TokenUserContext.Provider
      value={{ tokenState: [token, setToken], userState: [user, setUser] }}
    >
      {main === "dashboard" && (
        <>
          <Topbar setMain={setMain} />
          <Dashboard setMain={setMain} />
        </>
      )}
      {main === "login" && (
        <>
          <Topbar setMain={setMain} />
          <Login path="login" setMain={setMain} />
        </>
      )}

      {main === "register" && (
        <>
          <Topbar setMain={setMain} />
          <Register setMain={setMain} />
        </>
      )}
      {main === "home" && <Home setMain={setMain} />}
    </TokenUserContext.Provider>
  );
}

export default App;
