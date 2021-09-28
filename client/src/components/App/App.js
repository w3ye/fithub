import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Topbar from "../topbar/Topbar";
import Dashboard from "../Dashboard/Dashboard";

import Center from "../home/Center";

export const UserContext = React.createContext([]);

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
      setUser({
        accessToken: result.accessToken,
      });
    }

    checkRefreshToken();
    console.log(user);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Topbar setMain={setMain} setUser={setUser} user={user} />
      {main === "dashboard" && (
        <Dashboard
          setMain={setMain}
          setUser={setUser}
          user={user}
          token={token}
          setToken={setToken}
        />
      )}
      {main === "login" && (
        <Login path="login" onChange={setToken} setMain={setMain} />
      )}
      {main === "register" && <Register onChange={setUser} setMain={setMain} />}
      {main === "center" && <Center onChange={setUser} setMain={setMain} />}
    </UserContext.Provider>
  );
}

export default App;
