import './exerciseSearch.css'
import axios from 'axios'
import { useState } from 'react'
import ExerciseListItem from './ExerciseListItem'

export default function ExerciseSearch (props) {
  const { onAdd } = props
  const [responseData, setResponseData] = useState(null)
  const [search, setSearch] = useState('')

  const handleChange = event => {
    setSearch(event.target.value)
    console.log(event.target.value)
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
        console.log('using new options', response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const parsedResponse =
    responseData &&
    responseData.map(exercise => (
      <ExerciseListItem
        key={exercise.id}
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
