import React, { useContext } from "react";
import "./center.scss";
import { TokenUserContext } from "../../App/App";
import FriendListItem from "../FriendList/FriendListItem";

export default function CenterFriends(props) {
  const { panels } = props;
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;

  const parsedFriends =
    user.user &&
    user.friends.map((friend) => (
      <FriendListItem
        key={friend.id}
        friend_first_name={friend.friend_first_name}
        friend_last_name={friend.friend_last_name}
        friend_email={friend.friend_email}
        friend_avatar={friend.friend_avatar}
        panels={panels}
      />
    ));
  return (
    <div className="center container">
      <h1>My Friends</h1>
      <ul className="friendsContainer">{user.user ? parsedFriends : ""}</ul>
    </div>
  );
}
