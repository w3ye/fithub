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

export const UserContext = React.createContext([]);

function App() {
  const [main, setMain] = useState();
  // const [user, setUser] = useState();
  // const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  // function handleRemoveCookie() {
  //   if (cookies) {
  //     removeCookie("name");
  //   }
  // }

  // function onChange(user) {
  //   setCookie("name", user.email, { path: "/" });
  //   setUser(user);
  // }

  // useEffect(() => {
  //   if (cookies) {
  //     findEmail(cookies.name).then((cookieUser) => {
  //       setUser(cookieUser);
  //     });
  //   }
  // }, [cookies]);

  // if (user) {
  //   return (
  //     <>
  //       <Topbar
  //         setMain={setMain}
  //         handleRemoveCookie={handleRemoveCookie}
  //         user={user}
  //       />
  //     </>
  //   );
  // }

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
    <UserContext.Provider value={[user, setUser]}>
      {/* <> */}
      <Topbar setMain={setMain} setUser={setUser} />
      {main === "login" && <Login path="login" onChange={setToken} />}
      {/* {main === "register" && <Register onChange={setUser} />}
      </> */}
    </UserContext.Provider>
  );
}

export default App;
