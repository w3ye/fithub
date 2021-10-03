import "./center.scss";
import Share from "./Share";
import Posts from "./Posts";
import GroupButton from "./GroupButton";
import { TokenUserContext } from "../../App/App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function CenterGroupFeed(props) {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { setGroup, group } = props;
  const [groupData, setGroupData] = useState("");

  // console.log("what is group and props in CenterGroupFeed", props);

  useEffect(() => console.log(""), [groupData]);

  useEffect(() => {
    getWorkoutIds();
  }, [group]);

  function getWorkoutIds() {
    if (group.group_id) {
      axios
        .get(`/api/posts/${group.group_id}`)
        .then((response) => {
          setGroupData(response.data);
          console.log("response.data", response.data);
          console.log("groupData ----", groupData);
        })
        .catch((err) => {
          return err;
        });
    }
  }

  const parsedWorkoutId =
    groupData &&
    groupData.map((post) => (
      <Posts key={post.id} workoutId={post.workout_id} />
    ));

  return (
    <>
      <div className="center">
        {/* {group.title} */}
        <div className="feed">
          <Share />
          {parsedWorkoutId}
          <div className="feedWrapper"></div>
        </div>
      </div>
    </>
  );
}