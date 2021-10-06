import "./leftbar.scss";
import { GiMuscleUp } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
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
              setPanels("groupfeed");
            }}
          >
            <div class="navTitle">
              <div>
                <FaHome className="leftbarIcon" size={40} />
              </div>
              <h3 className="leftbarListItemText">Home</h3>
            </div>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("home");
            }}
          >
            <div class="navTitle">
              <div>
                <CgGym className="leftbarIcon" size={40} />
              </div>
              <h3 className="leftbarListItemText">Create Workout</h3>
            </div>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("workouts");
            }}
          >
            <div class="navTitle">
              <div>
                <GiMuscleUp className="leftbarIcon" size={40} />
              </div>
              <h3 className="leftbarListItemText">My Workouts</h3>
            </div>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("friends");
            }}
          >
            <div class="navTitle">
              <div>
                <FaUser className="leftbarIcon" size={40} />
              </div>
              <h3 className="leftbarListItemText">Friends</h3>
            </div>
          </li>
          <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("groups");
            }}
          >
            <div class="navTitle">
              <div>
                <FaUserFriends className="leftbarIcon" size={40} />
              </div>
              <h3 className="leftbarListItemText">Groups</h3>
            </div>
          </li>
          {/* <li
            className="leftbarListItem"
            onClick={() => {
              setPanels("groupfeed");
            }}
          >
            <FaHome className="leftbarIcon" />
            <span className="leftbarListItemText">Group Feed</span>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
