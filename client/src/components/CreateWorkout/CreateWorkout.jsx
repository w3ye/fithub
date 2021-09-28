import React, { useEffect, useState } from "react";
import ExerciseListItem from "../home/ExerciseListItem";
const axios = require("axios").default;
require("dotenv").config();
const myKey = process.env.REACT_APP_API_KEY;

export default function CreateWorkout() {
  const [responseData, setResponseData] = useState(null);
  let parsedResponse = [];

  function parseResponse() {
    if (responseData !== null) {
      parsedResponse = responseData.map((exercise) => (
        <ExerciseListItem
          key={exercise.id}
          bodyPart={exercise.bodyPart}
          equipment={exercise.equipment}
          gifUrl={exercise.gifUrl}
          name={exercise.name}
        />
      ));
      return parsedResponse;
    }
  }

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/name/`,
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      "x-rapidapi-key": myKey,
    },
  };

  function searchByName() {
    let exerciseStore = document.getElementById("exerciseStorage");
    exerciseStore.innerHTML = "";

    options.url =
      "https://exercisedb.p.rapidapi.com/exercises/name/" +
      document.getElementById("search-name").value;

    axios
      .request(options)
      .then(function (response) {
        setResponseData(response.data);
        parseResponse();
        console.log(parsedResponse);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="column">
      <h3>Exercise API</h3>
      <input
        onChange={searchByName}
        id="search-name"
        placeholder="search by name"
      ></input>
      <div id="exerciseStorage">{parsedResponse}</div>
    </div>
  );
}
