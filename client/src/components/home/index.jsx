import React, { useState } from "react";

import Topbar from "./Topbar";
import Leftbar from "./Leftbar";
import Center from "./Center";
import CenterWorkouts from "./CenterWorkouts";
import CenterFriends from "./CenterFriends";
import Rightbar from "./Rightbar";
import RightbarWorkouts from "./RightbarWorkouts";
import RightbarFriends from "./RightbarFriends";
import "./index.css";

export default function Home(props) {
  const { setMain } = props;
  const [panels, setPanels] = useState("home");
  return (
    <>
      <Topbar setMain={setMain} />
      <div className="homeContainer">
        <Leftbar setPanels={setPanels} />
        {panels === "home" && <Center />}
        {panels === "home" && <Rightbar />}
        {panels === "workouts" && <CenterWorkouts />}
        {panels === "workouts" && <RightbarWorkouts />}
        {panels === "friends" && <CenterFriends />}
        {panels === "friends" && <RightbarFriends />}
      </div>
    </>
  );
}
