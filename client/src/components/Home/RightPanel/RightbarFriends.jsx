import "./rightbar.scss";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { TokenUserContext } from "../../App/App";

export default function RightbarFriends() {
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;
  const [request, setRequest] = useState([]);

  function fetchFRequests(id) {
    axios
      .get(`/api/frequests/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setRequest(result.data);
      })
      .catch((err) => {
        return err;
      });
  }

  // function acceptFRequest(id) {
  //   axios
  //     .post(`/api/frequests/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // }

  useEffect(() => {
    fetchFRequests(user.user ? user.user.id : "");
  }, []);

  useEffect(() => {
    console.log(request);
  }, [request]);

  const parsedRequests = request.map((req) => {
    return (
      <div className="friendRequestItem">
        <h5>{req.sender_first_name + " " + req.sender_last_name}</h5>
        <button
        // onClick={() => {
        //   acceptFRequest(req.id);
        // }}
        >
          ✔
        </button>
        <button>X</button>
      </div>
    );
  });

  return (
    <>
      <div className="rightbar container">
        <div>
          <label for="email">Make new friends:</label>
          <br />
          <input
            type="text"
            name="email"
            placeholder="Enter an email address"
          />
          <button type="submit">Send Friend Request</button>
          <h3>Friend Requests:</h3>
          <div>{request.length ? parsedRequests : []}</div>
        </div>
      </div>
    </>
  );
}
