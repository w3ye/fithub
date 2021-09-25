import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Navbar from "../Navbar/Navbar";

function App() {
  const [main, setMain] = useState();
  // const [currentUser, setCurrentUser] = useState();

  return (
    <>
      <Navbar setMain={setMain} />
      {main === "login" && <Login />}
      {main === "register" && <Register />}
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
