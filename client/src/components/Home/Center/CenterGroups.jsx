import React, { useContext, useState, useEffect } from "react";
import "./center.scss";
import { TokenUserContext } from "../../App/App";
import GroupListItem from "../GroupList/GroupListItem";
import CreateGroup from "./CreateGroup";
import axios from "axios";

export default function CenterGroups(props) {
  const { setGroup, group } = props;
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  const selectGroup = function (group) {
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

  return (
    <div className="center container">
      <h2>
        {user.user ? user.user.first_name : ""}{" "}
        {user.user ? user.user.last_name : ""}'s Groups
      </h2>
      <CreateGroup />
      <ul className="groupsContainer">{user.user ? parsedGroups : ""}</ul>
    </div>
  );
}
