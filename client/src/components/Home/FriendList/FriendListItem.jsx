import "./FriendListItem.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default function FriendListItem(props) {
  const { friend_first_name, friend_last_name, friend_email } = props;

  return (
    // <li className='exercise'>
    //   <img src={gifUrl} alt='' className='exercise__item-image' />
    //   <h2>{name}</h2>
    //   <h2>{equipment}</h2>
    // </li>

    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card className="friendCard">
            <Card.Img
              variant="top"
              src="https://www.pngkey.com/png/full/115-1150092_png-file-person-icon.png"
              className="friendImage"
            />
            <Card.Body>
              <Card.Title>
                Name: {friend_first_name} {friend_last_name}
              </Card.Title>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Email: {friend_email}</ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
