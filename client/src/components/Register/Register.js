import { useState } from "react";
import "./Register.css";
import { registerUser } from "../../helpers/registerHelpers";
const bcrypt = require("bcryptjs");

// TODO if register success redirect to homepage
// TODO display error message to user
// TODO set cookie

export default function Register(props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function submit() {
    if (state.password === confirmPassword) {
      registerUser({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
      });
      // * automatically login
      // * redirect
      console.log("success");
      return;
    }
    console.log("err");
    return;
  }

  return (
    <div className="register-wrapper">
      <h1>Please Register</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          <p>First Name</p>
          <input
            onChange={(event) =>
              setState((prev) => ({ ...prev, firstName: event.target.value }))
            }
            type="text"
            name="name"
            id="first-name"
            required
          ></input>
        </label>
        <label>
          <p>Last Name</p>
          <input
            onChange={(event) =>
              setState((prev) => ({ ...prev, lastName: event.target.value }))
            }
            type="text"
            name="name"
            id="last-name"
            required
          ></input>
        </label>
        <label>
          <p>Email Address</p>
          <input
            onChange={(event) =>
              setState((prev) => ({ ...prev, email: event.target.value }))
            }
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            onChange={(event) =>
              setState((prev) => ({ ...prev, password: event.target.value }))
            }
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
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
