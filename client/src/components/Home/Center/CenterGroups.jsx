import React, { useContext, useState } from "react";
import "./center.scss";
import { TokenUserContext } from "../../App/App";
import GroupListItem from "../GroupList/GroupListItem";

export default function CenterGroups(props) {
  const { setSelected } = props;
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  const selectGroup = function (group) {
    setSelected(group);
  };

  const parsedGroups =
    user.user &&
    user.groups.map((group) => (
      <GroupListItem
        key={group.id}
        group={group}
        title={group.title}
        selectGroup={selectGroup}
      />
    ));
  console.log(user);
  return (
    <div className="center container">
      <h2>
        {user.user ? user.user.first_name : ""}{" "}
        {user.user ? user.user.last_name : ""}'s Groups
      </h2>
      <button>Create New Group</button>
      <ul className="groupsContainer">{user.user ? parsedGroups : ""}</ul>
    </div>
  );
}
