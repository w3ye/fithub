import "./rightbar.scss";

export default function RightbarGroups(props) {
  const { group } = props;
  console.log(group);

  if (!group.title) {
    return <></>;
  }
  return (
    <div className="rightbar container">
      <h2>{group.title}</h2>
      {group.title && <h5>Add New Member</h5>}
      {group.title && <input type="email" placeholder="User Email" />}
      {group.title && <button>Add</button>}
    </div>
  );
}
