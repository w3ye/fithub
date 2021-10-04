import React, { useContext } from "react";
import { TokenUserContext } from "../../App/App";
import RightGroupFeedListItem from "./RightGroupFeedListItem";
import "./rightbar.scss";

export default function RightbarGroupFeed(props) {
  const { group, setGroup } = props;
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;

  const selectGroup = function (group) {
    setGroup(group);
  };

  const parsedGroups =
    user.user &&
    user.groups.map((group) => (
      <RightGroupFeedListItem
        key={group.id}
        group_id={group.group_id}
        group={group}
        title={group.title}
        selectGroup={selectGroup}
        user={user}
      />
    ));

  return (
    <>
      <div className="right container">
        <div>This is the rightbarGroupFeed</div>
        <h2>
          {user.user ? user.user.first_name : ""}{" "}
          {user.user ? user.user.last_name : ""}'s Groups
        </h2>
        <ul className="groupsContainer">{user.user ? parsedGroups : ""}</ul>
      </div>
    </>
  );
}
