import React, { useContext } from "react";
import "./center.scss";
import { TokenUserContext } from "../../App/App";
import GroupListItem from "../GroupList/GroupListItem";
import CreateGroup from "./CreateGroup";

export default function CenterGroups(props) {
  const { setGroup, panels } = props;
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;

  const selectGroup = (group) => {
    setGroup(group);
  };

  const parsedGroups =
    user.user &&
    user.groups.map((group) => (
      <GroupListItem
        key={group.id}
        group_id={group.group_id}
        group={group}
        title={group.title}
        selectGroup={selectGroup}
        user={user}
      />
    ));

  if (panels === "groupfeed") {
    return (
      <div className="center container slim">
        <h2>Select Group Feed</h2>
        <ul className="groupsContainer">{user.user ? parsedGroups : ""}</ul>
      </div>
    );
  }

  return (
    <div className="center">
      <div class="centerHeader grouper">
        <h1>My Groups</h1>
        <CreateGroup />
      </div>
      <ul className="groupsContainer">{user.user ? parsedGroups : ""}</ul>
    </div>
  );
}
