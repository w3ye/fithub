import { useState, useContext } from "react";
import { TokenUserContext } from "../../App/App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function CreateGroup() {
  const [show, setShow] = useState(false);

  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        variant="primary"
        onClick={handleShow}
        type="button"
        alt=""
        className="topbarImg"
      >
        +
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Create a New Group</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" placeholder="New Group" />
              <Form.Text className="text-muted">
                Only group members can see your group name.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Group Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://theairtravelgroup.com/wp-content/uploads/group-icon-768x768.png"
              />
              <Form.Text className="text-muted">
                Or just stick witht he default look
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Group
            </Button>
            <br />
            <Button variant="secondary" className="mt-3" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
