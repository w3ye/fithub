import { useState, useContext, useEffect } from "react";
import { TokenUserContext } from "../../App/App";
import MemberListItem from "./MemberListItem";
import "./rightbar.scss";
import axios from "axios";

export default function RightbarGroups(props) {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  const { group, setPanels } = props;
  const [email, setEmail] = useState();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers(group.group_id);
  }, [group]);

  function getMembers(group_ID) {
    axios
      .post("/api/groups/members", { groupId: group_ID, userId: user.user.id })
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        return err;
      });
  }

  const parsedMembers =
    user.user && members.map((memberObj) => <MemberListItem />);

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
            setPanels("home");
            setPanels("groups");
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
      <div id="memberList">{parsedMembers}</div>
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
