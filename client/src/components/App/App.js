import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Topbar from "../topbar/Topbar";
import Dashboard from "../Dashboard/Dashboard";

export const TokenUserContext = React.createContext({});

function App() {
  const [main, setMain] = useState("dashboard");
  const [token, setToken] = useState();
  const [user, setUser] = useState({});

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

    checkRefreshToken();
    console.log(token);
  }, []);

  return (
    <TokenUserContext.Provider
      value={{ tokenState: [token, setToken], userState: [user, setUser] }}
    >
      <Topbar setMain={setMain} />
      {main === "dashboard" && <Dashboard setMain={setMain} />}
      {main === "login" && <Login path="login" setMain={setMain} />}
      {main === "register" && <Register setMain={setMain} />}
    </TokenUserContext.Provider>
  );
}

export default App;
