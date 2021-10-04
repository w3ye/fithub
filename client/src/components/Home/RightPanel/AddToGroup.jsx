import { useState, useContext, useEffect } from "react";
import { TokenUserContext } from "../../App/App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AddtoGroup(props) {
  const { logout, setMain, setBar } = props;
  const [show, setShow] = useState(false);

  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button variant="primary" onClick={handleShow} type="button" alt="">
        Add
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Add to group?</h4>
          </Modal.Title>
          <button onClick={""}>Submit</button>
        </Modal.Header>
      </Modal>
    </>
  );
}
