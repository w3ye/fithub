import "./rightbar.scss";

export default function RightbarFriends() {
  return (
    <div className="rightbar container">
      <h2>Make new friends:</h2>
      <input type="text" placeholder="Enter an email address" />
      <button>Send Friend Request</button>
      <h3>Friend Requests:</h3>
    </div>
  );
}
