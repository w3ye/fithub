import './exerciseSearch.scss'
import axios from 'axios'
import { useState } from 'react'
import ExerciseListItem from './ExerciseListItem'

export default function ExerciseSearch (props) {
  const { onAdd } = props
  const [responseData, setResponseData] = useState(null)
  const [search, setSearch] = useState('')

  const handleChange = event => {
    setSearch(event.target.value.toLowerCase())
  }

  const handleSearch = event => {
    event.preventDefault()
    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/name/${search}`,
      headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY
      }
    }

    axios
      .request(options)
      .then(response => {
        setResponseData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const slicedResponseData = responseData => {
    if (responseData.length >= 12) {
      return responseData.slice(0, 12)
    } else return responseData
  }

  const parsedResponse =
    responseData &&
    slicedResponseData(responseData).map(exercise => (
      <ExerciseListItem
        key={exercise.id}
        id={exercise.id}
        bodyPart={exercise.bodyPart}
        equipment={exercise.equipment}
        gifUrl={exercise.gifUrl}
        name={exercise.name}
        target={exercise.target}
        onAdd={onAdd}
      />
    ))

  return (
    <div className='exercise-search'>
      Exercises
      <form className='exercise-search-bar'>
        <input
          onChange={handleChange}
          value={search}
          id='search-name'
          placeholder='search by name'
        ></input>
        <button type='submit' onClick={handleSearch}>
          Search
        </button>
      </form>
      <ul>{parsedResponse}</ul>
      <div id='exerciseStorage'></div>
    </div>
  )
}
