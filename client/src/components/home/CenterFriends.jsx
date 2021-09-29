import React, { useContext } from "react";
import "./center.scss";
import { TokenUserContext } from "../App/App";
import FriendListItem from "./FriendListItem";

export default function CenterFriends() {
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  const parsedFriends =
    user.user &&
    user.friends.map((friend) => (
      <FriendListItem
        key={friend.id}
        friend_first_name={friend.friend_first_name}
        friend_last_name={friend.friend_last_name}
        friend_email={friend.friend_email}
      />
    ));
  console.log("Current User:", user);
  return (
    <div className="center friendContainer">
      <h2>
        {user.user ? user.user.first_name : ""}{" "}
        {user.user ? user.user.last_name : ""}'s Friends
      </h2>
      <ul className="friendsContainer">{user.user ? parsedFriends : ""}</ul>
    </div>
  );
}
