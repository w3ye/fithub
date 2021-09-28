import React, { useContext } from "react";
import "./topbar.css";
import { MdPerson, MdSearch, MdChat, MdNotifications } from "react-icons/md";
import { TokenUserContext } from "../App/App";

export default function Topbar() {
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;
  console.log("HOME USER:", user);
  console.log("HOME TOKEN:", token);

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
          <div className="topbarIconItem">
            <MdPerson />
          </div>
          <div className="tobarIconItem">
            <MdChat />
          </div>
          <div className="tobarIconItem">
            <MdNotifications />
          </div>
        </div>
        <img src="/assets/mario.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
}
