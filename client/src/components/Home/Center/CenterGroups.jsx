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

  function fetchGroups(id) {
    console.log(user);
    axios
      .get(`/api/groups/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        // setUser({ ...user, groups: result.data });
        console.log("RES", result.data);
      })
      .catch((err) => {
        return err;
      });
  }
  console.log("user.groups", user.groups);

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

  return (
    <div className="center container">
      <h2>
        {user.user ? user.user.first_name : ""}{" "}
        {user.user ? user.user.last_name : ""}'s Groups
      </h2>
      <CreateGroup fetchGroups={fetchGroups} />
      <ul className="groupsContainer">{user.user ? parsedGroups : ""}</ul>
    </div>
  );
}
