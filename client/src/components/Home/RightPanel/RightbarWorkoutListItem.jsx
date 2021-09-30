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

  function handleShow (breakpoint) {
    setFullscreen(breakpoint)
    setShow(true)
  }

  useEffect(() => {
    let interval = null
    if (countdown) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [countdown])

  //loop through the array of exercises,
  // set a timer for each image based on the reps and sets
  useEffect(() => {
    // function getGif () {
    //   exercise.forEach((element, index) => {
    //     setTimeout(() => {
    //       console.log(element.gifUrl)
    //       // ;<GifListItem
    //       //   key={index}
    //       //   gif={element.gifUrl}
    //       //   name={element.name}
    //       //   reps={element.reps}
    //       //   sets={element.sets}
    //       // />
    //     }, 1000 * index)
    //   })
    const timeout = setTimeout(() => {
      console.log('index', index)
      if (index > -1) setIndex(prev => prev + 1)
    }, 5000)
    let endTimeout = exercise.length - 1
    if (index === endTimeout) {
      clearTimeout(timeout)
    }
    return () => clearTimeout(timeout)
    // }
  })
  console.log('index', index)
  console.log('exercise', exercise[index])
  // getGif()

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
          {title}
          <img src={exercise[index].gifUrl} alt={exercise[index].name} />
          <div>{time / 1000}</div>
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

// render(<RightbarWorkoutListItem />)
// useEffect(() => {
//   console.log('in UseEffect', title)
// }, [title])
