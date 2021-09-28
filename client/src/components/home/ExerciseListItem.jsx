import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

export default function ExerciseListItem (props) {
  const { name, equipment, gifUrl, bodyPart, target } = props
  return (
    // <li className='exercise'>
    //   <img src={gifUrl} alt='' className='exercise__item-image' />
    //   <h2>{name}</h2>
    //   <h2>{equipment}</h2>
    // </li>

    <Row xs={1} md={2} className='g-4'>
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant='top' src={gifUrl} />
            <Card.Body>
              <Card.Title>Name: {name}</Card.Title>
              <ListGroup className='list-group-flush'>
                <ListGroupItem>Equipment: {equipment}</ListGroupItem>
                <ListGroupItem>Body Part: {bodyPart}</ListGroupItem>
                <ListGroupItem>Target: {target}</ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
