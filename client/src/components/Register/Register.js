import { useState } from "react";
import axios from "axios";
import { registerUser } from "../../helpers/registerHelpers";

// TODO encrypt password
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
      registerUser(
        state.firstName,
        state.lastName,
        state.email,
        state.password
      );
      console.log("success");
      return;
    }
    console.log("err");
    return;
  }

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-group text-left">
          <label for="name">First name</label>
          <input
            onChange={(event) =>
              setState((prev) => ({ ...prev, firstName: event.target.value }))
            }
            type="text"
            name="name"
            id="name"
            required
          ></input>
        </div>
        <div className="form-group text-left">
          <label for="name">Last name</label>
          <input
            onChange={(event) =>
              setState((prev) => ({ ...prev, lastName: event.target.value }))
            }
            type="text"
            name="name"
            id="name"
            required
          ></input>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
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
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={(event) =>
              setState((prev) => ({ ...prev, password: event.target.value }))
            }
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <button onClick={submit} type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
