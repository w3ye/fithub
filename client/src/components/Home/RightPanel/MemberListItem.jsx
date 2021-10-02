import "./rightbar.scss";

export default function MemberListItem(props) {
  const { name, avatar, key } = props;
  return <img className="memberItem" alt="" src={avatar} />;
}
