import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import { TokenUserContext } from "../App/App";

// TODO successful login should redirect user to somewhere else

export default function Login(props) {
  const { setMain } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useContext(TokenUserContext);
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  function fetchProtected() {
    fetch("/api/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setUser(result);
      })
      .catch((err) => {
        return err;
      });
  }

  async function submit() {
    const result = await (
      await fetch("/api/users/login", {
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
    ).json();

    if (result.accessToken) {
      await setToken(result.accessToken);
      fetchProtected();
    } else {
      return result.error;
    }
  }

  async function logout() {
    const result = await (
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      })
    ).json();
    setToken({});
    console.log(result);
  }

  useEffect(() => {
    console.log("token", token);
  }, [token]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

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
          <button type="submit" onClick={submit}>
            Submit
          </button>
          <br />
          <button onClick={() => setMain("dashboard")}>Back</button>
        </div>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
