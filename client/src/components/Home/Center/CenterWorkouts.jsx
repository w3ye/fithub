import "./center.scss";
import { TokenUserContext } from "../../App/App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function CenterWorkouts() {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  console.log("what is user", user);

  return (
    <>
      <div className="center">
        <div className="feed">
          This is the centerWorkouts
          <div className="feedWrapper"></div>
        </div>
      </div>
    </>
  );
}
