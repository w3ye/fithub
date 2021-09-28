import Topbar from './Topbar'
import Leftbar from './Leftbar'
import Center from './Center'
import Rightbar from './Rightbar'
import './index.css'
import { useState } from 'react'

export default function Home () {
  const [workout, setWorkout] = useState([])

  const onAdd = exercise => {
    setWorkout([...workout, { ...exercise, set: 1, reps: 10 }])
  }
  return (
    <>
      <Topbar />
      <div className='homeContainer'>
        <Leftbar />
        <Center onAdd={onAdd} />
        <Rightbar workout={workout} setWorkout={setWorkout} />
      </div>
    </>
  )
}
