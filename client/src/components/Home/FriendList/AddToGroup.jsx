import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MdGroupAdd } from "react-icons/md";
import "./FriendListItem.scss";

export default function AddtoGroup(props) {
  const {
    friend_email,
    addMember,
    friend_first_name,
    friend_last_name,
    group,
  } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <MdGroupAdd
        variant="primary"
        onClick={handleShow}
        type="button"
        alt=""
        size={30}
        className="addButton"
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <h4>
            Add {friend_first_name} {friend_last_name} to {group.title}?
          </h4>
        </Modal.Header>
        <Modal.Body className="buttons">
          <Button onClick={() => setShow(false)} variant="light">
            Cancel
          </Button>
          <Button onClick={() => addMember(friend_email)} variant="success">
            Confirm
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
