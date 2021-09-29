import React, { useState } from "react";

import Topbar from "../topbar/Topbar";
import Leftbar from "./LeftPanel/Leftbar";
import Center from "./Center/Center";
import CenterWorkouts from "./Center/CenterWorkouts";
import CenterFriends from "./Center/CenterFriends";
import CenterGroups from "./Center/CenterGroups";
import Rightbar from "./RightPanel/Rightbar";
import RightbarWorkouts from "./RightPanel/RightbarWorkouts";
import RightbarFriends from "./RightPanel/RightbarFriends";
import "./index.scss";

export default function Home(props) {
  const { setMain } = props;
  const [panels, setPanels] = useState("home");
  const [workout, setWorkout] = useState([]);

  const onAdd = (exercise) => {
    setWorkout([...workout, { ...exercise, set: 1, reps: 10 }]);
  };
  return (
    <>
      <Topbar setMain={setMain} />
      <div className="homeContainer">
        <Leftbar setPanels={setPanels} />
        {panels === "home" && <Center onAdd={onAdd} />}
        {panels === "home" && (
          <Rightbar workout={workout} setWorkout={setWorkout} />
        )}
        {panels === "workouts" && <CenterWorkouts />}
        {panels === "workouts" && <RightbarWorkouts />}
        {panels === "friends" && <CenterFriends />}
        {panels === "friends" && <RightbarFriends />}
        {panels === "groups" && <CenterGroups />}
        {panels === "groups" && <RightbarFriends />}
      </div>
    </>
  );
}
