import React, { useState } from "react";
import "./Login.css";
import { findEmail, validateUser } from "../../helpers/userHelpers";

// TODO Login should set the cookie for current user
// TODO password should be decrypted when recieving from database
// TODO successful login should redirect user to somewhere else

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    findEmail(email)
      .then((user) => {
        return user;
      })
      .then((user) => {
        const flag = validateUser(user, password);
        console.log(flag);
      });
  }

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
    </div>
  );
}
