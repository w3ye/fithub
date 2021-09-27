import "./topbar.css";
import { MdSearch, MdChat, MdNotifications, MdCancel } from "react-icons/md";

export default function Topbar(props) {
  const { setMain, handleRemoveCookie, user } = props;
  const handleLogout = () => {
    handleRemoveCookie();
  };

  if (!user) {
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
            <button onClick={() => setMain("login")}>Login</button>

            <button onClick={() => setMain("register")}>Register</button>
          </div>
          <img src="/assets/mario.jpeg" alt="" className="topbarImg" />
        </div>
      </div>
    );
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
          <p id="user-login-name">
            Logged in as {user.first_name} {user.last_name}
          </p>
          {/* <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Workouts</span> */}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem" onClick={handleLogout}>
            <MdCancel />
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
