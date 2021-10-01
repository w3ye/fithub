import { useState, useContext } from "react";
import { TokenUserContext } from "../App/App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function User(props) {
  const { logout } = props;
  const [show, setShow] = useState(false);

  const { userState } = useContext(TokenUserContext);

  const [user] = userState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              className="topbarImg"
            ></img>
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
