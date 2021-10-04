import React, { useContext } from "react";
import { TokenUserContext } from "../App/App";
import "./topbar.scss";
import axios from "axios";
import User from "./User";

export default function Topbar(props) {
  const { setMain } = props;

  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [setUser] = userState;

  async function logout() {
    axios
      .post("/api/users/logout", {
        credentials: "include",
      })
      .then((result) => {
        setToken("");
        setUser({});
        setMain("dashboard");
        return result.data;
      })
      .catch((err) => err);
  }

  if (!token) {
    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">FitHub</span>
        </div>
      </div>
    );
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">FitHub</span>
      </div>
      <div className="topbarRight">
        <User logout={logout} />
      </div>
    </div>
  );
}
