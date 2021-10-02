import { TokenUserContext } from "../../App/App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

export default function Post() {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  console.log("what is user", user);

  useEffect(() => {
    Promise.all([axios.get(`/api/posts/comments/`)]);
  }, []);

  // const parsedPosts =
  //   user.workouts &&
  //   user.workouts.map((workout) => (
  //     <PostItem
  //       key={workout.id}
  //       id={workout.id}
  //       title={workout.title}
  //       exercises={workout.exercises}
  //     />
  //   ));

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">{user.workouts[0].id}</div>
          <div className="postTopRight"></div>
          <div className="postCenter">
            <div className="postBottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
