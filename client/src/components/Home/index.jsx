import React, { useState } from "react";

import Topbar from "../topbar/Topbar";
import Leftbar from "./LeftPanel/Leftbar";
import Center from "./Center/Center";
// import CenterWorkouts from "./Center/CenterWorkouts";
import CenterFriends from "./Center/CenterFriends";
import CenterGroups from "./Center/CenterGroups";
import Rightbar from "./RightPanel/Rightbar";
import Workouts from "./RightPanel/Workouts";
import RightbarFriends from "./RightPanel/RightbarFriends";
import RightbarGroups from "./RightPanel/RightbarGroups";
import CenterGroupFeed from "./Center/CenterGroupFeed";
import "./index.scss";

export default function Home(props) {
  const { setMain } = props;
  const [panels, setPanels] = useState("groupfeed");
  const [workout, setWorkout] = useState([]);
  const [stateId, setId] = useState("");
  const [editWorkoutObj, setEditWorkoutObj] = useState("");
  const [group, setGroup] = useState({});
  const [request, setRequest] = useState([]);

  const onAdd = (exercise) => {
    setWorkout([...workout, { ...exercise, set: 1, reps: 10 }]);
  };

  return (
    <>
      <Topbar setMain={setMain} request={request} />
      <div className="homeContainer">
        <Leftbar setPanels={setPanels} />
        {panels === "home" && (
          <Center onAdd={onAdd} panels={panels} setPanels={setPanels} />
        )}
        {panels === "home" && (
          <Rightbar
            workout={workout}
            setWorkout={setWorkout}
            panels={panels}
            setPanels={setPanels}
            stateId={stateId}
          />
        )}

        {/* {panels === "workouts" && (
          <CenterWorkouts panels={panels} setPanels={setPanels} />
        )} */}
        {panels === "workouts" && (
          <Workouts
            panels={panels}
            setPanels={setPanels}
            setId={setId}
            editWorkoutObj={editWorkoutObj}
            setEditWorkoutObj={setEditWorkoutObj}
            workout={workout}
            setWorkout={setWorkout}
          />
        )}
        {panels === "friends" && <CenterFriends panels={panels} />}
        {panels === "friends" && (
          <RightbarFriends request={request} setRequest={setRequest} />
        )}
        {panels === "edit" && <Center onAdd={onAdd} />}
        {panels === "edit" && (
          <Rightbar
            workout={workout}
            setWorkout={setWorkout}
            stateId={stateId}
            setId={setId}
            editWorkoutObj={editWorkoutObj}
            setEditWorkoutObj={setEditWorkoutObj}
            panels={panels}
            setPanels={setPanels}
          />
        )}
        {panels === "groups" && (
          <CenterGroups setGroup={setGroup} group={group} />
        )}
        {panels === "groups" && (
          <RightbarGroups group={group} setPanels={setPanels} panels={panels} />
        )}
        {panels === "groupfeed" && (
          <CenterGroupFeed setGroup={setGroup} group={group} />
        )}
        {panels === "groupfeed" && (
          <CenterGroups setGroup={setGroup} group={group} panels={panels} />
        )}
      </div>
    </>
  );
}
