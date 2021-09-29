import "./GroupListItem.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export default function GroupListItem(props) {
  const { title } = props;

  return (
    // <li className='exercise'>
    //   <img src={gifUrl} alt='' className='exercise__item-image' />
    //   <h2>{name}</h2>
    //   <h2>{equipment}</h2>
    // </li>

    <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card className="groupCard">
            <Card.Img
              variant="top"
              src="https://theairtravelgroup.com/wp-content/uploads/group-icon-768x768.png"
              className="groupImage"
            />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
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
