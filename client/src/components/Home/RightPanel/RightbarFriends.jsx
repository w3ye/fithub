import "./rightbar.scss";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { TokenUserContext } from "../../App/App";
import { FcApprove, FcDisapprove } from "react-icons/fc";

export default function RightbarFriends(props) {
  const { request, setRequest } = props;

  const { userState } = useContext(TokenUserContext);

  const [user, setUser] = userState;
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
          console.log("Result", result);
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
        <FcApprove
          size={50}
          className="friendButton green"
          onClick={() => {
            addNewFriend(req.sender_id, req.reciever_id);
            resolveRequest(req.id);
          }}
        />
        <img src={req.sender_avatar} alt="" />
        <div className="infobox">
          <h6>{req.sender_first_name + " " + req.sender_last_name}</h6>
          <p>{req.message}</p>
        </div>
        {/* <button
          onClick={() => {
            addNewFriend(req.sender_id, req.reciever_id);
            resolveRequest(req.id);
          }}
        >
          ✔
        </button> */}
        <FcDisapprove
          size={50}
          className="friendButton"
          onClick={() => {
            resolveRequest(req.id);
          }}
        />
        {/* <button 
          onClick={() => {
            resolveRequest(req.id);
          }}
        >
          X
        </button> */}
      </div>
    );
  });

  return (
    <>
      <div className="rightbar container">
        <div class="requestForm">
          <h4>Send a Friend Request:</h4>
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
          />
          <button
            onClick={() => {
              sendFriendRequest(user.user.id, rec_email, message);
            }}
          >
            Submit
          </button>
        </div>
        <h3>Friend Requests:</h3>
        <div>{request.length ? parsedRequests : []}</div>
      </div>
    </>
  );
}
