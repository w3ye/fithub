import Topbar from './Topbar'
import Leftbar from './Leftbar'
import Center from './Center'
import Rightbar from './Rightbar'
import './index.css'
import { useState } from 'react'

export default function Home () {
  const [workout, setWorkout] = useState([])
  const onAdd = exercise => {
    console.log('workout', workout)
    const exist = workout.find(x => x.id === exercise.id)
    console.log('exist', exist)

    console.log('exercise', exercise)
    // if (exercise) {
    //   setWorkout(
    //     workout.map(x =>
    //       x.id === exercise.id ? { ...exist, set: exist.set + 1 } : x
    //     )
    //   )
    // } else {
    setWorkout([...workout, { ...exercise, set: 1, reps: 1 }])
    // }
  }
  return (
    <>
      <Topbar />
      <div className='homeContainer'>
        <Leftbar />
        <Center onAdd={onAdd} />
        <Rightbar workout={workout} setWorkout={setWorkout} onAdd={onAdd} />
      </div>
    </>
  )
}
