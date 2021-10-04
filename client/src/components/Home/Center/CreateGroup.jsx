import { useState, useContext } from "react";
import { TokenUserContext } from "../../App/App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function CreateGroup(props) {
  const { userState } = useContext(TokenUserContext);
  const [user, setUser] = userState;
  const [state, setState] = useState({
    show: false,
    title: "",
    url: "",
  });

  const handleClose = () => setState((prev) => ({ ...prev, show: false }));
  const handleShow = () => setState((prev) => ({ ...prev, show: true }));

  function groupSubmit() {
    axios
      .post("/api/groups/new_group", {
        userId: user.user.id,
        title: state.title,
      })
      .then((res) => {
        const newGroup = res.data.groups[0];
        axios
          .post("/api/groups/add_group", {
            userId: newGroup.owner_id,
            groupId: newGroup.id,
          })
          .then((result) => {
            axios.get(`/api/groups/${user.user.id}`).then((res) => {
              setUser({ ...user, groups: res.data });
            });
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  }

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

      <Modal show={state.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Create a New Group</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="New Group"
                onChange={(event) => {
                  setState((prev) => ({ ...prev, title: event.target.value }));
                }}
              />
              <Form.Text className="text-muted">
                Only group members can see your group name.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Group Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://theairtravelgroup.com/wp-content/uploads/group-icon-768x768.png"
                onChange={(event) => {
                  setState((prev) => ({ ...prev, url: event.target.value }));
                }}
              />
              <Form.Text className="text-muted">
                Or just stick with the default look
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={groupSubmit}>
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
