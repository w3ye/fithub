import "./center.scss";
import Posts from "./Posts";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CenterGroupFeed(props) {
  const { group } = props;
  const [groupData, setGroupData] = useState("");

  useEffect(() => console.log(""), [groupData]);

  useEffect(() => {
    if (group.group_id) {
      axios
        .get(`/api/posts/${group.group_id}`)
        .then((response) => {
          setGroupData(response.data);
        })
        .catch((err) => {
          return err;
        });
    }
  }, [group]);

  const parsedWorkoutId =
    groupData &&
    groupData.map((post) => (
      <Posts key={post.id} workoutId={post.workout_id} />
    ));

  return (
    <>
      <div className="center group-feed">
        {/* {group.title} */}
        <div className="feed">
          {/* <Share /> */}
          {parsedWorkoutId}
          <div className="feedWrapper"></div>
        </div>
      </div>
    </>
  );
}
