import Topbar from "./Topbar"
import Leftbar from "./Leftbar"
import Center from "./Center"
import Rightbar from "./Rightbar"
import "./index.css"

export default function Home() {
  return (
    <>
    <Topbar />
    <div className="homeContainer">
      <Leftbar />
      <Center />
      <Rightbar />
    </div>

    </>
  )
}