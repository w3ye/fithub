import Topbar from "./Topbar";
import Leftbar from "./Leftbar";
import Center from "./Center";
import Rightbar from "./Rightbar";
import "./index.css";

export default function Home(props) {
  const { user, token } = props;
  return (
    <>
      <Topbar user={user} token={token} />
      <div className="homeContainer">
        <Leftbar />
        <Center />
        <Rightbar />
      </div>
    </>
  );
}
