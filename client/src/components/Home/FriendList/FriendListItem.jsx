import "./FriendListItem.scss";
import AddToGroup from "./AddToGroup";
import axios from "axios";

export default function FriendListItem(props) {
  const {
    friend_first_name,
    friend_last_name,
    friend_email,
    friend_avatar,
    thisId,
    group,
    setPanels,
    panels,
  } = props;

  function addMember(emailA) {
    const email = emailA;
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

  if (panels === "groups") {
    return (
      <div className="friendCard groupTab">
        <img alt="" src={friend_avatar} className="friendImage" />
        <div className="nameAndButton">
          <p>
            {friend_first_name} {friend_last_name}
          </p>
          {panels === "groups" && (
            <AddToGroup
              friend_email={friend_email}
              friend_first_name={friend_first_name}
              friend_last_name={friend_last_name}
              addMember={addMember}
              group={group}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="friendCard friendTab">
      <img alt="" src={friend_avatar} className="friendImage" />
      <div>
        <h5>
          {friend_first_name} {friend_last_name}
        </h5>
      </div>
    </div>
  );
}
