import { useState, useContext, useEffect } from "react";
import { TokenUserContext } from "../../App/App";
import { BsPersonPlusFill } from "react-icons/bs";
import MemberListItem from "./MemberListItem";
import FriendListItem from "../FriendList/FriendListItem";
import "./rightbar.scss";
import axios from "axios";

export default function RightbarGroups(props) {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { group, setPanels, panels } = props;
  const [members, setMembers] = useState([]);
  const [addFriends, setAddFriends] = useState(false);

  useEffect(() => {
    getMembers(group.group_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  function getMembers(group_ID) {
    axios
      .post("/api/groups/members", { groupId: group_ID, userId: user.user.id })
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        return err;
      });
  }

  function showAddFriends() {
    setAddFriends(true);
  }

  const parsedFriends =
    user.user &&
    user.friends.map((friend) => (
      <FriendListItem
        className="small-size"
        thisId={friend.friend_id}
        key={friend.id}
        friend_first_name={friend.friend_first_name}
        friend_last_name={friend.friend_last_name}
        friend_avatar={friend.friend_avatar}
        friend_email={friend.friend_email}
        group={group}
        setPanels={setPanels}
        panels={panels}
      />
    ));

  const parsedMembers =
    user.user &&
    members.map((memberObj) => (
      <MemberListItem
        key={memberObj.user_id}
        avatar={memberObj.avatar_url}
        first_name={memberObj.first_name}
        last_name={memberObj.last_name}
      />
    ));

  if (!group.title) {
    return <></>;
  }
  if (addFriends) {
    return (
      <div className="rightbar container">
        <div class="memberContainer">
          <h2 class="rightHeader">{group.title} Members</h2>
          <div id="memberList">{parsedMembers}</div>
        </div>
        {group.title && <h5>Add Friends:</h5>}
        <ul className="friendsContainer">{user.user ? parsedFriends : ""}</ul>
      </div>
    );
  }
  return (
    <div className="rightbar container">
      <div class="memberContainer">
        <h2 class="rightHeader">{group.title} Members</h2>
        <div id="memberList">{parsedMembers}</div>
      </div>
      <div>
        <h3>Add Friend to Group</h3>
        <BsPersonPlusFill
          size={50}
          onClick={() => {
            showAddFriends();
          }}
        />
      </div>
      {/* {group.title && <h5>Add Friends:</h5>}
      <ul className="friendsContainer">{user.user ? parsedFriends : ""}</ul> */}
    </div>
  );
}
