import "./rightbar.scss";

export default function RightbarGroups(props) {
  const { group } = props;
  console.log(group);
  return (
    <div className="rightbar container">
      <h2>{group.title}</h2>
      <h5>Add New Member</h5>
      <input type="email" />
      <button>Add</button>
      <ul></ul>
    </div>
  );
}
