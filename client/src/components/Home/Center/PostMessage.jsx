import User from "../../topbar/User";

export default function PostMessage(props) {
  const { message, userId, avatar, first_name, last_name } = props;

  return (
    <div class="postComment">
      <div class="userBar">
        <img alt="" src={avatar} />
        <p>
          {first_name} {last_name}:
        </p>
      </div>
      <p>{message}</p>
    </div>
  );
}
