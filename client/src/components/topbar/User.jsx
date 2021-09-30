import { useState, useContext } from "react";
import { TokenUserContext } from "../App/App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function User(props) {
  const { logout } = props;
  const [show, setShow] = useState(false);

  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img
        variant="primary"
        onClick={handleShow}
        type="button"
        src="/assets/mario.jpeg"
        alt=""
        className="topbarImg"
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="/assets/mario.jpeg" alt="" className="topbarImg"></img>
            <span>
              {user.user ? user.user.first_name + " " : ""}
              {user.user ? user.user.last_name : ""}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Maybe in this section we can make the user photo changeable?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
          <Button onClick={logout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
