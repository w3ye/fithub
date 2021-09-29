import "./rightbar.scss";

export default function RightbarGroups(props) {
  const { group } = props;
  return (
    <div className="rightbar container">
      <h2>{group.title} Chat</h2>
    </div>
  );
}
