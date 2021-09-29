import React, { useContext } from "react";
import "./center.scss";
import { TokenUserContext } from "../../App/App";
import GroupListItem from "../GroupList/GroupListItem";

export default function CenterGroups() {
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  const parsedGroups =
    user.user &&
    user.groups.map((friend) => (
      <GroupListItem
        key={friend.id}
        friend_first_name={friend.friend_first_name}
        friend_last_name={friend.friend_last_name}
        friend_email={friend.friend_email}
      />
    ));
  console.log(user);
  return (
    <div className="center groupContainer">
      <h2>
        {user.user ? user.user.first_name : ""}{" "}
        {user.user ? user.user.last_name : ""}'s Groups
      </h2>
      <ul className="groupsContainer">{user.user ? parsedGroups : ""}</ul>
    </div>
  );
}
