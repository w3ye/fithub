import { useState, useContext, useEffect } from "react";
import { TokenUserContext } from "../App/App";
import "./topbar.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function User(props) {
  const { logout } = props;
  const [show, setShow] = useState(false);

  const { userState } = useContext(TokenUserContext);
  const [user, setUser] = userState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function updateImage() {
    const id = user.user.id;
    const url = document.getElementById("urlField").value;
    axios
      .post("/api/users/user_image", { url: url, id: id })
      .then((res) => {
        setUser({ ...user, avatar_url: url });
        handleClose();
      })
      .catch((err) => err);
  }

  return (
    <>
      <img
        variant="primary"
        onClick={handleShow}
        type="button"
        src={
          user.user
            ? user.user.avatar_url
            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
        }
        alt=""
        className="topbarImg"
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img
              src={
                user.user
                  ? user.user.avatar_url
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
              }
              alt=""
              className="topbarImg in-modal"
            ></img>
            <span class="usernameModal">
              {user.user ? user.user.first_name + " " : ""}
              {user.user ? user.user.last_name : ""}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="modalAdjust">
            <h3>Update your avatar:</h3>
            <input type="text" placeholder="Image URL" id="urlField"></input>
            <Button variant="dark" onClick={updateImage}>
              Submit
            </Button>
          </div>
        </Modal.Body>

        <div class="footerBox">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={logout}>
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
}
