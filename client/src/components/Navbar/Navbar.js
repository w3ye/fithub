import React from "react";

export default function Navbar(props) {
  const { setMain, handleRemoveCookie } = props;

  const handleLogout = () => {
    handleRemoveCookie();
  };

  return (
    <div className="column">
      <h3>FitHub</h3>
      <button onClick={() => setMain("login")}>Login</button>
      <br />
      <button onClick={() => setMain("register")}>Register</button>
      <br />
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
