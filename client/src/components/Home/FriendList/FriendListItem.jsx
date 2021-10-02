import "./FriendListItem.scss";

export default function FriendListItem(props) {
  const {
    friend_first_name,
    friend_last_name,
    friend_email,
    friend_avatar,
  } = props;

  return (
    <div className="friendCard">
      <img alt="" src={friend_avatar} className="friendImage" />
      <div>
        <h5>
          {friend_first_name} {friend_last_name}
        </h5>
        <p class="cardEmail">{friend_email}</p>
      </div>
    </div>
  );
}
