import "./exerciseSearch.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import ExerciseListItem from "./ExerciseListItem";

export default function ExerciseSearch(props) {
  const { onAdd } = props;
  const [responseData, setResponseData] = useState(null);
  const [search, setSearch] = useState("");
  const [searchPart, setSearchPart] = useState("");

  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/name/${search}`,
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    },
  };

  const handleChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleSearch = (event) => {
    event.preventDefault();

    axios
      .request(options)
      .then((response) => {
        setResponseData(response.data);
        setSearch("");
      })
      .catch((err) => {
        return err;
      });
  };

  const slicedResponseData = (responseData) => {
    if (responseData.length >= 12) {
      return responseData.slice(0, 12);
    } else return responseData;
  };

  const targetOption = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchPart}`,
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
    },
  };

  const handleSearchParts = (event) => {
    event.preventDefault();
    setSearchPart(event.target.value);
  };

  // this whole component will render first and then useEffect will happen,
  // once searchPart changes (the dependency), it will render again

  useEffect(() => {
    if (searchPart)
      axios
        .request(targetOption)
        .then((response) => {
          setResponseData(response.data);
        })
        .catch((err) => {
          return err;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPart]);

  const searchByBodyWeight = (event) => {
    const bodyWeightOptions = {
      method: "GET",
      url:
        "https://exercisedb.p.rapidapi.com/exercises/equipment/body%20weight",
      headers: {
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    };

    axios
      .request(bodyWeightOptions)
      .then(function (response) {
        setResponseData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const parsedResponse =
    responseData &&
    slicedResponseData(responseData).map((exercise) => (
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
    ));

  return (
    <>
      <div className="exercise-search">
        Exercises
        <form className="exercise-search-bar">
          <input
            onChange={handleChange}
            value={search}
            id="search-name"
            placeholder="search by name"
          ></input>
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        </form>
        <div id="exerciseStorage"></div>
      </div>
      <div>
        <button
          onClick={handleSearchParts}
          value="upper arms"
          className="square-button-item"
        >
          Arms
        </button>
        <button
          value="upper legs"
          onClick={handleSearchParts}
          className="square-button-item"
        >
          Legs
        </button>
        <button
          value="waist"
          onClick={handleSearchParts}
          className="square-button-item"
        >
          Abs
        </button>
        <button
          value="body weight"
          onClick={searchByBodyWeight}
          className="square-button-item"
        >
          Body Weight
        </button>
      </div>
      <ul>{parsedResponse}</ul>
    </>
  );
}
