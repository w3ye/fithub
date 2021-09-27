import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import { UserContext } from "../App/App";

// TODO Login should set the cookie for current user
// TODO password should be decrypted when recieving from database
// TODO successful login should redirect user to somewhere else

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);

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
      setUser({
        accessToken: result.accessToken,
      });
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
    setUser({});
    console.log(result);
  }

  useEffect(() => {
    console.log(user);
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
        </div>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
