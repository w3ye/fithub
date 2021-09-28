import './center.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ExerciseListItem from './ExerciseListItem'

export default function Center () {
  const [responseData, setResponseData] = useState(null)

  const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    headers: {
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_KEY
    }
  }

  // options.url =
  //   'https://exercisedb.p.rapidapi.com/exercises/name/' +
  //   document.getElementById('search-name').value

  // function searchByName () {
  //   let exerciseStore = document.getElementById('exerciseStorage')
  //   exerciseStore.innerHTML = ''
  // }

  useEffect(() => {
    axios
      .request(options)
      .then(response => {
        setResponseData(response.data)
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  if (responseData === null) return null

  const parsedResponse = responseData.map(exercise => (
    <ExerciseListItem
      key={exercise.id}
      bodyPart={exercise.bodyPart}
      equipment={exercise.equipment}
      gifUrl={exercise.gifUrl}
      name={exercise.name}
    />
  ))

  return (
    <div className='center'>
      Center
      <input
        // onChange={searchByName}
        id='search-name'
        placeholder='search by name'
      ></input>
      <ul>{parsedResponse}</ul>
      <div id='exerciseStorage'></div>
    </div>
  )
}
