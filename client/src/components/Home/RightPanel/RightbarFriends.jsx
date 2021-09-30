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
      .get(`/api/friend_requests/${id}`, {
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

  function fetchFriends(id) {
    axios
      .get(`/api/friends/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setUser({ ...user, friends: result.data });
      })
      .catch((err) => {
        return err;
      });
  }

  function addNewFriend(sender_id, reciever_id) {
    axios
      .post(`/api/friends/add_friend/${sender_id}/${reciever_id}`)
      .then((result) => {
        console.log("result of add", result);
      })
      .catch((err) => {
        return err;
      });
  }

  function resolveRequest(request_id) {
    axios
      .put(`/api/friend_requests/${request_id}`)
      .then((result) => {
        fetchFRequests(user.user.id);
        fetchFriends(user.user.id);
      })
      .catch((err) => {
        return err;
      });
  }

  useEffect(() => {
    fetchFRequests(user.user ? user.user.id : 0);
    console.log("USER NOW:", user);
  }, []);

  useEffect(() => {
    console.log(request);
  }, [request]);

  let parsedRequests = request.map((req) => {
    return (
      <div className="friendRequestItem">
        <h5>{req.sender_first_name + " " + req.sender_last_name}</h5>
        <button
          onClick={() => {
            addNewFriend(req.sender_id, req.reciever_id);
            resolveRequest(req.id);
          }}
        >
          ✔
        </button>
        <button
          onClick={() => {
            resolveRequest(req.id);
          }}
        >
          X
        </button>
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
