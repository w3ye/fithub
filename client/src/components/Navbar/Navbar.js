import React from "react";

export default function Navbar(props) {
  const { setMain } = props;
  return (
    <div className="column">
      <h3>FitHub</h3>
      <button onClick={() => setMain("login")}>Login</button>
      <br />
      <button onClick={() => setMain("register")}>Register</button>
    </div>
  );
}
