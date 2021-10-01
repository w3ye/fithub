import { useState, useContext } from "react";
import { TokenUserContext } from "../../App/App";
import "./rightbar.scss";
import axios from "axios";

export default function RightbarGroups(props) {
  const { tokenState, userState } = useContext(TokenUserContext);
  const [token, setToken] = tokenState;
  const [user, setUser] = userState;
  const { group } = props;
  const [email, setEmail] = useState();

  function addMember() {
    axios
      .get(`/api/users/${email}`)
      .then((result) => {
        axios
          .post(`/api/groups/add_group`, {
            groupId: group.group_id,
            userId: result.data.id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  }

  if (!group.title) {
    return <></>;
  }
  return (
    <div className="rightbar container">
      <h2>{group.title}</h2>
      {group.title && <h5>Add New Member</h5>}
      {group.title && (
        <input
          type="email"
          placeholder="User Email"
          onChange={(event) => setEmail(event.target.value)}
        />
      )}
      {group.title && <button onClick={addMember}>Add</button>}
    </div>
  );
}
