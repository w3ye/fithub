import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState, useRef, useEffect } from 'react'
import './RightbarWorkoutListItem.scss'
import WorkoutListItemDescription from './WorkoutListItemDescription'

export default function RightbarWorkoutListItem (props) {
  console.log('props in WorkoutList item', props)
  const { id, title, user_id, group_ids, exercise } = props
  // const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down']
  const [fullscreen, setFullscreen] = useState(true)
  const [show, setShow] = useState(false)
  const [time, setTime] = useState(5000)
  const [countdown, setCountdown] = useState(false)
  const [index, setIndex] = useState(0)
  const [reps, setReps] = useState('')

  function handleShow (breakpoint) {
    setFullscreen(breakpoint)
    setShow(true)
    setCountdown(true)
  }

  useEffect(() => {
    let interval = null
    setTime(exercise[index].reps * 1000)
    if (countdown) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [countdown, exercise, index])

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('index', index)
      console.log('exercise.length', exercise.length)
      if (index > -1) setIndex(prev => prev + 1)
    }, 1000 * exercise[index].reps)
    let endTimeout = exercise.length - 1
    if (index === endTimeout) {
      clearTimeout(timeout)
    }
    return () => clearTimeout(timeout)
  })
  console.log('index', index)
  console.log('exercise', exercise[index])

  return (
    <>
      <Card>
        <Card.Header>Featured</Card.Header>
        <Card.Body>
          <Card.Title>{title.toUpperCase()}</Card.Title>
          <Card.Text>
            {exercise.map(item => (
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
      {/* <Button key={id} className='me-2' onClick={() => handleShow(true)}>
        {title.toUpperCase()}
      </Button> */}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {exercise[index].name}
          {exercise.length && (
            <img src={exercise[index].gifUrl} alt={exercise[index].name} />
          )}
          <div>Set: {exercise[index].set}</div>
          <div>Reps: {exercise[index].reps}</div>
          <div>Reps left: {time / 1000}</div>
          <Button className='me-2' onClick={() => setCountdown(true)}>
            Start
          </Button>
          <Button className='me-2' onClick={() => setCountdown(false)}>
            Stop
          </Button>
          <Button className='me-2' onClick={() => setCountdown(true)}>
            Resume
          </Button>
          <Button className='me-2' onClick={() => setTime(5000)}>
            Restart
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
