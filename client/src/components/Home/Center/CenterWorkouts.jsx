import "./center.scss";
import Share from "./Share";
import Post from "./Post";
import GroupButton from "./GroupButton";
import { TokenUserContext } from "../../App/App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function CenterWorkouts() {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  console.log("what is user", user);

  // const parsedGroups =
  //   user.user &&
  //   user.groups.map((group) => (
  //     <GroupButton
  //       key={group.id}
  //       group_id={group.group_id}
  //       group={group}
  //       title={group.title}
  //       selectGroup={selectGroup}
  //       user={user}
  //     />
  //   ));

  useEffect(() => {
    Promise.all([axios.get(`/api/posts/${user.groups[0].id}`)]).then((all) => {
      const groupid = all[0].data;
      console.log("groupId ----", groupid);
    });
  }, []);

  // show comments
  // show the post

  // const parsedPosts =
  //   user.workouts &&
  //   user.workouts.map((workout) => (
  //     <Post
  //       key={workout.id}
  //       id={workout.id}
  //       title={workout.title}
  //       exercises={workout.exercises}
  //     />
  //   ));
  return (
    <>
      <div className="center">
        <div className="feed">
          <Share />
          <div className="feedWrapper"></div>
        </div>
      </div>
    </>
  );
}
