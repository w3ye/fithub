import "./center.scss";

<<<<<<< HEAD
export default function CenterWorkouts() {
=======
export default function RightWorkouts() {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;
  // console.log("what is user", user);

>>>>>>> dev
  return (
    <>
      <div className="center">
        <div className="feed">
          This is the centerWorkouts
          <div className="feedWrapper"></div>
        </div>
      </div>
    </>
  );
}
