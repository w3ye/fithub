import React, { useContext } from "react";
import { TokenUserContext } from "../App/App";
import "./topbar.scss";
import axios from "axios";
import User from "./User";

export default function Topbar(props) {
  const { setMain } = props;

  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
<<<<<<< HEAD
  const [setUser] = userState;
=======
  // Do not remove user from userState [] as it gets used on logout
  const [user, setUser] = userState;
>>>>>>> e7ba0382fc34a94e77e722db06e8ad95ea0f0cd4

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
