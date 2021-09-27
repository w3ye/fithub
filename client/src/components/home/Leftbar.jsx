import "./leftbar.css"
import { GiMuscleUp } from 'react-icons/gi'
import { FaUserFriends, FaHome } from 'react-icons/fa'

export default function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
        <li className="leftbarListItem">
            <FaHome className="leftbarIcon"/>
          <span className="leftbarListItemText">
            Home
          </span>
          </li>
          <li className="leftbarListItem">
            <GiMuscleUp className="leftbarIcon"/>
          <span className="leftbarListItemText">
            My workouts
          </span>
          </li>
          <li className="leftbarListItem">
            <FaUserFriends className="leftbarIcon"/>
          <span className="leftbarListItemText">
            Friends
          </span>
          </li>
        </ul>
      </div>
      leftbar
    </div>
  )
}