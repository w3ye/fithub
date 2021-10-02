import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import './RightbarWorkoutListItem.scss'
import WorkoutListItemDescription from './WorkoutListItemDescription'

export default function RightbarWorkoutListItem (props) {
  const { title, exercises } = props
  const [fullscreen, setFullscreen] = useState(true)
  const [show, setShow] = useState(false)
  const [index, setIndex] = useState(0)

  function handleShow (breakpoint) {
    setFullscreen(breakpoint)
    setShow(true)
  }

  function previous () {
    if (exercises.length < 2) {
      return
    }
    setIndex(prev => prev - 1)
  }

  function next () {
    setIndex(prev => prev + 1)
  }

  return (
    <>
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>{title.toUpperCase()}</Card.Title>
          <Card.Text>
            {exercises.map(item => (
              <WorkoutListItemDescription
                key={item.id}
                name={item.name}
                set={item.set}
                reps={item.reps}
              />
            ))}
          </Card.Text>
          <Button variant='primary' onClick={() => handleShow(true)}>
            Start Workout
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {exercises.length !== index ? (
            <>
              {exercises[index].name}
              <img src={exercises[index].gifUrl} alt={exercises[index].name} />
              <div>Set: {exercises[index].set}</div>
              <div>Reps: {exercises[index].reps}</div>
            </>
          ) : (
            <>
              <div> You did it! </div>
              <img
                src='https://media1.giphy.com/media/BqijAlej4RV7O/giphy.gif?cid=ecf05e47nf3oiylzaxxzlk98mzb6t8nskx84noqgwicheqhf&rid=giphy.gif&ct=g'
                alt='mario-party'
              />
            </>
          )}
          {index > 0 && (
            <Button className='me-2' onClick={() => previous()}>
              Previous
            </Button>
          )}
          {exercises.length !== index && (
            <Button className='me-2' onClick={() => next()}>
              Next
            </Button>
          )}
          <Button className='me-2' onClick={() => setIndex(0)}>
            Restart
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}