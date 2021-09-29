import "./GroupListItem.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default function GroupListItem(props) {
  const { group, selectGroup } = props;

  function removeSelectedClass() {
    const selected = document.getElementsByClassName("selected");
    while (selected.length) selected[0].classList.remove("selected");
  }

  function toggleSelected() {
    const element = document.getElementById(group.group_id);
    element.classList.toggle("thisClass");
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
                <ListGroupItem></ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
