import { useState, useEffect } from "react";

import "./GroupListItem.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from "axios";

export default function GroupListItem(props) {
  const { group, selectGroup, user, group_id } = props;
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    getMembers(group_id);
  }, []);

  function depluralize(num, string) {
    if (num > 1 || num === 0) {
      return string + "s";
    }
    return string;
  }

  function getMembers(group_ID) {
    axios
      .post("/api/groups/members", { groupId: group_ID, userId: user.user.id })
      .then((res) => {
        setTotalMembers(res.data.length);
      })
      .catch((err) => {
        return err;
      });
  }

  function removeSelectedClass() {
    const classes = document.getElementsByClassName("selected");
    while (classes.length) classes[0].classList.remove("selected");
  }

  function toggleSelected() {
    const element = document.getElementById("G" + group.group_id);
    element.classList.toggle("selected");
  }

  return (
    <div
      id={"G" + group.group_id}
      className="groupCard"
      onClick={() => {
        selectGroup(group);
        removeSelectedClass();
        toggleSelected();
        console.log("group", group);
      }}
    >
      <div className="groupImage">
        <img
          variant="top"
          src="https://theairtravelgroup.com/wp-content/uploads/group-icon-768x768.png"
          className="groupImage"
          alt=""
        />
      </div>
      <div className="groupText">
        <h3>{group.title}</h3>

        <h5>
          {totalMembers + 1} {depluralize(totalMembers + 1, "Member")}
        </h5>
      </div>
    </div>
  );
}
