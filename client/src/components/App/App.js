import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Topbar from "../topbar/Topbar";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../home/index";

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
  console.log("USER:", user);
  console.log("TOKEN:", token);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <>
        {main === "dashboard" && (
          <>
            <Topbar setMain={setMain} setUser={setUser} user={user} />
            <Dashboard
              setMain={setMain}
              setUser={setUser}
              user={user}
              token={token}
              setToken={setToken}
            />
          </>
        )}
        {main === "login" && (
          <>
            <Topbar setMain={setMain} setUser={setUser} user={user} />
            <Login path="login" onChange={setToken} setMain={setMain} />
          </>
        )}
        {main === "register" && (
          <>
            <Topbar setMain={setMain} setUser={setUser} user={user} />
            <Register onChange={setUser} setMain={setMain} />
          </>
        )}
        {main === "home" && <Home user={user} token={token} />}
      </>
    </UserContext.Provider>
  );
}

export default App;
