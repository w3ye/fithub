import "./topbar.scss";
import { MdSearch, MdChat, MdNotifications, MdCancel } from "react-icons/md";

export default function Topbar(props) {
  const { token, setUser, user } = props;

  async function logout() {
    const result = await (
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      })
    ).json();
    setUser({});
    console.log(result);
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
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Workouts</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem" onClick={logout}>
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
