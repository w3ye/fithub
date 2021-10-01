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
    const element = document.getElementById(group.group_id);
    element.classList.toggle("selected");
  }

  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card
            id={group.group_id}
            className="groupCard"
            onClick={() => {
              selectGroup(group);
              removeSelectedClass();
              toggleSelected();
            }}
          >
            <Card.Img
              variant="top"
              src="https://theairtravelgroup.com/wp-content/uploads/group-icon-768x768.png"
              className="groupImage"
            />
            <Card.Body>
              <Card.Title>{group.title}</Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{totalMembers + 1} Members</ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
