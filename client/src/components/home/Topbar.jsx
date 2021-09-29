import React, { useContext } from "react";
import "./topbar.css";
import { MdSearch } from "react-icons/md";
import { TokenUserContext } from "../App/App";
import axios from "axios";

export default function Topbar(props) {
  const { setMain } = props;

  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

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

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">FitHub</span>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <MdSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            type="text"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className='topbarLink'>Homepage</span>
          <span className='topbarLink'>Workouts</span> */}
          <p>
            Logged in as {user.user ? user.user.first_name + " " : ""}
            {user.user ? user.user.last_name : ""}
          </p>
        </div>
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <MdPerson />
          </div>
          <div className="tobarIconItem">
            <MdChat />
          </div>
          <div className="tobarIconItem">
            <MdNotifications />
          </div> */}
          <button onClick={logout}>Logout</button>
        </div>
        <img src="/assets/mario.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
}
