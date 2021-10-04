import "./rightbar.scss";

export default function MemberListItem(props) {
  const { avatar } = props;
  return <img className="memberItem" alt="" src={avatar} />;
}
