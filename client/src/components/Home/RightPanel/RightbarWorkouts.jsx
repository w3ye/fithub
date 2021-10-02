import "./rightbar.scss";
import { useContext, useEffect, useState } from "react";
import { TokenUserContext } from "../../App/App";
import axios from "axios";
import RightbarWorkoutListItem from "./RightbarWorkoutListItem";

export default function RightbarWorkouts(props) {
  console.log("in RightbarWorkouts", props);
  const [responseData, setResponseData] = useState(null);
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { stateId, setId, panels, setPanels } = props;

  useEffect(() => {
    axios
      .request(`/api/workouts/${user.user.id}`)
      .then((response) => {
        setResponseData(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const parsedResponse =
    responseData &&
    responseData.map((workout) => (
      <RightbarWorkoutListItem
        key={workout.id}
        id={workout.id}
        title={workout.title}
        group_ids={workout.group_ids}
        exercises={workout.exercises}
        responseData={responseData}
        setResponseData={setResponseData}
        panels={panels}
        setPanels={setPanels}
        setId={setId}
        stateId={stateId}
      />
    ));

  return (
    <div className="rightbar">
      My workouts
      <div>{parsedResponse}</div>
    </div>
  );
}
