import React, { useState, useContext } from "react";
import "./Login.css";
import { TokenUserContext } from "../App/App";
import axios from "axios";

export default function Login(props) {
  const { setMain } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  function fetchProtected(token) {
    axios
      .get("/api/protected", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => {
        return err;
      });
  }

  function submitLogin() {
    fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result.accessToken) {
          setToken(result.accessToken);
          fetchProtected(result.accessToken);
          setMain("home");
        } else throw new Error(result.error);
      })
      .catch((err) => err);
  }

  // useEffect(() => {
  //   console.log("token", token);
  // }, [token]);
  // useEffect(() => {
  //   console.log("user", user);
  // }, [user]);

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          <p>Email Address</p>
          <input
            name="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            name="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div>
          <button type="submit" onClick={submitLogin}>
            Submit
          </button>
          <br />
          <button onClick={() => setMain("dashboard")}>Back</button>
        </div>
      </form>
    </div>
  );
}
