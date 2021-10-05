import { useState, useContext, useEffect } from "react";
import "../Login/Login.scss";
import { registerUser } from "../../helpers/registerHelpers";
import { TokenUserContext } from "../App/App";
import Button from "react-bootstrap/Button";
import axios from "axios";

// TODO display error message to user

export default function Register(props) {
  const { setMain } = props;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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

  function fetchToken() {
    let email = state.email;
    let password = confirmPassword;
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

  function submitRegister() {
    if (state.password === confirmPassword) {
      registerUser({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
      })
        .then((res) => {
          fetchToken();
        })
        .catch((err) => err);
    }
    return;
  }

  return (
    <div className="login-wrapper registration">
      <div id="loginForm">
        <h1>Please Register</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <p>Email Address</p>
            <input
              onChange={(event) =>
                setState((prev) => ({ ...prev, email: event.target.value }))
              }
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div>
            <p>Password</p>
            <input
              onChange={(event) =>
                setState((prev) => ({ ...prev, password: event.target.value }))
              }
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <div>
            <p>Confirm Password</p>
            <input
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              className="form-control"
              id="confirmPassword"
            />
          </div>
          <div class="buttonGroup">
            <Button variant="light" onClick={() => setMain("dashboard")}>
              Back
            </Button>
            <Button variant="light" type="submit" onClick={submitRegister}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
