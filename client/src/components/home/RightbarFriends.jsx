import "./rightbar.css";

export default function RightbarFriends() {
  return (
    <div className="rightbar friendContainer">
      <h2>Make new friends:</h2>
      <input type="text" placeholder="Enter an email address" />
      <button>Send Friend Request</button>
      <h3>Friend Requests:</h3>
    </div>
  );
}
