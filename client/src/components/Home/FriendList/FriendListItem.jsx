import "./FriendListItem.scss";

export default function FriendListItem(props) {
  const { friend_first_name, friend_last_name, friend_email } = props;

  return (
    <div className="friendCard">
      <img
        alt=""
        src="https://www.pngkey.com/png/full/115-1150092_png-file-person-icon.png"
        className="friendImage"
      />
      <div>
        <h5>
          {friend_first_name} {friend_last_name}
        </h5>
        <p class="cardEmail">{friend_email}</p>
      </div>
    </div>
  );
}
