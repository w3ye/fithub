import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

export default function ExerciseListItem (props) {
  const { id, name, equipment, gifUrl, bodyPart, target, onAdd } = props
  const exercise = { id, name, equipment, gifUrl, bodyPart, target }

  function capitalizeWords (string) {
    const words = string.split(' ')
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
    }
    const final = words.join(' ')
    return final
  }

  return (
    <Row xs={1} md={2} className='g-4'>
      {Array.from({ length: 1 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant='top' src={gifUrl} />
            <Card.Body key={id}>
              <Card.Title>Name: {capitalizeWords(name)}</Card.Title>
              <ListGroup className='list-group-flush'>
                <ListGroupItem>
                  Equipment: {capitalizeWords(equipment)}
                </ListGroupItem>
                <ListGroupItem>
                  Body Part: {capitalizeWords(bodyPart)}
                </ListGroupItem>
                <ListGroupItem>Target: {capitalizeWords(target)}</ListGroupItem>
              </ListGroup>
              <button onClick={() => onAdd(exercise)}>Add to Workout</button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
