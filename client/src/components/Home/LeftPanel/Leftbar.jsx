import "./leftbar.scss";
import { GiMuscleUp } from "react-icons/gi";
import { FaUserFriends, FaHome, FaUser } from "react-icons/fa";

export default function Leftbar(props) {
  const { setPanels } = props;
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("home");
            }}
          >
            <FaHome className="leftbarIcon" />
            <span className="leftbarListItemText">Home</span>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("workouts");
            }}
          >
            <GiMuscleUp className="leftbarIcon" />
            <span className="leftbarListItemText">My workouts</span>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("friends");
            }}
          >
            <FaUser className="leftbarIcon" />
            <span className="leftbarListItemText">Friends</span>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("groups");
            }}
          >
            <FaUserFriends className="leftbarIcon" />
            <span className="leftbarListItemText">Groups</span>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("groupfeed");
            }}
          >
            <FaHome className="leftbarIcon" />
            <span className="leftbarListItemText">Group Feed</span>
          </li>
        </ul>
      </div>
      leftbar
    </div>
  );
}
