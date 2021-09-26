import React, { useState } from "react";
import "./Login.css";
import { findEmail, validateUser } from "../../helpers/userHelpers";

// TODO Login should set the cookie for current user
// TODO password should be decrypted when recieving from database
// TODO successful login should redirect user to somewhere else

export default function Login(props) {
  const { onChange } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // send the username and password to the server
    const user = await findEmail(email);
    // set the state of the user
    if (validateUser(user, password)) {
      onChange(user);
    }
  };

  //   function submit() {
  //     findEmail(email)
  //       .then((user) => {
  //         return user;
  //       })
  //       .then((user) => {
  //         const flag = validateUser(user, password);
  //         console.log(flag);
  //       });
  //   }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
