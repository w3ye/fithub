import "./rightbar.scss";
import { useContext, useEffect, useState } from "react";
import { TokenUserContext } from "../../App/App";
import axios from "axios";
import RightbarWorkoutListItem from "./RightbarWorkoutListItem";
import "./workouts.scss";

export default function Workouts(props) {
  const [responseData, setResponseData] = useState(null);
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { setPanels, setEditWorkoutObj, setWorkout } = props;

  useEffect(() => {
    axios
      .request(`/api/workouts/${user.user.id}`)
      .then((response) => {
        setResponseData(response.data);
        return response;
      })
      .catch((err) => {
        return err;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parsedResponse =
    responseData &&
    responseData.map((workoutx) => (
      <RightbarWorkoutListItem
        key={workoutx.id}
        id={workoutx.id}
        title={workoutx.title}
        exercises={workoutx.exercises}
        responseData={responseData}
        setResponseData={setResponseData}
        setPanels={setPanels}
        setEditWorkoutObj={setEditWorkoutObj}
        setWorkout={setWorkout}
      />
    ));

  return (
    <div className="center" id="center-myworkout">
      <div className="container-title-workouts">
        <h1 className="title-myworkouts"> My workouts</h1>
        <div id="workoutListContainer">{parsedResponse}</div>
      </div>
    </div>
  );
}
