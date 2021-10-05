import "./rightbar.scss";

export default function MemberListItem(props) {
  const { avatar, first_name, last_name } = props;
  return (
    <div className="memberItem">
      <img alt="" src={avatar} />
      <p>
        {first_name} {last_name[0]}.
      </p>
    </div>
  );
}
