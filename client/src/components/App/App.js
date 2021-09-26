import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import { findEmail } from "../../helpers/userHelpers";

import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Navbar from "../Navbar/Navbar";
import Topbar from "../topbar/Topbar";

function App() {
  const [main, setMain] = useState();
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  function handleRemoveCookie() {
    if (cookies) {
      removeCookie("name");
    }
  }

  function onChange(user) {
    setCookie("name", user.email, { path: "/" });
    setUser(user);
  }

  useEffect(() => {
    if (cookies) {
      findEmail(cookies.name).then((cookieUser) => {
        setUser(cookieUser);
      });
    }
  }, [cookies]);

  if (user) {
    return (
      <>
        <Topbar setMain={setMain} handleRemoveCookie={handleRemoveCookie} />
        <div>
          {user.first_name} {user.last_name} is logged in
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar setMain={setMain} setUser={setUser} />
      {main === "login" && <Login onChange={onChange} />}
      {main === "register" && <Register onChange={onChange} />}
      <div className="wrapper">
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
