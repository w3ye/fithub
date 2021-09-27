import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Preferences from "../Preferences/Preferences";

export const UserContext = React.createContext([]);

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState({});

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

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
    // <div className="wrapper">
    //   <h1>Application</h1>
    //   <BrowserRouter>
    //     <Switch>
    //       <Route path="/dashboard">
    //         <Dashboard />
    //       </Route>
    //       <Route path="/preferences">
    //         <Preferences />
    //       </Route>
    //     </Switch>
    //   </BrowserRouter>
    // </div>
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Login path="login" />
      </div>
    </UserContext.Provider>
  );
}

export default App;
