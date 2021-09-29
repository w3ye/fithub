import { useState, useContext, useEffect } from "react";
import "./Register.css";
import { registerUser } from "../../helpers/registerHelpers";
import { TokenUserContext } from "../App/App";
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
        console.log("KYLE:", result.data);
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
        .then(() => {
          console.log("success");
        });
    }
    console.log("err");
    return;
  }

  useEffect(() => {
    console.log("token", token);
  }, [token]);
  useEffect(() => {
    console.log("user", user);
  }, [user]);

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
          <button type="submit" onClick={submitRegister}>
            Submit
          </button>
          <br />
          <button onClick={() => setMain("dashboard")}>Back</button>
        </div>
      </form>
    </div>
  );
}
