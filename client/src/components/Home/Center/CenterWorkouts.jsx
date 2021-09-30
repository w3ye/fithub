import './center.scss'
// import { useState } from 'react'
// import { axios } from 'axios'

export default function CenterWorkouts () {
  //   axios
  //     .get()
  //     .request(options)
  //     .then(res => {
  //       setUploadWorkout(res.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // const slicedResponseData = responseData => {
  //   if (responseData.length >= 12) {
  //     return responseData.slice(0, 12)
  //   } else return responseData
  // }

  // const parsedResponse =
  //   responseData &&
  //   slicedResponseData(responseData).map(exercise => (
  //     <ExerciseListItem
  //       key={exercise.id}
  //       id={exercise.id}
  //       bodyPart={exercise.bodyPart}
  //       equipment={exercise.equipment}
  //       gifUrl={exercise.gifUrl}
  //       name={exercise.name}
  //       target={exercise.target}
  //       onAdd={onAdd}
  //     />
  //   ))

  return (
    <>
      <div className='center'>
        I'm the center panel for the workouts tab!
        <div className='exercise-search'>
          Current Workout
          {/* <ul>{parsedResponse}</ul>
      <div id='exerciseStorage'></div> */}
        </div>
      </div>
    </>
  )
}
