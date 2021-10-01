import "./rightbar.scss";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { TokenUserContext } from "../../App/App";

export default function RightbarFriends() {
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;
  const [request, setRequest] = useState([]);
  const [rec_email, setRec_Email] = useState("");
  const [message, setMessage] = useState("");

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
      .then((result) => {})
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

  function sendFriendRequest(sender_id, email, message) {
    axios.get(`/api/users/${email}`).then((res) => {
      const reciever_id = res.data.id;

      axios
        .post(`/api/friend_requests`, { sender_id, reciever_id, message })
        .then((result) => {
          console.log("postie result", result);
        })
        .catch((err) => {
          return err;
        });
    });
  }

  useEffect(() => {
    fetchFRequests(user.user ? user.user.id : 0);
  }, []);

  useEffect(() => {}, [request]);

  let parsedRequests = request.map((req) => {
    return (
      <div className="friendRequestItem">
        <img src={req.sender_avatar} alt="" />
        <h5>{req.sender_first_name + " " + req.sender_last_name}</h5>
        <p>{req.message}</p>
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
          <label for="email">Send a Friend Request:</label>
          <br />
          <input
            id="email-input"
            type="email"
            name="rec_email"
            placeholder="Enter an email address"
            onChange={(event) => setRec_Email(event.target.value)}
          />
          <input
            id="message-input"
            type="text"
            name="message"
            placeholder="message"
            onChange={(event) => setMessage(event.target.value)}
          />{" "}
          <br />
          <button
            onClick={() => {
              sendFriendRequest(user.user.id, rec_email, message);
            }}
          >
            Submit
          </button>
          <h3>Friend Requests:</h3>
          <div>{request.length ? parsedRequests : []}</div>
        </div>
      </div>
    </>
  );
}
